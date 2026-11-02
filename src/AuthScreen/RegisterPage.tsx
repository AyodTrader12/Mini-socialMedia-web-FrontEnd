import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../auth/AuthProvider";
import { getErrorMessage } from "../lib/Api";
import { registerSchema, type RegisterForm } from "../lib/Schema";
import { AuthLayout } from "../components/AuthLayout";
import { Field } from "../components/Field";
import { inputClass, primaryButton } from "../components/ui";

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (values: RegisterForm) => {
    setServerError(null);
    try {
      await registerUser(values.username, values.email, values.password);
      navigate("/verify", { replace: true });
    } catch (err) {
      setServerError(getErrorMessage(err));
    }
  };

  return (
    <AuthLayout title="Create your account" subtitle="It only takes a minute">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Field label="Username" error={errors.username?.message}>
          <input autoComplete="username" className={inputClass} {...register("username")} />
        </Field>

        <Field label="Email" error={errors.email?.message}>
          <input type="email" autoComplete="email" className={inputClass} {...register("email")} />
        </Field>

        <Field label="Password" error={errors.password?.message}>
          <input type="password" autoComplete="new-password" className={inputClass} {...register("password")} />
        </Field>

        {serverError && (
          <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {serverError}
          </p>
        )}

        <button type="submit" disabled={isSubmitting} className={primaryButton}>
          {isSubmitting ? "Creating account..." : "Sign up"}
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-foreground underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}