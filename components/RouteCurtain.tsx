"use client";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  THE CURTAIN, and the memory of where you were.
 *
 *  Two faults this fixes, both born of the same fact: the shell never unmounts,
 *  so a navigation swaps the contents of <main> under a scroll position that
 *  belongs to the page being left.
 *
 *  GOING IN. Opening a project from deep in the index collapsed the document
 *  from about fifteen viewports to three while the scroll position stood still.
 *  The browser clamped it to the new bottom — which is exactly where the
 *  sticky footer field lives — so the ultramarine curtain flashed across the
 *  screen, and Next's scroll reset then animated back to the top. The ink veil
 *  closes over the page first: the collapse, the clamp and the reset all happen
 *  behind it, and it opens on a page already at the top.
 *
 *  COMING BACK. Nothing here or in Next sets `history.scrollRestoration`, so
 *  the browser restored the position natively — against a page that then grew
 *  by 2.2 viewports when the Education panel armed, which is why Back landed
 *  two sections early. Restoration is taken over here and re-applied until the
 *  layout stops moving, rather than once and hopefully.
 *
 *  THE REST CONTRACT, as everywhere else in this build: without JavaScript no
 *  click is intercepted, every link behaves as it always did and the browser
 *  keeps its own restoration. Under reduced motion the global switch in
 *  globals.css collapses the veil's animation to nothing, and the logic leans
 *  on timers rather than on animation events, so it cannot stall.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

/** Matches the wipe in globals.css. One number, two places, kept in step. */
const WIPE_MS = 420;
/** How long we keep re-asserting a restored position while the page settles. */
const SETTLE_MS = 700;
/** A veil that waits forever is worse than the flash it hides. If the route
 *  has not landed by then — a cold route, a dropped connection — open it. */
const PATIENCE_MS = 2500;
const STORE = "sb:scroll";

type Phase = "idle" | "in" | "out";

/** The history entry we are on. Next stamps a key into history.state; before
 *  hydration, or for an entry it did not write, the URL is enough. */
function entryKey(): string {
  const state = typeof history !== "undefined" ? (history.state as { key?: string } | null) : null;
  return state?.key ?? (typeof location !== "undefined" ? location.pathname + location.search : "");
}

function readAll(): Record<string, number> {
  try {
    return JSON.parse(sessionStorage.getItem(STORE) ?? "{}") as Record<string, number>;
  } catch {
    return {};
  }
}

function remember(key: string, y: number) {
  try {
    const all = readAll();
    all[key] = y;
    sessionStorage.setItem(STORE, JSON.stringify(all));
  } catch {
    /* private window, quota, no storage: the page still works, it just forgets */
  }
}

export default function RouteCurtain() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");

  /** The navigation we started and are waiting to land. */
  const going = useRef<{ path: string; hash: string } | null>(null);
  /** Where a Back should land, held until the returned tree commits. */
  const coming = useRef<number | null>(null);
  /** The pathname as last committed, so popstate can tell a change of page
   *  from a change of hash without re-subscribing on every render. */
  const here = useRef(pathname);
  const timers = useRef<number[]>([]);
  const after = useCallback((ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, ms));
  }, []);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    [],
  );

  /* ── Remembering ──────────────────────────────────────────────────────── */

  useEffect(() => {
    if (!("scrollRestoration" in history)) return;
    const had = history.scrollRestoration;
    history.scrollRestoration = "manual";

    let frame = 0;
    const record = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        remember(entryKey(), window.scrollY);
      });
    };
    record();
    window.addEventListener("scroll", record, { passive: true });
    // A tab closed mid-scroll should still be where you left it on return.
    window.addEventListener("pagehide", record);

    return () => {
      window.removeEventListener("scroll", record);
      window.removeEventListener("pagehide", record);
      if (frame) cancelAnimationFrame(frame);
      history.scrollRestoration = had;
    };
  }, []);

  /* ── Restoring ────────────────────────────────────────────────────────── */

  /**
   * Put the page back, then keep putting it back. The Education panel grows by
   * 2.2 viewports when it arms, the header publishes its measured height, and
   * the display face lands late — each of those moves everything below it. One
   * `scrollTo` would be overwritten by the first of them.
   */
  const settling = useRef<(() => void) | null>(null);

  const restore = useCallback((y: number) => {
    settling.current?.();
    const start = performance.now();
    let stop = () => {};

    const put = () => {
      if (Math.abs(window.scrollY - y) > 1) window.scrollTo({ top: y, behavior: "instant" });
      if (performance.now() - start > SETTLE_MS) stop();
    };

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            put();
          })
        : null;
    ro?.observe(document.documentElement);

    let frame = requestAnimationFrame(function tick() {
      put();
      frame = performance.now() - start > SETTLE_MS ? 0 : requestAnimationFrame(tick);
    });

    stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      ro?.disconnect();
      settling.current = null;
    };
    settling.current = stop;

    document.fonts?.ready.then(() => settling.current && put()).catch(() => {});
    put();
  }, []);

  /* The reader always wins. A wheel, a finger or an arrow key means they have
     taken the page back, and the correction must let go at once rather than
     drag them to a position they have just left. */
  useEffect(() => {
    const yield_ = () => settling.current?.();
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(e.key))
        yield_();
    };
    window.addEventListener("wheel", yield_, { passive: true });
    window.addEventListener("touchstart", yield_, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", yield_);
      window.removeEventListener("touchstart", yield_);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    const onPop = () => {
      // The navigation has already happened: a veil here would wipe in over
      // content that is already swapped, showing exactly what it should hide.
      // Back stays silent, and the position does the work.
      const y = readAll()[entryKey()];
      if (typeof y !== "number") return;
      // Nothing is moved here. At this moment the page being LEFT is still on
      // screen, and it is short: applying the index's offset to a project page
      // would clamp onto that page's own sticky close — the same blue flash,
      // in the other direction. The restore belongs to the commit below.
      if (location.pathname !== here.current) coming.current = y;
      else restore(y);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [restore]);

  /* ── Going in ─────────────────────────────────────────────────────────── */

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download") || a.hasAttribute("data-no-curtain"))
        return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:"))
        return;

      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      // Same page: an anchor link. Leave it alone — it keeps its smooth scroll.
      if (url.pathname === location.pathname) return;

      e.preventDefault();
      remember(entryKey(), window.scrollY);
      going.current = { path: url.pathname, hash: url.hash };
      document.documentElement.dataset.route = "busy";
      setPhase("in");
      // The veil is closed by now; drive the navigation from a timer rather
      // than from `animationend`, which never fires if the animation is
      // collapsed to nothing by reduced motion.
      after(WIPE_MS, () =>
        router.push(url.pathname + url.search + url.hash, { scroll: false }),
      );
      after(WIPE_MS + PATIENCE_MS, () => {
        if (!going.current) return;
        going.current = null;
        setPhase("out");
        after(WIPE_MS, () => setPhase("idle"));
      });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router, after]);

  /* ── Landing ──────────────────────────────────────────────────────────── */

  useLayoutEffect(() => {
    here.current = pathname;

    // Back: place the returned page before its first frame is painted, then
    // keep correcting while the layout finishes settling.
    if (coming.current !== null) {
      const y = coming.current;
      coming.current = null;
      restore(y);
    }

    const go = going.current;
    if (!go || go.path !== pathname) return;
    going.current = null;

    // Behind the veil: put the page where the new route should start. A hash
    // in the href is a deliberate target (the "all projects" link asks for the
    // work section), so it wins over the top of the page.
    if (go.hash) {
      const target = document.getElementById(decodeURIComponent(go.hash.slice(1)));
      if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    remember(entryKey(), window.scrollY);

    // One frame for the new page to paint at its new position, then open.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPhase("out");
        after(WIPE_MS, () => setPhase("idle"));
      });
    });
  }, [pathname, after, restore]);

  useEffect(() => {
    if (phase === "idle") delete document.documentElement.dataset.route;
  }, [phase]);

  if (phase === "idle") return null;
  return <div className="curtain" data-phase={phase} aria-hidden="true" />;
}
