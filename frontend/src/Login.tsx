import { useState } from "react";
import { Link } from "react-router-dom";
import api from "./lib/api";
import { saveAuth } from "./store/auth";
import Header from "./components/_Header";

export default function Login() {
  const [email, setEmail] = useState("edris@example.com");
  const [password, setPassword] = useState("mypassword123");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const { data } = await api.post("/api/auth/login", { email, password });
      saveAuth(data.token, data.user);
      window.location.href = "/orders";
    } catch (e: any) {
      setErr(e?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-12 md:grid-cols-2">
        {/* Left blurb */}
        <div className="max-w-lg">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome back to <span className="text-blue-600">SwiftFix</span>
          </h1>
          <p className="mt-3 text-gray-600">
            Manage repair orders, track status, and keep customers happy—all in one place.
          </p>
          <ul className="mt-6 space-y-2 text-gray-700">
            <li>• Create & update repair orders</li>
            <li>• Track workflow statuses</li>
            <li>• Simple, fast, and secure</li>
          </ul>
        </div>

        {/* Form card */}
        <form
          onSubmit={onSubmit}
          className="mx-auto w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div className="mb-5">
            <h2 className="text-xl font-semibold">Sign in</h2>
            <p className="mt-1 text-sm text-gray-600">
              Enter your credentials to access your dashboard.
            </p>
          </div>

          {err && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {err}
            </div>
          )}

          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
          />

          <label className="mt-4 block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />

          <button
            className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link className="font-medium text-blue-600 hover:underline" to="/register">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
