import type { ReactNode } from "react";
import Header from "./_Header";

export default function Layout({ hero, children }:{ hero?: ReactNode; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header />
      {hero}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-10">{children}</main>
      <footer className="mt-20 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 text-sm text-slate-500">
          © {new Date().getFullYear()} Repair Shop. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
