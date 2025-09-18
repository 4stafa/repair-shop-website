// src/pages/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import type { ReactElement } from "react";

import Login from "../Login";
import Register from "./Register";
import Orders from "./Orders";
import Home from "./Home"; // <-- add this
import About from "./About";
import Services from "./Services";
import Contact from "./Contact";

function Protected({ children }: { children: ReactElement }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />              {/* <- used to redirect */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/orders" element={<Protected><Orders /></Protected>} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<div className="p-6">Not found</div>} />
    </Routes>
  );
}
