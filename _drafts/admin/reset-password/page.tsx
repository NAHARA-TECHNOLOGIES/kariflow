"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
} from "lucide-react";

export default function ResetPasswordPage() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [error, setError] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");

    if (!token) {
      setError("Invalid reset link.");

      return;
    }

    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters."
      );

      return;
    }

    if (password !== confirmPassword) {
      setError(
        "Passwords do not match."
      );

      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "/api/auth/reset-password",
        {
          token,
          password,
        }
      );

      setSuccess(true);

      setTimeout(() => {
        router.push("/admin/login");
      }, 2500);
    } catch (err: any) {
      setError(
        err.response?.data?.message ??
          "Unable to reset password."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl"
      >

        <Link
          href="/admin/login"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black"
        >
          <ArrowLeft size={18} />

          Back to Login
        </Link>

        <div className="mb-8 text-center">

          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-black text-white">

            <Lock size={36} />

          </div>

          <h1 className="text-3xl font-bold">

            Reset Password

          </h1>

          <p className="mt-2 text-gray-500">

            Choose a new secure password.

          </p>

        </div>

        {success ? (

          <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">

            <CheckCircle2
              size={54}
              className="mx-auto mb-4 text-green-600"
            />

            <h2 className="mb-2 text-xl font-bold text-green-700">

              Password Updated

            </h2>

            <p className="text-sm text-gray-600">

              Redirecting to login...

            </p>

          </div>

        ) : (

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div>

              <label className="mb-2 block font-medium">

                New Password

              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className="w-full rounded-xl border py-3 pl-12 pr-12 outline-none focus:border-black"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            <div>

              <label className="mb-2 block font-medium">

                Confirm Password

              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border py-3 pl-12 pr-12 outline-none focus:border-black"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            {error && (

              <div className="rounded-xl bg-red-100 p-3 text-sm text-red-700">

                {error}

              </div>

            )}

            <button
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3 font-semibold text-white"
            >

              {loading ? (
                <>
                  <Loader2 className="animate-spin" />

                  Updating...
                </>
              ) : (
                "Reset Password"
              )}

            </button>

          </form>

        )}

      </motion.div>

    </div>
  );
}