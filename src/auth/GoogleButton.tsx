import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { getErrorMessage } from "../lib/Api";

export function GoogleButton() {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? "/";

  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (!import.meta.env.VITE_GOOGLE_CLIENT_ID) return null;

  return (
    <div className="space-y-3">
      <div className={`flex justify-center ${busy ? "pointer-events-none opacity-60" : ""}`}>
        <GoogleLogin
          text="continue_with"
          shape="pill"
          width="304"
          onSuccess={async (response) => {
            if (!response.credential) {
              setError("Google didn't return a token. Please try again.");
              return;
            }
            setError(null);
            setBusy(true);
            try {
              await loginWithGoogle(response.credential);
              navigate(from, { replace: true });
            } catch (err) {
              setError(getErrorMessage(err));
              setBusy(false);
            }
          }}
          onError={() => setError("Google sign-in was cancelled or failed.")}
        />
      </div>

      {error && (
        <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <div className="h-px flex-1 bg-border" />
        or
        <div className="h-px flex-1 bg-border" />
      </div>
    </div>
  );
}