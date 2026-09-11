import type { Metadata } from "next";
import Home from "@/components/Home";
import { SITE } from "@/content/site";

/**
 * `/` serves the French home page directly rather than redirecting. A redirect
 * here prerenders as an error document, which would be what a static host
 * served at the root; rendering the page keeps `/` working on any host, with
 * the canonical pointing at `/fr`.
 */
export const metadata: Metadata = {
  alternates: { canonical: "/fr", languages: { fr: "/fr", en: "/en" } },
  description: SITE.positioning.fr,
};

export default function RootIndex() {
  return <Home lang="fr" />;
}
