import Link from "next/link";
import { dict, projectHref, type Lang } from "@/lib/i18n";
import type { Project } from "@/content/projects";
import { ArrowIcon } from "@/components/icons";

export default function ProjectEntry({
  project,
  lang,
  index,
}: {
  project: Project;
  lang: Lang;
  index: number;
}) {
  const t = dict(lang);
  const ongoing = project.period.trim().endsWith("—");
  const period = ongoing ? `${project.period}${t.path.present}` : project.period;

  return (
    <Link href={projectHref(lang, project.slug)} className="row-link">
      <span className="row-n" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span>
        <span className="row-year num">
          {ongoing ? <span className="row-live" aria-hidden="true" /> : null}
          {period}
        </span>
        <h3 className="row-title">
          {project.title}
          <span className="row-org">{project.org[lang]}</span>
          {project.sample ? <span className="sample-mark">{t.placeholder.chip}</span> : null}
        </h3>
      </span>
      <span className="row-sum">{project.summary[lang]}</span>
      <span className="row-go" aria-hidden="true">
        <ArrowIcon />
      </span>
    </Link>
  );
}
