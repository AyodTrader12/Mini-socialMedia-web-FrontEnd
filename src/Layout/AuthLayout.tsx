import type { ReactNode } from "react";
import { ThemeToggle } from "../theme/ThemeToggle";


export function AuthLayout({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between px-6 py-3">
        <span className="text-lg font-semibold">Mini Social</span>
        <ThemeToggle />
      </header>

      <main className="flex flex-1 items-center justify-center px-4 pb-16">
        <div className="w-full max-w-sm space-y-6 rounded-2xl border bg-card p-6 text-card-foreground shadow-sm">
          <div className="space-y-1 text-center">
            <h1 className="text-2xl font-semibold">{title}</h1>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}