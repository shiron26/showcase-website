import Link from "next/link";
import { dict } from "@/lib/i18n";

export default function NotFound() {
  const t = dict("en").project;
  return (
    <div className="band" style={{ paddingBlock: "9rem 6rem" }}>
      <div className="inner empty">
      <h1 className="d-2">{t.notFound}</h1>
      <p className="lead" style={{ color: "var(--fg-2)" }}>{t.notFoundHint}</p>
      <Link className="btn btn--fill" href="/en#work" style={{ marginTop: "1rem" }}>
        {t.back}
      </Link>
      </div>
    </div>
  );
}
