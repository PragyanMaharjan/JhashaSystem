"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  adminLoginSchema,
  type AdminLoginValues,
} from "../../schemas/admin-login.schema";

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<AdminLoginValues>({
    resolver: zodResolver(adminLoginSchema),
    mode: "onChange",
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = async (values: AdminLoginValues) => {
    try {
      // Store admin credentials temporarily
      localStorage.setItem("adminToken", JSON.stringify(values));
      
      // ✅ redirect to admin dashboard
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Admin login failed:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat relative overflow-x-hidden"
      style={{ backgroundImage: "url('/images/Background2.jpeg')" }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* glow accents */}
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-orange-500/25 blur-3xl" />
      <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-orange-400/20 blur-3xl" />

      {/* card */}
      <div className="relative z-10 w-90 md:w-115 rounded-2xl border border-white/10 bg-white/5 p-7 shadow-2xl backdrop-blur-xl">
        {/* header */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 h-14 w-14 rounded-full border border-orange-400/80 bg-black/30 grid place-items-center shadow-[0_0_30px_rgba(251,146,60,0.25)]">
            <span className="text-orange-300 text-xl font-semibold">J</span>
          </div>

          <p className="text-orange-200/90 tracking-[0.35em] text-xs">
            JHASHA RESTAURANT
          </p>

          <h1 className="mt-3 text-white text-2xl font-semibold">Admin Login</h1>
          <p className="mt-1 text-white/60 text-sm">Authorized staff only.</p>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* username */}
          <div>
            <label className="mb-1 block text-sm text-white/70">
              Admin Username
            </label>
            <input
              placeholder="Enter admin username"
              {...register("username")}
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-orange-400/60 focus:ring-2 focus:ring-orange-400/20"
            />
            {errors.username?.message && (
              <p className="mt-1 text-xs text-red-300">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* password */}
          <div>
            <label className="mb-1 block text-sm text-white/70">Password</label>
            <div className="relative">
              <input
                placeholder="Minimum 6 characters"
                type={showPass ? "text" : "password"}
                {...register("password")}
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
            {errors.password?.message && (
              <p className="mt-1 text-xs text-red-300">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* login */}
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white shadow-[0_10px_30px_rgba(249,115,22,0.35)] transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Admin Login"}
          </button>

          {/* links */}
          <div className="flex items-center justify-between text-sm">
            <Link
              href="/login"
              className="text-orange-200/90 hover:text-orange-200 underline underline-offset-4"
            >
              Customer Login
            </Link>

            <button
              type="button"
              className="text-white/60 hover:text-white underline underline-offset-4"
              onClick={() => alert("Add your admin forgot password flow")}
            >
              Forgot?
            </button>
          </div>

          <p className="pt-2 text-center text-xs text-white/40">
            Admin area is restricted.
          </p>
        </form>
      </div>
    </div>
  );
}
