// src/pages/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import type { ReactElement } from "react";

import Login from "../Login";
import Register from "./Register";
import Orders from "./Orders";

function Protected({ children }: { children: ReactElement }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/orders" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/orders" element={<Protected><Orders /></Protected>} />
      <Route path="*" element={<div className="p-6">Not found</div>} />
    </Routes>
  );
}
