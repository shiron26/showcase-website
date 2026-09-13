"use client";

import { useMemo, useState } from "react";
import { dict, type Lang } from "@/lib/i18n";
import { SORTED_PROJECTS, type ProjectKind } from "@/content/projects";
import ProjectEntry from "@/components/ProjectEntry";

/* No "all": the two registers are the argument. A catalogue of five entries
   read as one undifferentiated list said nothing, and the third pill was a
   default nobody chose. Client opens, because it is the evidence a recruiter
   came for. */
type Filter = ProjectKind;

export default function WorkIndex({ lang }: { lang: Lang }) {
  const t = dict(lang).work;
  const [filter, setFilter] = useState<Filter>("client");

  const counts = useMemo(
    () => ({
      client: SORTED_PROJECTS.filter((p) => p.kind === "client").length,
      perso: SORTED_PROJECTS.filter((p) => p.kind === "perso").length,
    }),
    [],
  );

  const shown = useMemo(() => SORTED_PROJECTS.filter((p) => p.kind === filter), [filter]);

  const filters: { value: Filter; label: string; count: number }[] = [
    { value: "client", label: t.client, count: counts.client },
    { value: "perso", label: t.perso, count: counts.perso },
  ];

  return (
    <>
      <div className="filters" role="group" aria-label={t.title}>
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            className="filter"
            aria-pressed={filter === f.value}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
            <span className="filter-n num">{f.count}</span>
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <div className="empty">
          <p className="d-3">{t.empty}</p>
          <p className="lead" style={{ color: "var(--fg-2)" }}>
            {t.emptyHint}
          </p>
        </div>
      ) : (
        <ul className="rows">
          {shown.map((project, i) => (
            <li key={project.slug} className="row">
              <ProjectEntry project={project} lang={lang} index={i} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
