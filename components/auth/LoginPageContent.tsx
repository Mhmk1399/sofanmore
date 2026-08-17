"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  LockKeyhole,
  Phone,
  ShieldCheck,
  UserRound,
  UserPlus,
} from "lucide-react";

import {
  ClayInput,
  Spinner,
} from "@/components/lead-capture/ClayFormControls";
import { useToast } from "@/components/ui/ToastProvider";
import type { UserRole } from "@/models/user";

type AuthMode = "login" | "signup";

type AuthUser = {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
};

type AuthResponse =
  | {
      ok: true;
      user: AuthUser;
    }
  | {
      ok: false;
      message?: string;
      fieldErrors?: Record<string, string>;
    };

type AuthErrors = Partial<Record<"name" | "phone" | "password" | "form", string>>;

const initialValues = {
  name: "",
  phone: "",
  password: "",
};

const passwordRules = [
  {
    label: "10+ characters",
    test: (value: string) => value.length >= 10,
  },
  {
    label: "Upper and lower case",
    test: (value: string) => /[A-Z]/.test(value) && /[a-z]/.test(value),
  },
  {
    label: "Number",
    test: (value: string) => /[0-9]/.test(value),
  },
  {
    label: "Symbol",
    test: (value: string) => /[^A-Za-z0-9]/.test(value),
  },
];

function validatePhone(phone: string) {
  const normalized = phone.trim().startsWith("+")
    ? `+${phone.replace(/\D/g, "")}`
    : phone.replace(/\D/g, "");

  return /^\+?[0-9]{7,20}$/.test(normalized);
}

function validateClientValues(
  mode: AuthMode,
  values: typeof initialValues,
): AuthErrors {
  const errors: AuthErrors = {};

  if (mode === "signup" && values.name.trim().length < 2) {
    errors.name = "Enter your name.";
  }

  if (!validatePhone(values.phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!values.password) {
    errors.password = "Enter a password.";
  } else if (
    mode === "signup" &&
    passwordRules.some((rule) => !rule.test(values.password))
  ) {
    errors.password = "Use a stronger password.";
  }

  return errors;
}

function getSafeNextPath() {
  if (typeof window === "undefined") return "/admin";

  const next = new URLSearchParams(window.location.search).get("next");

  if (!next || !next.startsWith("/") || next.startsWith("//")) {
    return "/admin";
  }

  return next;
}

async function readAuthResponse(response: Response) {
  const body = (await response.json()) as AuthResponse;

  if (!response.ok || body.ok !== true) {
    const error = new Error(
      body.ok === false && body.message
        ? body.message
        : "Authentication request failed.",
    ) as Error & { fieldErrors?: AuthErrors };

    if (body.ok === false) {
      error.fieldErrors = body.fieldErrors;
    }

    throw error;
  }

  return body;
}

export default function LoginPageContent() {
  const router = useRouter();
  const toast = useToast();
  const [mode, setMode] = useState<AuthMode>("login");
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<AuthErrors>({});
  const [loading, setLoading] = useState(false);

  const passwordScore = useMemo(
    () => passwordRules.filter((rule) => rule.test(values.password)).length,
    [values.password],
  );

  function updateValue(field: keyof typeof initialValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const next = { ...current };

      delete next[field];
      delete next.form;

      return next;
    });
  }

  function switchMode(nextMode: AuthMode) {
    setMode(nextMode);
    setErrors({});
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateClientValues(mode, values);

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.error("Please check the highlighted fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        mode === "signup" ? "/api/auth/signup" : "/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            mode === "signup"
              ? values
              : {
                  phone: values.phone,
                  password: values.password,
                },
          ),
        },
      );
      const result = await readAuthResponse(response);

      toast.success(
        mode === "signup" ? "Account created." : "Signed in.",
        result.user.role === "ADMIN"
          ? "Opening the admin dashboard."
          : "Your account is active as a standard user.",
      );

      if (result.user.role === "ADMIN") {
        router.replace(getSafeNextPath());
      } else {
        router.replace("/");
      }
    } catch (error) {
      const apiError = error as Error & { fieldErrors?: AuthErrors };
      const message =
        error instanceof Error ? error.message : "Authentication request failed.";

      if (apiError.fieldErrors) {
        setErrors(apiError.fieldErrors);
      } else {
        setErrors({ form: message });
      }

      toast.error(
        mode === "signup" ? "Signup failed." : "Login failed.",
        message,
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative mt-20 overflow-hidden bg-[var(--brand-ivory)] px-3 py-10 sm:px-5 lg:px-7 lg:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,#fffdf8_0%,#f4ecdf_50%,#e2d0b8_100%)]"
      />
      <div className="relative z-10 mx-auto grid max-w-[var(--site-width)] gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <section className="clay-surface-strong rounded-[32px] p-[7px] lg:rounded-[42px]">
          <div className="clay-inset overflow-hidden rounded-[26px] bg-[#f5ede1] p-6 sm:p-8 lg:rounded-[34px] lg:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-[17px] bg-[var(--brand-navy)] text-[var(--brand-gold)] shadow-[var(--shadow-clay-sm)]">
              <ShieldCheck size={23} strokeWidth={1.7} />
            </div>
            <p className="mt-7 font-brand-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-gold-700)]">
              Sofa N More Account
            </p>
            <h1 className="mt-3 max-w-[540px] font-brand-display text-[42px] font-semibold leading-[1.02] text-[var(--brand-navy)] sm:text-[55px]">
              Access your Sofa N More workspace
            </h1>
            <p className="mt-5 max-w-[560px] font-brand-sans text-[13px] font-semibold leading-[1.75] text-[var(--brand-text-muted)]">
              Sign in with your phone number and password. New accounts are
              created as standard users and can be upgraded by an admin.
            </p>
          </div>
        </section>

        <section className="clay-surface-strong rounded-[32px] p-[7px] lg:rounded-[38px]">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="clay-inset rounded-[26px] p-5 sm:p-7 lg:rounded-[31px] lg:p-8"
          >
            <div className="grid grid-cols-2 gap-2 rounded-[20px] bg-white/20 p-1.5">
              <button
                type="button"
                onClick={() => switchMode("login")}
                className={`min-h-[46px] rounded-[16px] font-brand-sans text-[12px] font-extrabold uppercase tracking-[0.1em] transition-colors ${
                  mode === "login"
                    ? "bg-[var(--brand-navy)] text-white shadow-[var(--shadow-clay-sm)]"
                    : "text-[var(--brand-text-muted)] hover:bg-white/28"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => switchMode("signup")}
                className={`min-h-[46px] rounded-[16px] font-brand-sans text-[12px] font-extrabold uppercase tracking-[0.1em] transition-colors ${
                  mode === "signup"
                    ? "bg-[var(--brand-navy)] text-white shadow-[var(--shadow-clay-sm)]"
                    : "text-[var(--brand-text-muted)] hover:bg-white/28"
                }`}
              >
                Sign Up
              </button>
            </div>

            <div className="mt-7 space-y-5">
              {mode === "signup" && (
                <ClayInput
                  id="auth-name"
                  label="Name"
                  value={values.name}
                  onChange={(value) => updateValue("name", value)}
                  error={errors.name}
                  required
                  autoComplete="name"
                  placeholder="Your name"
                />
              )}

              <ClayInput
                id="auth-phone"
                label="Phone"
                value={values.phone}
                onChange={(value) => updateValue("phone", value)}
                error={errors.phone}
                required
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+44..."
              />

              <ClayInput
                id="auth-password"
                label="Password"
                value={values.password}
                onChange={(value) => updateValue("password", value)}
                error={errors.password}
                required
                type="password"
                autoComplete={
                  mode === "signup" ? "new-password" : "current-password"
                }
                placeholder="Your password"
              />
            </div>

            {mode === "signup" && (
              <div className="mt-5 rounded-[20px] border border-white/65 bg-white/22 p-4">
                <div className="h-2 overflow-hidden rounded-full bg-white/42">
                  <div
                    className="h-full rounded-full bg-[var(--brand-navy)] transition-all"
                    style={{
                      width: `${(passwordScore / passwordRules.length) * 100}%`,
                    }}
                  />
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {passwordRules.map((rule) => {
                    const passed = rule.test(values.password);

                    return (
                      <span
                        key={rule.label}
                        className={`flex items-center gap-2 font-brand-sans text-[11px] font-bold ${
                          passed
                            ? "text-[#245b31]"
                            : "text-[var(--brand-text-muted)]"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            passed ? "bg-[#6f9874]" : "bg-white/70"
                          }`}
                        />
                        {rule.label}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="snm-button snm-button--gold snm-button--lg snm-button--full mt-7 disabled:pointer-events-none disabled:opacity-55"
            >
              <span className="snm-button__icon">
                {loading ? (
                  <Spinner />
                ) : mode === "signup" ? (
                  <UserPlus size={16} strokeWidth={1.8} />
                ) : (
                  <ArrowRight size={16} strokeWidth={1.8} />
                )}
              </span>
              <span className="snm-button__label">
                {loading
                  ? mode === "signup"
                    ? "Creating Account..."
                    : "Signing In..."
                  : mode === "signup"
                    ? "Create Account"
                    : "Login"}
              </span>
            </button>

            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              <AuthHint icon={<Phone size={15} />} label="Phone login" />
              <AuthHint
                icon={<LockKeyhole size={15} />}
                label="Strong password"
              />
              <AuthHint icon={<UserRound size={15} />} label="User by default" />
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

function AuthHint({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-[16px] border border-white/65 bg-white/22 px-3 font-brand-sans text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--brand-text-muted)]">
      <span className="text-[var(--brand-gold-700)]">{icon}</span>
      {label}
    </span>
  );
}
