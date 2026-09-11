"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { dict, type Lang } from "@/lib/i18n";
import { counterpart } from "@/components/LangLink";

export default function LangSwitch({ lang }: { lang: Lang }) {
  const pathname = usePathname() || `/${lang}`;
  const t = dict(lang).langSwitch;
  return (
    <div className="seg-group" role="group" aria-label={t.label}>
      {(["fr", "en"] as Lang[]).map((l) => (
        <Link
          key={l}
          href={counterpart(pathname, l)}
          hrefLang={l}
          className="seg seg--text"
          aria-current={l === lang ? "true" : undefined}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
