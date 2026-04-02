import type { ReactNode } from "react";
import PublicLayout from "@/app/(public)/layout";

export default function ProductLayout({ children }: { children: ReactNode }) {
  return <PublicLayout>{children}</PublicLayout>;
}
