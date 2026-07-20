"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Mail,
  ShieldAlert,
} from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    setError("");

    setSuccess(false);

    try {
      const { data } = await axios.post(
        "/api/auth/forgot-password",
        {
          email,
        }
      );

      setSuccess(true);

      setMessage(data.message);
    } catch (err: any) {
      setError(
        err.response?.data?.message ??
          "Unable to send reset link."
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
          y: 30,
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

          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-700">

            <ShieldAlert size={38} />

          </div>

          <h1 className="text-3xl font-bold">
            Forgot Password
          </h1>

          <p className="mt-2 text-gray-500">
            Enter your admin email and we'll send you a password reset link.
          </p>

        </div>

        {success ? (
          <div className="rounded-2xl border border-green-200 bg-green-50 p-6">

            <div className="mb-4 flex justify-center">

              <CheckCircle2
                size={48}
                className="text-green-600"
              />

            </div>

            <h2 className="mb-2 text-center text-xl font-bold text-green-700">
              Email Sent
            </h2>

            <p className="text-center text-sm text-gray-600">
              {message}
            </p>

            <Link
              href="/admin/login"
              className="mt-6 block rounded-xl bg-black py-3 text-center font-semibold text-white"
            >
              Return to Login
            </Link>

          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div>

              <label className="mb-2 block font-medium">
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="admin@kariflow.com"
                  className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none focus:border-black"
                />

              </div>

            </div>

            {error && (
              <div className="rounded-xl bg-red-100 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3 font-semibold text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />

                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>

          </form>
        )}

      </motion.div>

    </div>
  );
}