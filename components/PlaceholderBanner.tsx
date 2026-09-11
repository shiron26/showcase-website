import { dict, type Lang } from "@/lib/i18n";
import { SITE } from "@/content/site";
import { PROJECTS } from "@/content/projects";

/**
 * Honest notice, and a to-do list. It names the sample content and the
 * unconfigured destinations, and returns null once neither is true.
 * Remove it for good with SHOW_PLACEHOLDER_BANNER in content/site.ts.
 */
export default function PlaceholderBanner({ lang }: { lang: Lang }) {
  const t = dict(lang).placeholder;
  const hasSample = PROJECTS.some((p) => p.sample);
  const missing = [
    SITE.emailConfirmed ? null : t.emailUnconfirmed,
    SITE.cv[lang] ? null : "CV",
    SITE.github ? null : "GitHub",
    SITE.linkedin ? null : "LinkedIn",
  ].filter(Boolean) as string[];

  if (!hasSample && missing.length === 0) return null;

  return (
    <div className="notice band" role="note">
      <div className="inner">
        <p>
          {hasSample ? t.banner : null}
          {hasSample && missing.length ? " " : null}
          {missing.length ? `${t.missing} ${missing.join(", ")}.` : null}
        </p>
      </div>
    </div>
  );
}
