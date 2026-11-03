import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../auth/AuthProvider";
import { getErrorMessage } from "../lib/Api";
import { loginSchema, type LoginForm } from "../lib/Schema";
import { AuthLayout } from "../Layout/AuthLayout";
import { Field } from "../components/Field";
import { inputClass, primaryButton } from "../components/ui";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? "/";

  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginForm) => {
    setServerError(null);
    try {
      await login(values.email, values.password);
      navigate(from, { replace: true });
    } catch (err) {
      setServerError(getErrorMessage(err));
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Log in to continue">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Field label="Email" error={errors.email?.message}>
          <input type="email" autoComplete="email" className={inputClass} {...register("email")} />
        </Field>

        <Field label="Password" error={errors.password?.message}>
          <input type="password" autoComplete="current-password" className={inputClass} {...register("password")} />
        </Field>

        {serverError && (
          <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {serverError}
          </p>
        )}

        <button type="submit" disabled={isSubmitting} className={primaryButton}>
          {isSubmitting ? "Logging in..." : "Log in"}
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        New here?{" "}
        <Link to="/register" className="font-medium text-foreground underline">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}