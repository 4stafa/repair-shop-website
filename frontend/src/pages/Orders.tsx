import { useEffect, useState } from "react";
import api from "../lib/api";
import Layout from "../components/_Layout";
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

const statusColors: Record<Order["status"], string> = {
  new: "bg-blue-100 text-blue-700",
  in_progress: "bg-amber-100 text-amber-700",
  ready: "bg-emerald-100 text-emerald-700",
  delivered: "bg-slate-200 text-slate-700",
  canceled: "bg-rose-100 text-rose-700",
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "", customerName: "", device: "", issue: "", price: "" as number | string, notes: ""
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
      await api.post("/api/orders", { ...form, price: Number(form.price || 0) });
      setForm({ title:"", customerName:"", device:"", issue:"", price:"", notes:"" });
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
    <Layout>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="page-title">Repair Orders</h1>
        <button onClick={logout} className="btn-secondary">Logout</button>
      </div>

      {/* Create Order */}
      <div className="card mb-8">
        <h2 className="card-title">Create a new order</h2>
        {err && <div className="alert-error">{err}</div>}
        <form onSubmit={createOrder} className="grid grid-cols-1 md:grid-cols-6 gap-3">
          <input className="input md:col-span-2" placeholder="Title"
            value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
          <input className="input md:col-span-2" placeholder="Customer name"
            value={form.customerName} onChange={e=>setForm({...form, customerName:e.target.value})} />
          <input className="input md:col-span-2" placeholder="Device"
            value={form.device} onChange={e=>setForm({...form, device:e.target.value})} />
          <input className="input md:col-span-4" placeholder="Issue"
            value={form.issue} onChange={e=>setForm({...form, issue:e.target.value})} />
          <input className="input" placeholder="Price" type="number"
            value={form.price} onChange={e=>setForm({...form, price:e.target.value})} />
          <input className="input md:col-span-5" placeholder="Notes (optional)"
            value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} />
          <div className="md:col-span-6">
            <button className="btn">Create order</button>
          </div>
        </form>
      </div>

      {/* Orders list */}
      {loading ? (
        <div className="card">Loading…</div>
      ) : orders.length === 0 ? (
        <div className="card">No orders yet.</div>
      ) : (
        <div className="overflow-x-auto card p-0">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="th">Title</th>
                <th className="th">Customer</th>
                <th className="th">Device</th>
                <th className="th">Issue</th>
                <th className="th">Status</th>
                <th className="th text-right">Price</th>
                <th className="th"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o._id} className="border-t">
                  <td className="td font-medium">{o.title}</td>
                  <td className="td">{o.customerName}</td>
                  <td className="td">{o.device}</td>
                  <td className="td">{o.issue}</td>
                  <td className="td">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[o.status]}`}>
                      {o.status.replace("_"," ")}
                    </span>
                  </td>
                  <td className="td text-right">${o.price}</td>
                  <td className="td">
                    <div className="flex gap-2 justify-end">
                      <button className="btn" onClick={() => toInProgress(o._id)}>
                        Mark In Progress
                      </button>
                      <button className="btn-danger" onClick={() => remove(o._id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}
