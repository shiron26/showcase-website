"use client";

import { useEffect, useState } from "react";
import { dict, type Lang } from "@/lib/i18n";
import { SunIcon, MoonIcon } from "@/components/icons";

type Theme = "light" | "dark";

/**
 * Two choices, light and dark. Until the visitor picks one, the boot script
 * in RootShell follows the operating system; the first click makes the
 * choice explicit and persists it.
 */
function apply(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.dataset.themeChoice = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* private mode: the choice simply does not persist */
  }
}

export default function ThemeToggle({ lang }: { lang: Lang }) {
  const t = dict(lang).theme;
  const [theme, setTheme] = useState<Theme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // The effective theme, whichever way it was decided.
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "dark" : "light");
    setReady(true);
  }, []);

  const options: { value: Theme; label: string; Icon: typeof SunIcon }[] = [
    { value: "light", label: t.light, Icon: SunIcon },
    { value: "dark", label: t.dark, Icon: MoonIcon },
  ];

  return (
    <div className="seg-group" role="group" aria-label={t.label}>
      {options.map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          className="seg"
          aria-pressed={ready ? theme === value : undefined}
          title={label}
          onClick={() => {
            setTheme(value);
            apply(value);
          }}
        >
          <Icon />
          <span className="sr-only">{label}</span>
        </button>
      ))}
    </div>
  );
}
