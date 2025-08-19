import { useEffect, useState } from "react";
import api from "../lib/api";
import { logout } from "../store/auth";

type Order = {
  _id: string;
  title: string;
  customerName: string;
  device: string;
  issue: string;
  status: "new" | "in_progress" | "ready" | "delivered" | "canceled";
  price: number;
  notes?: string;
  createdAt: string;
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "", customerName: "", device: "", issue: "", price: 0, notes: ""
  });
  const [err, setErr] = useState("");

  async function load() {
    setLoading(true);
    const { data } = await api.get<Order[]>("/api/orders");
    setOrders(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function createOrder(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    try {
      await api.post("/api/orders", { ...form, price: Number(form.price) });
      setForm({ title:"", customerName:"", device:"", issue:"", price:0, notes:"" });
      load();
    } catch (e: any) {
      setErr(e?.response?.data?.message || "Create failed");
    }
  }

  async function toInProgress(id: string) {
    await api.patch(`/api/orders/${id}`, { status: "in_progress" });
    load();
  }

  async function remove(id: string) {
    await api.delete(`/api/orders/${id}`);
    load();
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Repair Orders</h1>
        <button className="text-sm text-red-600" onClick={logout}>Logout</button>
      </header>

      <form onSubmit={createOrder} className="card grid grid-cols-1 md:grid-cols-3 gap-3">
        {err && <div className="md:col-span-3 text-red-600">{err}</div>}
        <input className="input" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
        <input className="input" placeholder="Customer name" value={form.customerName} onChange={e=>setForm({...form, customerName:e.target.value})} />
        <input className="input" placeholder="Device" value={form.device} onChange={e=>setForm({...form, device:e.target.value})} />
        <input className="input md:col-span-2" placeholder="Issue" value={form.issue} onChange={e=>setForm({...form, issue:e.target.value})} />
        <input className="input" placeholder="Price" type="number" value={form.price} onChange={e=>setForm({...form, price:e.target.valueAsNumber || 0})} />
        <input className="input md:col-span-3" placeholder="Notes (optional)" value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} />
        <button className="btn md:col-span-3 w-full">Create order</button>
      </form>

      <div className="grid gap-3">
        {loading ? <div>Loading…</div> : orders.length === 0 ? <div className="card">No orders yet.</div> :
          orders.map(o => (
            <div key={o._id} className="card flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <div className="font-medium">{o.title} • ${o.price}</div>
                <div className="text-sm text-gray-600">{o.customerName} · {o.device} · {o.status}</div>
                <div className="text-sm">{o.issue}</div>
              </div>
              <div className="flex gap-2">
                <button className="btn" onClick={() => toInProgress(o._id)}>Mark In Progress</button>
                <button className="btn bg-red-600 hover:bg-red-700" onClick={() => remove(o._id)}>Delete</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
