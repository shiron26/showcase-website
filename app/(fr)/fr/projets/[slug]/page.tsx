import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS, getProject } from "@/content/projects";
import ProjectPage from "@/components/ProjectPage";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "404" };
  return {
    title: project.title,
    description: project.summary.fr,
    alternates: {
      canonical: `/fr/projets/${project.slug}`,
      languages: { fr: `/fr/projets/${project.slug}`, en: `/en/projects/${project.slug}` },
    },
  };
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <ProjectPage project={project} lang="fr" />;
}
