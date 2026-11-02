import { ThemeToggle } from "./theme/ThemeToggle";

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between border-b px-6 py-3">
        <h1 className="text-lg font-semibold">Mini Social</h1>
        <ThemeToggle />
      </header>

      <main className="mx-auto max-w-xl space-y-4 p-6">
        <div className="rounded-xl border bg-card p-4 text-card-foreground">
          <p className="font-medium">A post card</p>
          <p className="text-sm text-muted-foreground">Muted text sits under the main text.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="rounded-full bg-primary px-4 py-2 text-primary-foreground">Create post</button>
          <button className="rounded-full bg-secondary px-4 py-2 text-secondary-foreground">Follow</button>
          <button className="rounded-full bg-accent px-4 py-2 text-accent-foreground">Accent</button>
          <button className="rounded-full bg-destructive px-4 py-2 text-white">Delete</button>
        </div>

        <input
          placeholder="Focus me to see the ring"
          className="w-full rounded-lg border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
        />
      </main>
    </div>
  );
}