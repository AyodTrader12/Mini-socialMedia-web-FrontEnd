import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../auth/AuthProvider";
import { api, getErrorMessage } from "../lib/Api";
import { verifySchema, type VerifyForm } from "../lib/Schema";
import type { User } from "../types/Api";
import { AuthLayout } from "../Layout/AuthLayout";
import { Field } from "../components/Field";
import { inputClass, primaryButton, secondaryButton } from "../components/ui";

export default function VerifyPage() {
  const { user, setUser, logout } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const [resending, setResending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyForm>({ resolver: zodResolver(verifySchema) });

  // Count the resend cooldown down, one second at a time
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  if (user?.isVerified) return <Navigate to="/" replace />;

  const onSubmit = async ({ otp }: VerifyForm) => {
    setError(null);
    setInfo(null);
    try {
      const { data } = await api.post<{ user: User }>("/auth/verify-account", { otp });
      setUser(data.user);
      navigate("/", { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const resend = async () => {
    setError(null);
    setInfo(null);
    setResending(true);
    try {
      await api.post("/auth/resend-otp");
      setInfo("A new code is on its way.");
      setCooldown(60);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setResending(false);
    }
  };

  return (
    <AuthLayout title="Verify your email" subtitle={`We sent a 6-digit code to ${user?.email ?? "your email"}`}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Field label="Verification code" error={errors.otp?.message}>
          <input
            inputMode="numeric"
            maxLength={6}
            autoComplete="one-time-code"
            placeholder="123456"
            className={`${inputClass} text-center text-lg tracking-[0.4em]`}
            {...register("otp")}
          />
        </Field>

        {error && (
          <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}
        {info && <p className="rounded-lg bg-muted px-3 py-2 text-sm">{info}</p>}

        <button type="submit" disabled={isSubmitting} className={primaryButton}>
          {isSubmitting ? "Verifying..." : "Verify"}
        </button>
      </form>

      <div className="flex items-center justify-between">
        <button type="button" onClick={resend} disabled={resending || cooldown > 0} className={secondaryButton}>
          {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
        </button>
        <button type="button" onClick={logout} className="text-sm text-muted-foreground underline">
          Log out
        </button>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        <a href="/" className="underline">
          Skip for now
        </a>{" "}
        (you can browse, but not post or comment)
      </p>
    </AuthLayout>
  );
}