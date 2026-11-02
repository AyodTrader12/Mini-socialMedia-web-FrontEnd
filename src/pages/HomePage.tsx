import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { ThemeToggle } from "../theme/ThemeToggle";
import { secondaryButton } from "../components/ui";

export default function HomePage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between border-b px-6 py-3">
        <h1 className="text-lg font-semibold">Mini Social</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button onClick={logout} className={secondaryButton}>
            Log out
          </button>
        </div>
      </header>

      {user && !user.isVerified && (
        <div className="bg-secondary px-6 py-2 text-center text-sm text-secondary-foreground">
          Your email isn't verified yet.{" "}
          <Link to="/verify" className="font-medium underline">
            Verify now
          </Link>{" "}
          to post, like and comment.
        </div>
      )}

      <main className="mx-auto max-w-xl p-6">
        <p>
          Signed in as <strong>@{user?.username}</strong> ({user?.role})
        </p>
        <p className="text-sm text-muted-foreground">The feed arrives on Day 13.</p>
      </main>
    </div>
  );
}