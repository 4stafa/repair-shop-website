import type { ReactNode } from "react";

export default function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`mx-auto max-w-6xl px-6 py-16 ${className}`}>{children}</section>;
}
