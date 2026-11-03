import { useAuth } from "../auth/AuthProvider";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-2">
      <p>
        Signed in as <strong>@{user?.username}</strong> ({user?.role})
      </p>
      <p className="text-sm text-muted-foreground">The feed arrives on Day 13.</p>
    </div>
  );
}