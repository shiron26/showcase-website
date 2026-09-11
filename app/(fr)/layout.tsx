import type { Metadata } from "next";
import type { ReactNode } from "react";
import RootShell, { baseMetadata } from "@/components/RootShell";

export const metadata: Metadata = baseMetadata("fr");

export default function FrRootLayout({ children }: { children: ReactNode }) {
  return <RootShell lang="fr">{children}</RootShell>;
}
