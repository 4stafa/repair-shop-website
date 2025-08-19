import { useState } from "react";
import api from "./lib/api";
import { saveAuth } from "./store/auth";

export default function Login() {
  const [email, setEmail] = useState("edris@example.com");
  const [password, setPassword] = useState("mypassword123");
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    try {
      const { data } = await api.post("/api/auth/login", { email, password });
      saveAuth(data.token, data.user);
      window.location.href = "/orders";
    } catch (e: any) {
      setErr(e?.response?.data?.message || "Login failed");
    }
  }

  return (
    <form onSubmit={onSubmit}>
      {err && <p className="text-red-600">{err}</p>}
      <input value={email} onChange={e=>setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button>Sign in</button>
    </form>
  );
}
