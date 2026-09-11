import { dict, type Lang } from "@/lib/i18n";
import { SITE } from "@/content/site";
import LangLink from "@/components/LangLink";

export default function Footer({ lang }: { lang: Lang }) {
  const t = dict(lang);
  const year = new Date().getFullYear();
  return (
    <footer className="band">
      <div className="inner footer">
        <p className="footer-logo" aria-hidden="true">
          <img className="mark-img mark-img--dark" src="/brand/sb-logo-dark.png" alt="" width={640} height={597} />
          <img className="mark-img mark-img--light" src="/brand/sb-logo-light.png" alt="" width={640} height={597} />
        </p>
        <p className="num">
          © {year} {SITE.name} · {t.footer.rights}
        </p>
        <LangLink lang={lang}>
          {lang === "fr" ? "Read this page in English" : "Lire cette page en français"}
        </LangLink>
      </div>
    </footer>
  );
}
