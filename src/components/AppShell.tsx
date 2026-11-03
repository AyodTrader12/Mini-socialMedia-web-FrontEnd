import { Link, NavLink, Outlet } from "react-router-dom";
import { Home, LogOut, Moon, Sun, type LucideIcon } from "lucide-react";
import { useAuth } from "../auth/AuthProvider";
import { useTheme } from "../theme/ThemeProvider";
import { ThemeToggle } from "../theme/ThemeToggle";
import { Avatar } from "./Avatar";

type NavItem = { to: string; label: string; icon: LucideIcon };

// Add an entry here whenever a page is built: Saved (Day 13), Profile (Day 19), Settings, Admin
const NAV_ITEMS: NavItem[] = [{ to: "/", label: "Home", icon: Home }];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
    isActive ? "bg-secondary text-secondary-foreground" : "hover:bg-muted"
  }`;

export default function AppShell() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen">
      {/* Sidebar: large screens only */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-60 flex-col border-r bg-background p-4 lg:flex">
        <Link to="/" className="mb-6 px-3 text-xl font-semibold">
          Mini Social
        </Link>

        <nav className="flex-1 space-y-1">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end className={linkClass}>
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="space-y-1 border-t pt-3">
          <button onClick={toggleTheme} className={`${linkClass({ isActive: false })} w-full`}>
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
          <button onClick={logout} className={`${linkClass({ isActive: false })} w-full`}>
            <LogOut size={18} />
            Log out
          </button>
          {user && (
            <div className="flex items-center gap-3 px-3 pt-3">
              <Avatar username={user.username} src={user.avatar} size="sm" />
              <span className="truncate text-sm">@{user.username}</span>
            </div>
          )}
        </div>
      </aside>

      <div className="lg:pl-60">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/90 px-4 py-2 backdrop-blur">
          <span className="text-lg font-semibold lg:invisible">Mini Social</span>
          <ThemeToggle />
        </header>

        {user && !user.isVerified && (
          <div className="bg-secondary px-4 py-2 text-center text-sm text-secondary-foreground">
            Your email isn't verified yet.{" "}
            <Link to="/verify" className="font-medium underline">
              Verify now
            </Link>{" "}
            to post, like and comment.
          </div>
        )}

        <main className="mx-auto max-w-xl px-4 py-6 pb-24 lg:pb-6">
          <Outlet />
        </main>
      </div>

      {/* Bottom nav: small screens only */}
      <nav className="fixed inset-x-0 bottom-0 z-20 flex justify-around border-t bg-background py-2 lg:hidden">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            aria-label={label}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 rounded-lg px-4 py-1 text-xs ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}