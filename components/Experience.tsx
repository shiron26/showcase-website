import { dict, type Lang } from "@/lib/i18n";
import { ROLES } from "@/content/cv";
import Reveal from "@/components/Reveal";
import { Star } from "@/components/icons";

/**
 * The roles, one chapter each.
 *
 * Each chapter is a two-column spread: on the left, the years set at poster
 * scale on the field, pinned while its chapter scrolls, with the stack under
 * it; on the right, the date, the company, the role, the lead sentence, the
 * missions — and the full story folded behind "Read the story", a native
 * <details> that works without a script.
 */
export default function Experience({ lang }: { lang: Lang }) {
  const t = dict(lang);
  const n = ROLES.length;

  // The two lines of each field: the start year, then the end year, "present"
  // or "internship".
  const lines = ROLES.map((role) => {
    const [from, to] = role.period.split("—").map((s) => s.trim());
    const isNow = !!role.current;
    return {
      from,
      to,
      isNow,
      first: from,
      second: isNow ? t.path.present : to || (role.internship ? t.path.internship : ""),
      secondIsWord: isNow || (!to && !!role.internship),
    };
  });

  return (
    <section className="band band--pad xp" id="path">
      <div className="inner">
        <div className="head">
          <h2 className="d-2">{t.path.title}</h2>
          <p className="head-note">{t.path.lead}</p>
        </div>

        <ol className="xp-list">
          {ROLES.map((role, i) => {
            const me = lines[i];
            const period = me.isNow ? `${me.from} — ${t.path.present}` : role.period;
            const meta = [
              period,
              role.months?.[lang],
              role.internship ? t.path.internship : null,
              role.location?.[lang],
            ].filter(Boolean);
            const [lead, ...story] = role.description[lang];

            return (
              <Reveal
                as="li"
                className="xp-entry"
                key={`${role.org.fr}-${role.period}`}
                threshold={0.12}
              >
                <div className="xp-aside">
                  <div
                    className="xp-field"
                    data-current={role.current ? "" : undefined}
                    aria-hidden="true"
                  >
                    <span className="tag-label num xp-n">
                      {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                    </span>
                    <span className="xp-field-org">{role.org[lang]}</span>
                    <span className="xp-years num">
                      <span>{me.first}</span>
                      {me.second ? <span>{me.second}</span> : null}
                    </span>
                    {role.current ? <span className="dot xp-dot" /> : null}
                  </div>
                  {role.stack.length ? (
                    <div className="xp-aside-stack">
                      <h4 className="tag-label xp-sub">{t.project.stack}</h4>
                      <ul className="xp-stack">
                        {role.stack.map((item) => (
                          <li key={item} className="chip">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>

                <div className="xp-body">
                  <p className="tag-label num xp-date">
                    {meta.map((m, k) => (
                      <span key={k}>
                        {k > 0 ? <b aria-hidden="true">{" · "}</b> : null}
                        {m}
                      </span>
                    ))}
                    {role.sample ? <span className="sample-mark">{t.placeholder.chip}</span> : null}
                  </p>
                  <h3 className="xp-title">{role.org[lang]}</h3>
                  <p className="xp-role">{role.title[lang]}</p>

                  {lead ? <p className="lead xp-lead">{lead}</p> : null}

                  {story.length ? (
                    <details className="xp-fold">
                      <summary className="xp-more">
                        <span className="xp-more-open">{t.path.readMore}</span>
                        <span className="xp-more-close">{t.path.readLess}</span>
                        <span className="xp-more-arrow" aria-hidden="true">
                          ↓
                        </span>
                      </summary>
                      <div className="xp-fold-in">
                        <div className="xp-desc">
                          {story.map((p, k) => (
                            <p key={k}>{p}</p>
                          ))}
                        </div>
                      </div>
                    </details>
                  ) : null}

                  {role.missions[lang].length ? (
                    <>
                      <h4 className="tag-label xp-sub">{t.path.missions}</h4>
                      <ul className="xp-missions">
                        {role.missions[lang].map((m, k) => (
                          <li key={k}>
                            <Star className="xp-mark" />
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
