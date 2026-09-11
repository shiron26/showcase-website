"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Lang } from "@/lib/i18n";

/** Lands on the counterpart of the current page, never on the other homepage. */
export function counterpart(pathname: string, to: Lang) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return `/${to}`;
  parts[0] = to;
  if (parts[1] === "projets" || parts[1] === "projects") {
    parts[1] = to === "fr" ? "projets" : "projects";
  }
  return `/${parts.join("/")}`;
}

export default function LangLink({
  lang,
  className,
  children,
}: {
  lang: Lang;
  className?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname() || `/${lang}`;
  const to: Lang = lang === "fr" ? "en" : "fr";
  return (
    <Link href={counterpart(pathname, to)} hrefLang={to} className={className}>
      {children}
    </Link>
  );
}
