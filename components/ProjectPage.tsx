import type { ReactNode } from "react";
import Link from "next/link";
import { dict, projectHref, type Lang } from "@/lib/i18n";
import { neighbours, type Project } from "@/content/projects";
import { ArrowIcon, ArrowUpRightIcon } from "@/components/icons";
import Gallery from "@/components/Gallery";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  THE PROJECT PAGE — "la fiche", chosen from a board of four on 2026-09-13.
 *
 *  The facts first, on one ruled strip, for a reader who has four minutes and
 *  six tabs open: the year, the client, the stack, then every link the project
 *  can offer. Then the story, one section per ruled block, its title in display
 *  type above its own prose rather than orphaned in a margin. An ordered
 *  argument inside a section ("La vitesse d'abord. …") is broken out as its own
 *  titled point instead of a fourth identical paragraph.
 *
 *  Images are optional and never faked: no gallery and no link mean those
 *  blocks do not exist, and the page stays purely typographic. There is no
 *  lead image: the user removed it on 2026-09-13, the screenshots belong to
 *  the contact sheet.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** A paragraph that opens with a short sentence carries a point: "La vitesse
 *  d'abord. Traités un par un…". Split it so the lead-in can be set as the
 *  point's title. A paragraph that is not built that way stays prose. */
function splitPoint(p: string): { title: string; body: string } | null {
  const i = p.indexOf(". ");
  if (i < 0 || i > 42) return null;
  const body = p.slice(i + 2);
  if (body.length < 60) return null;
  return { title: p.slice(0, i + 1).replace(/\.$/, ""), body };
}

function Block({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  const points = paragraphs.map(splitPoint);
  /** One split paragraph is a coincidence; two are an ordered argument. */
  const argued = points.filter(Boolean).length >= 2;

  return (
    <section className="block">
      <h2 className="d-3 block-h">{title}</h2>
      <div className="block-body">
        {paragraphs.map((p, i) => {
          const point = argued ? points[i] : null;
          if (!point) return <p key={i}>{p}</p>;
          return (
            <div className="point" key={i}>
              <h3 className="point-h">{point.title}</h3>
              <p>{point.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function ProjectPage({ project, lang }: { project: Project; lang: Lang }) {
  const t = dict(lang);
  const { previous, next } = neighbours(project.slug);
  const ongoing = project.period.trim().endsWith("—");
  const period = ongoing ? `${project.period}${t.path.present}` : project.period;

  const facts: { k: string; v: ReactNode }[] = [
    {
      k: t.work.year,
      // The live edge of a period is written by hand, the way the current
      // chapter's "aujourd'hui" is in the experience timeline. One word, and
      // only on a project that is still running.
      v: ongoing ? (
        <span>
          {project.period}
          <span className="proj-now">{t.path.present}</span>
        </span>
      ) : (
        period
      ),
    },
    // A personal project has no client, and "Client — Personnel" is a cell
    // saying nothing twice. The register is already on the index's filter.
    ...(project.kind === "client" ? [{ k: t.project.client, v: project.org[lang] }] : []),
    { k: t.project.stack, v: project.stack.join(" · ") },
  ];

  const links = [
    project.links?.live ? { label: t.project.live, href: project.links.live } : null,
    project.links?.source ? { label: t.project.source, href: project.links.source } : null,
    ...(project.links?.more ?? []).map((l) => ({ label: l.label[lang], href: l.href })),
  ].filter((l): l is { label: string; href: string } => l !== null);

  const blocks = [
    { key: "context", title: t.project.context, paragraphs: project.context[lang] },
    { key: "role", title: t.project.role, paragraphs: project.role[lang] },
    { key: "approach", title: t.project.approach, paragraphs: project.approach[lang] },
    { key: "outcome", title: t.project.outcome, paragraphs: project.outcome[lang] },
  ];

  return (
    <article className="band proj">
      <div className="inner">
        <Link href={`/${lang}#work`} className="back">
          <ArrowIcon style={{ transform: "rotate(180deg)" }} />
          {t.project.back}
        </Link>

        <h1 className="d-1 proj-title">
          {/* The register in the hand, hung over the corner of the name, the
              way "Diplômé de" hangs over the school and "C'est moi" over the
              portrait. It sits inside the heading and is sized in em of the
              title, so the two scale together. */}
          <span className="proj-sign">
            {project.kind === "client" ? t.work.client : t.work.perso}{" "}
          </span>
          {project.title}
          {project.sample ? <span className="sample-mark">{t.placeholder.chip}</span> : null}
        </h1>
        <p className="proj-lead">{project.summary[lang]}</p>

        <dl className="facts">
          {facts.map((f) => (
            <div className="fact" key={f.k}>
              <dt className="tag-label">{f.k}</dt>
              <dd className="num">
                {f.k === t.work.year && ongoing ? (
                  <span className="row-live" aria-hidden="true" />
                ) : null}
                {f.v}
              </dd>
            </div>
          ))}
        </dl>

        {links.length ? (
          <div className="proj-links">
            {links.map((l) => (
              <a key={l.href} className="btn" href={l.href} target="_blank" rel="noreferrer">
                {l.label}
                <ArrowUpRightIcon />
              </a>
            ))}
          </div>
        ) : null}

        <div className="proj-grid">
          <div className="blocks">
            {blocks.map((b) => (
              <Block key={b.key} title={b.title} paragraphs={b.paragraphs} />
            ))}
          </div>

          {/* The sheet rides the story down the empty right side of the page,
              and falls back under it below 1120px, where there is no side to
              ride. */}
          {project.gallery?.length ? (
            <aside className="block proj-shots">
              <h2 className="d-3 block-h">{t.project.gallery}</h2>
              <Gallery shots={project.gallery} lang={lang} />
            </aside>
          ) : null}
        </div>

        <nav className="proj-nav" aria-label={t.project.pagination}>
          {previous ? (
            <Link href={projectHref(lang, previous.slug)}>
              <span className="tag-label">{t.project.previous}</span>
              <span className="d-3">{previous.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={projectHref(lang, next.slug)} className="proj-nav-next">
              <span className="tag-label">{t.project.next}</span>
              <span className="d-3">{next.title}</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </article>
  );
}
