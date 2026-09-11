import type { Metadata } from "next";
import type { ReactNode } from "react";
import RootShell, { baseMetadata } from "@/components/RootShell";

export const metadata: Metadata = baseMetadata("en");

export default function EnRootLayout({ children }: { children: ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
