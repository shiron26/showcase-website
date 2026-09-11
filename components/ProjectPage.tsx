import Link from "next/link";
import { dict, projectHref, type Lang } from "@/lib/i18n";
import { neighbours, type Project } from "@/content/projects";
import { ArrowIcon, ArrowUpRightIcon } from "@/components/icons";

function Block({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  return (
    <section className="block">
      <h2 className="tag-label" style={{ paddingTop: "0.4rem" }}>
        {title}
      </h2>
      <div className="prose">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}

export default function ProjectPage({ project, lang }: { project: Project; lang: Lang }) {
  const t = dict(lang);
  const { previous, next } = neighbours(project.slug);
  const period = project.period.trim().endsWith("—")
    ? `${project.period}${t.path.present}`
    : project.period;

  return (
    <article className="band proj">
      <div className="inner">
        <Link href={`/${lang}#work`} className="back">
          <ArrowIcon style={{ transform: "rotate(180deg)" }} />
          {t.project.back}
        </Link>

        <p className="proj-meta tag-label num">
          <span>{period}</span>
          <span>·</span>
          <span>{project.org[lang]}</span>
          {project.sample ? <span className="sample-mark">{t.placeholder.chip}</span> : null}
        </p>
        <h1 className="d-1 proj-title">{project.title}</h1>
        <p className="proj-lead">{project.summary[lang]}</p>

        {project.cover ? (
          <div className="proj-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.cover} alt="" width={1600} height={900} />
          </div>
        ) : null}

        <div className="proj-grid">
          <div className="blocks">
            <Block title={t.project.context} paragraphs={project.context[lang]} />
            <Block title={t.project.role} paragraphs={project.role[lang]} />
            <Block title={t.project.approach} paragraphs={project.approach[lang]} />
            <Block title={t.project.outcome} paragraphs={project.outcome[lang]} />
          </div>

          <aside>
            <div className="aside-group">
              <h2 className="tag-label">{t.project.stack}</h2>
              <p className="skill-line" style={{ fontSize: "var(--t-base)" }}>
                {project.stack.map((item, i) => (
                  <span key={item}>
                    {i > 0 ? " " : null}
                    <span className="skill-item">
                      {i > 0 ? <b aria-hidden="true">{"·\u00a0"}</b> : null}
                      {item}
                    </span>
                  </span>
                ))}
              </p>
            </div>
            {project.links?.live || project.links?.source ? (
              <div className="aside-group">
                <h2 className="tag-label">{t.project.links}</h2>
                <ul style={{ display: "grid", gap: "0.5rem" }}>
                  {project.links.live ? (
                    <li>
                      <a className="close-link" href={project.links.live} target="_blank" rel="noreferrer">
                        {t.project.live}
                        <ArrowUpRightIcon />
                      </a>
                    </li>
                  ) : null}
                  {project.links.source ? (
                    <li>
                      <a className="close-link" href={project.links.source} target="_blank" rel="noreferrer">
                        {t.project.source}
                        <ArrowUpRightIcon />
                      </a>
                    </li>
                  ) : null}
                </ul>
              </div>
            ) : null}
          </aside>
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
