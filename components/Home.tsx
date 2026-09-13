import { dict, type Lang } from "@/lib/i18n";
import { SITE } from "@/content/site";
import { ROLES, SKILLS } from "@/content/cv";
import { PROJECTS } from "@/content/projects";
import WorkIndex from "@/components/WorkIndex";
import Marquee from "@/components/Marquee";
import RotatingBadge from "@/components/RotatingBadge";
import HeroFluid from "@/components/HeroFluid";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Reveal from "@/components/Reveal";
import {
  MailIcon,
  DownloadIcon,
  GithubIcon,
  LinkedinIcon,
} from "@/components/icons";

/** Splits a sentence around its first whole-word occurrence of `word`. If the
 *  word is not there, the sentence comes back untouched and nothing takes
 *  the hand. */
function splitOnWord(sentence: string, word: string) {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const m = new RegExp(`(^|\\s)${escaped}(?=[\\s,.;:!?]|$)`).exec(sentence);
  if (!m) return { before: sentence, em: "", after: "" };
  const start = m.index + m[1].length;
  return { before: sentence.slice(0, start), em: word, after: sentence.slice(start + word.length) };
}

export default function Home({ lang }: { lang: Lang }) {
  const t = dict(lang);
  const current = ROLES.find((r) => r.current);
  const [first, ...rest] = SITE.name.split(" ");
  const last = rest.join(" ");
  const heroCh = Math.max(first.length, last.length, 5);
  const heroLead = splitOnWord(SITE.positioning[lang], SITE.positioningEm[lang]);
  // A newline in the sentence is a line break the author chose: the line
  // with the hand-written word must hold it, and automatic balancing does
  // not know that.
  const words = t.statement.before.split(/\s+/);
  const breakBefore = new Set(
    t.statement.before.split("\n").slice(0, -1).map((line, i, lines) =>
      lines.slice(0, i + 1).reduce((n, l) => n + l.trim().split(/\s+/).length, 0),
    ),
  );
  const counts = [
    { n: SITE.counts.roles ?? ROLES.length, label: t.counts.roles, href: "#path" },
    {
      n: SITE.counts.client ?? PROJECTS.filter((p) => p.kind === "client").length,
      label: t.counts.client,
      href: "#work",
    },
    {
      n: SITE.counts.perso ?? PROJECTS.filter((p) => p.kind === "perso").length,
      label: t.counts.perso,
      href: "#work",
    },
  ];

  return (
    <>
      <section className="band hero">
        <div className="inner">
          {/* The heading is passed as children, so it is still rendered on the
              server and is in the served HTML in every path. HeroFluid only
              ever fades it and draws over it — and only once a fine pointer
              has actually moved near the hero. */}
          <HeroFluid>
            <h1
              className="d-hero hero-name"
              style={{ "--hero-ch": heroCh } as React.CSSProperties}
            >
              {/* Outer span: the line, and its clip. Inner span: the text,
                  which rises into the clip on load. HeroFluid measures the
                  text through the outer span, so the pair reads as one line
                  to it; it also waits for this motion to end before it
                  rasterizes. */}
              <span>
                <span className="hero-line" style={{ "--i": 0 } as React.CSSProperties}>
                  {first}
                </span>
              </span>
              <span>
                <span className="hero-line" style={{ "--i": 1 } as React.CSSProperties}>
                  {last}
                </span>
              </span>
            </h1>
          </HeroFluid>

          <div className="hero-under">
            <div>
              <p className="tag-label hero-in" style={{ "--i": 0 } as React.CSSProperties}>
                {SITE.title[lang]}
                {SITE.location[lang] ? ` — ${SITE.location[lang]}` : ""}
              </p>
              <p
                className="hero-lead d-2 hero-in"
                style={{ marginTop: "0.75rem", "--i": 1 } as React.CSSProperties}
              >
                {/* Display type with one hand-written word, like the close. The
                    sentence stays one string for the metadata; it is split
                    here on the word that takes the hand. */}
                {heroLead.before}
                {heroLead.em ? <span className="em">{heroLead.em}</span> : null}
                {heroLead.after}
              </p>
              <div className="hero-actions hero-in" style={{ "--i": 2 } as React.CSSProperties}>
                <a className="btn btn--fill" href={`mailto:${SITE.email}`}>
                  <MailIcon />
                  {t.hero.actions.email}
                </a>
                {SITE.cv[lang] ? (
                  <a className="btn" href={SITE.cv[lang]} download>
                    <DownloadIcon />
                    {t.hero.actions.cv}
                  </a>
                ) : null}
                {SITE.github ? (
                  <a className="btn" href={SITE.github} target="_blank" rel="me noreferrer">
                    <GithubIcon />
                    {t.hero.actions.github}
                  </a>
                ) : null}
                {SITE.linkedin ? (
                  <a className="btn" href={SITE.linkedin} target="_blank" rel="me noreferrer">
                    <LinkedinIcon />
                    {t.hero.actions.linkedin}
                  </a>
                ) : null}
              </div>
            </div>
            <RotatingBadge text={t.badge} />
          </div>
        </div>
      </section>

      <div className="band--ink">
        <Marquee items={t.marquee} />
      </div>

      {/* The statement, with the site's one photograph beside it as a specimen:
          small, ruled top and bottom, carrying its own label. The picture is a
          documented object in a grid, not atmosphere behind the words — which
          is also why the sentence never has to cross it. */}
      <Reveal className="band statement-band">
        <div className="inner statement-grid">
          <figure className="portrait">
            {/* A greeting in the hand, hung over the top-left corner of the
                photograph the way a signature crosses the corner of a print.
                The outer span fades in with the band; the inner one carries
                the tilt, because the entrance animates the outer transform. */}
            <span className="portrait-sign st-in" style={{ "--i": 3 } as React.CSSProperties} aria-hidden="true">
              <span>{t.portrait.sign}</span>
            </span>
            <img
              src="/portrait/shiron.webp"
              srcSet="/portrait/shiron-640.webp 640w, /portrait/shiron.webp 1000w"
              sizes="(max-width: 900px) 13rem, 14rem"
              alt={`${SITE.name}, ${SITE.title[lang]}`}
              width={1000}
              height={1400}
            />
            <figcaption
              className="tag-label portrait-cap st-in"
              style={{ "--i": 3 } as React.CSSProperties}
            >
              {t.portrait.fig}
              <br />
              {t.portrait.note}
            </figcaption>
          </figure>

          <div className="statement-inner">
            {/* One clipped box per word, so each word rises on its own. The
                whitespace between them is real, so the sentence reads and
                copies as a sentence. */}
            <p className="d-1 statement-line">
              {words.map((w, i) => (
                <span key={i}>
                  {i > 0 ? (breakBefore.has(i) ? <br /> : " ") : null}
                  <span className="st-w" style={{ "--i": i } as React.CSSProperties}>
                    <span>{w}</span>
                  </span>
                </span>
              ))}{" "}
              <span className="st-w" style={{ "--i": words.length } as React.CSSProperties}>
                <span className="em">{t.statement.em}</span>
              </span>
            </p>
            <p className="lead statement-after st-in" style={{ "--i": 0 } as React.CSSProperties}>
              {t.statement.after}
            </p>
            <p className="statement-why st-in" style={{ "--i": 1 } as React.CSSProperties}>
              {t.statement.why}
            </p>
            {/* The three registers, counted and linked: the reader learns at
                the top of the page that there is more than employment here. */}
            <ul className="st-counts st-in" style={{ "--i": 2 } as React.CSSProperties}>
              {counts.map((c) => (
                <li key={c.href + c.label[0]}>
                  <a href={c.href}>
                    <b className="num">{c.n}</b>
                    <span>{c.n === 1 ? c.label[0] : c.label[1]}</span>
                  </a>
                </li>
              ))}
            </ul>
            {current ? (
              <p className="tag-label now-line st-in" style={{ "--i": 3 } as React.CSSProperties}>
                <span className="dot" aria-hidden="true" />
                {t.hero.now} {t.hero.nowRole} {t.hero.nowAt} {current.org[lang]}
              </p>
            ) : null}
          </div>
        </div>
      </Reveal>

      {/* Built by the scroll, both of them: the school as a poster that zooms
          into place, then the roles as a track that slides across while the
          page is pinned. Everything after them scrolls as before. */}
      <Education lang={lang} />
      <Experience lang={lang} />

      <section className="band band--pad" id="work">
        <div className="inner">
          <div className="head">
            <h2 className="d-2">{t.work.title}</h2>
            <p className="head-note">{t.work.lead}</p>
          </div>
          <WorkIndex lang={lang} />
        </div>
      </section>

      <section className="band band--pad" id="skills">
        <div className="inner">
          <div className="head">
            {/* The lead in the hand over the title, the reference's "Our"
                over SERVICES, instead of the note beside it. */}
            <h2 className="d-2 head-signed">
              <span className="head-sign">{t.skills.lead} </span>
              {t.skills.title}
            </h2>
          </div>
          {/* Two columns of capabilities: the capability, one sentence on how it
              shows in the work, then the tools in small type. */}
          <dl className="skills">
            {SKILLS.map((group) => {
              const compact = !group.statement[lang];
              return (
                <div className={compact ? "skills-row skills-row--compact" : "skills-row"} key={group.title.fr}>
                  <dt className="skills-title">{group.title[lang]}</dt>
                  <dd className="skills-body">
                    {group.statement[lang] ? (
                      <p className="skill-statement">{group.statement[lang]}</p>
                    ) : null}
                    <p className="skill-line skill-tools">
                      {group.items[lang].map((item, i) => (
                        <span key={item}>
                          {i > 0 ? " " : null}
                          <span className="skill-item">
                            {i > 0 ? <b aria-hidden="true">{"·\u00a0"}</b> : null}
                            {item}
                          </span>
                        </span>
                      ))}
                    </p>
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

    </>
  );
}
