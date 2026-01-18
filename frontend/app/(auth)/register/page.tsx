"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerSchema } from "@/app/schemas/register.schema";

export default function SignUpPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    mobile?: string;
    password?: string;
    confirm?: string;
    server?: string;
  }>({});

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = registerSchema.safeParse({
      fullName,
      email,
      mobile,
      password,
      confirm,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        fullName: fieldErrors.fullName?.[0],
        email: fieldErrors.email?.[0],
        mobile: fieldErrors.mobile?.[0],
        password: fieldErrors.password?.[0],
        confirm: fieldErrors.confirm?.[0],
      });
      setLoading(false);
      return;
    }

    setErrors({});

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: result.data.fullName,
          email: result.data.email,
          mobile: result.data.mobile,
          password: result.data.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({
          server: data.message || "Registration failed",
        });
        setLoading(false);
        return;
      }

      // Redirect to login after successful signup
      router.push("/login");
    } catch (error) {
      setErrors({
        server: "Failed to connect to server. Make sure backend is running on http://localhost:5000",
      });
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat relative overflow-x-hidden"
      style={{ backgroundImage: "url('/images/BackgroundPage.png')" }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* glow accents */}
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-orange-500/25 blur-3xl" />
      <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-orange-400/20 blur-3xl" />

      {/* card */}
      <div className="relative z-10 w-90 md:w-115 rounded-2xl border border-white/10 bg-white/5 p-7 shadow-2xl backdrop-blur-xl">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 h-14 w-14 rounded-full border border-orange-400/80 bg-black/30 grid place-items-center shadow-[0_0_30px_rgba(251,146,60,0.25)]">
            <span className="text-orange-300 text-xl font-semibold">J</span>
          </div>
          <p className="text-orange-200/90 tracking-[0.35em] text-xs">
            JHASHA RESTAURANT
          </p>
          <h1 className="mt-3 text-white text-2xl font-semibold">
            Create Account
          </h1>
          <p className="mt-1 text-white/60 text-sm">
            Join us for quick ordering & services.
          </p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          {/* server error */}
          {errors.server && (
            <div className="rounded-lg bg-red-500/20 border border-red-500/50 p-3">
              <p className="text-xs text-red-300">{errors.server}</p>
            </div>
          )}

          {/* full name */}
          <div>
            <label className="mb-1 block text-sm text-white/70">
              Full Name
            </label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-orange-400/60 focus:ring-2 focus:ring-orange-400/20"
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-400">{errors.fullName}</p>
            )}
          </div>

          {/* email */}
          <div>
            <label className="mb-1 block text-sm text-white/70">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              inputMode="email"
              placeholder="e.g. you@example.com"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-orange-400/60 focus:ring-2 focus:ring-orange-400/20"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">{errors.email}</p>
            )}
          </div>

          {/* mobile */}
          <div>
            <label className="mb-1 block text-sm text-white/70">
              Mobile Number
            </label>
            <input
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
              inputMode="numeric"
              placeholder="e.g. 98XXXXXXXX"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-orange-400/60 focus:ring-2 focus:ring-orange-400/20"
            />
            {errors.mobile && (
              <p className="mt-1 text-xs text-red-400">{errors.mobile}</p>
            )}
          </div>

          {/* password */}
          <div>
            <label className="mb-1 block text-sm text-white/70">
              Password
            </label>
            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPass ? "text" : "password"}
                placeholder="Minimum 6 characters"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 pr-12 text-white placeholder:text-white/30 outline-none focus:border-orange-400/60 focus:ring-2 focus:ring-orange-400/20"
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs text-white/60 hover:text-white"
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-400">{errors.password}</p>
            )}
          </div>

          {/* confirm password */}
          <div>
            <label className="mb-1 block text-sm text-white/70">
              Confirm Password
            </label>
            <input
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              type={showPass ? "text" : "password"}
              placeholder="Re-type password"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-orange-400/60 focus:ring-2 focus:ring-orange-400/20"
            />
            {errors.confirm && (
              <p className="mt-1 text-xs text-red-400">{errors.confirm}</p>
            )}
          </div>

          {/* signup button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white shadow-[0_10px_30px_rgba(249,115,22,0.35)] transition hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <p className="text-center text-sm text-white/70">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-orange-200/90 hover:text-orange-200 underline underline-offset-4"
            >
              Login
            </Link>
          </p>

          <p className="pt-1 text-center text-xs text-white/40">
            We’ll use your email & mobile for login & verification.
          </p>
        </form>
      </div>
    </div>
  );
}
