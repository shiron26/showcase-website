import { dict, type Lang } from "@/lib/i18n";
import { STUDIES } from "@/content/cv";
import Scrub from "@/components/Scrub";

/**
 * The school, as a poster built by the scroll.
 *
 * One inset ink panel holds the school's name at a scale that does not fit —
 * the first thing seen is the middle of the word, cropped by the panel's edge.
 * Scrolling zooms it out and sharpens it until the whole name sits on one
 * line; the four facts (city, years, degree, programme) then rise around it,
 * one after another. Scroll back up and it all runs in reverse, because every
 * value here is a function of `--p` and nothing is ever tweened by time.
 *
 * At rest (no JS, reduced motion) this is a plain full-height panel with the
 * name at its final size and every fact visible: see Scrub.tsx.
 */
export default function Education({ lang }: { lang: Lang }) {
  const t = dict(lang).education;
  const [study, ...earlier] = STUDIES;
  if (!study) return null;
  const word = study.school[lang].toUpperCase();
  const cells = [
    { k: t.city, v: study.city[lang], big: true },
    { k: t.years, v: study.period, big: true, num: true },
    { k: t.degree, v: study.title[lang] },
    { k: t.school, v: study.note[lang] },
  ];

  return (
    <Scrub id="education" className="edu">
      <div className="edu-stick">
        <div className="edu-panel">
          <div className="edu-top">
            <p className="tag-label edu-kicker">{t.title}</p>
            <p className="tag-label edu-kicker edu-kicker--right">{t.lead}</p>
          </div>

          <h2
            className="edu-word"
            style={{ "--edu-ch": word.length } as React.CSSProperties}
          >
            {word}
          </h2>

          <dl className="edu-meta">
            {cells.map((cell, i) => (
              <div
                className="edu-cell"
                key={cell.k}
                style={{ "--i": i } as React.CSSProperties}
              >
                <dt className="tag-label">{cell.k}</dt>
                <dd className={cell.big ? `d-3${cell.num ? " num" : ""}` : "edu-cell-text"}>
                  {cell.v}
                </dd>
              </div>
            ))}
          </dl>
          {earlier.length ? (
            <p
              className="tag-label edu-cell edu-prior"
              style={{ "--i": cells.length } as React.CSSProperties}
            >
              {earlier
                .map((e) => `${e.title[lang]} — ${e.school[lang]}, ${e.period}`)
                .join(" · ")}
            </p>
          ) : null}
        </div>
      </div>
    </Scrub>
  );
}
