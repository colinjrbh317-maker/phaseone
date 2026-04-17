"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSignUp } from "@clerk/nextjs/legacy";
import { AlertTriangle, ShieldCheck } from "lucide-react";

const MIN_AGE = 21;

function calcAge(dob: string): number | null {
  if (!dob) return null;
  const birth = new Date(dob);
  if (Number.isNaN(birth.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age -= 1;
  return age;
}

export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const searchParams = useSearchParams();
  const blockedReason = searchParams.get("reason");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [over21, setOver21] = useState(false);
  const [researchOnly, setResearchOnly] = useState(false);
  const [code, setCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const age = useMemo(() => calcAge(dob), [dob]);
  const ageOk = age !== null && age >= MIN_AGE;
  const canSubmit =
    email.length > 3 &&
    password.length >= 8 &&
    dob.length === 10 &&
    ageOk &&
    over21 &&
    researchOnly &&
    !busy;

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded || !canSubmit) return;
    setError(null);
    setBusy(true);
    try {
      await signUp.create({
        emailAddress: email,
        password,
        unsafeMetadata: {
          age_verified: true,
          dob,
          research_use_accepted_at: new Date().toISOString(),
        },
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      const msg =
        (err as { errors?: Array<{ message?: string }> }).errors?.[0]?.message ??
        "Signup failed. Please try again.";
      setError(msg);
    } finally {
      setBusy(false);
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) return;
    setError(null);
    setBusy(true);
    try {
      const result = await signUp.attemptEmailAddressVerification({ code });
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/shop");
      } else {
        setError("Verification pending — check your email for the code.");
      }
    } catch (err) {
      const msg =
        (err as { errors?: Array<{ message?: string }> }).errors?.[0]?.message ??
        "Invalid code. Please try again.";
      setError(msg);
    } finally {
      setBusy(false);
    }
  }

  if (pendingVerification) {
    return (
      <div>
        <h1 className="font-heading font-black text-3xl uppercase tracking-tighter mb-2">
          Verify your email
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          We sent a 6-digit code to {email}.
        </p>
        <form onSubmit={handleVerify} className="space-y-4">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            inputMode="numeric"
            maxLength={6}
            placeholder="123456"
            className="w-full h-12 px-4 rounded-md border border-border bg-background text-lg font-mono tracking-widest text-center focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            aria-label="Verification code"
          />
          {error && (
            <p className="text-xs text-destructive">{error}</p>
          )}
          <button
            type="submit"
            disabled={code.length !== 6 || busy}
            className="w-full h-12 rounded-md gradient-button font-black uppercase tracking-widest text-sm disabled:opacity-50"
          >
            {busy ? "Verifying…" : "Verify email"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-heading font-black text-3xl uppercase tracking-tighter mb-2">
        Create account
      </h1>
      <p className="text-sm text-muted-foreground mb-6">
        Research accounts require age and use-case attestation.
      </p>

      {blockedReason === "age" && (
        <div className="mb-5 flex items-start gap-2 rounded-md border border-primary/40 bg-primary/10 p-3">
          <AlertTriangle size={16} className="text-primary mt-0.5 shrink-0" />
          <p className="text-xs text-foreground leading-relaxed">
            That page requires a verified 21+ research account. Complete the signup below to continue.
          </p>
        </div>
      )}

      <form onSubmit={handleSignUp} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="w-full h-11 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            autoComplete="new-password"
            className="w-full h-11 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          />
          <p className="text-[10px] text-muted-foreground mt-1">Minimum 8 characters.</p>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
            Date of birth
          </label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
            max={new Date().toISOString().slice(0, 10)}
            className="w-full h-11 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          />
          {dob && !ageOk && (
            <p className="text-[10px] text-destructive mt-1">
              You must be at least {MIN_AGE} years old to create an account.
            </p>
          )}
        </div>

        <div id="clerk-captcha" />

        <div className="space-y-3 rounded-md border border-border bg-card/40 p-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={over21}
              onChange={(e) => setOver21(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
            />
            <span className="text-xs leading-relaxed text-foreground">
              I confirm I am at least <strong>{MIN_AGE} years of age</strong>.
            </span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={researchOnly}
              onChange={(e) => setResearchOnly(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
            />
            <span className="text-xs leading-relaxed text-foreground">
              I understand all products are sold strictly for{" "}
              <strong>in-vitro laboratory research use only</strong> and are{" "}
              <strong>not for human consumption, ingestion, or injection</strong>.
            </span>
          </label>
        </div>

        {error && <p className="text-xs text-destructive">{error}</p>}

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full h-12 rounded-md gradient-button font-black uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {busy ? "Creating account…" : "Create research account"}
        </button>

        <p className="text-[11px] text-muted-foreground leading-relaxed text-center flex items-center justify-center gap-1.5">
          <ShieldCheck size={12} className="text-primary" />
          By creating an account you agree to our{" "}
          <Link href="/terms-of-service" className="underline hover:text-primary">
            terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy-policy" className="underline hover:text-primary">
            privacy policy
          </Link>
          .
        </p>

        <p className="text-xs text-muted-foreground text-center pt-2">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-primary font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
