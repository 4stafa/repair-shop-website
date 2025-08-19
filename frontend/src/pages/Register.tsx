import { useState } from "react";
import api from "../lib/api";

export default function Register() {
  const [username, setUsername] = useState("edris");
  const [email, setEmail] = useState("edris@example.com");
  const [password, setPassword] = useState("mypassword123");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    try {
      await api.post("/api/auth/register", { username, email, password });
      setMsg("Registered! Go to login.");
    } catch (e: any) {
      setMsg(e?.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white p-6 rounded-2xl shadow">
        <h1 className="text-xl font-semibold mb-4">Register</h1>
        {msg && <div className="text-sm mb-3">{msg}</div>}
        <input className="input mb-3" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
        <input className="input mb-3" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input mb-4" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn w-full">Sign up</button>
      </form>
    </div>
  );
}
