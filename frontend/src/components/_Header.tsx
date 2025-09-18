import { Link, NavLink, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();
  const isOrders = pathname.startsWith("/orders");

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded bg-red-600 px-2 py-1 text-white font-bold">RS</div>
            <div className="leading-tight">
              <div className="font-semibold">Repair Shop</div>
              <div className="text-xs text-slate-500 -mt-0.5">Phone Repair</div>
            </div>
          </Link>

          {/* Nav */}
<nav className="hidden md:flex items-center gap-6 text-sm">
  <NavLink
    to="/"
    className={({ isActive }) =>
      `hover:text-slate-900 ${isActive ? "text-slate-900" : "text-slate-600"}`
    }
  >
    Home
  </NavLink>

  <NavLink
    to="/orders"
    className={({ isActive }) =>
      `hover:text-slate-900 ${isActive ? "text-slate-900" : "text-slate-600"}`
    }
  >
    Orders
  </NavLink>

  {/* New pages */}
  <NavLink
    to="/about"
    className={({ isActive }) =>
      `hover:text-slate-900 ${isActive ? "text-slate-900" : "text-slate-600"}`
    }
  >
    About
  </NavLink>

  <NavLink
    to="/services"
    className={({ isActive }) =>
      `hover:text-slate-900 ${isActive ? "text-slate-900" : "text-slate-600"}`
    }
  >
    Services
  </NavLink>

  <NavLink
    to="/contact"
    className={({ isActive }) =>
      `hover:text-slate-900 ${isActive ? "text-slate-900" : "text-slate-600"}`
    }
  >
    Contact Us
  </NavLink>

  {/* Call button stays at the end */}
  <a
    href="tel:9999999999"
    className="inline-flex items-center rounded-full bg-red-600 px-4 py-2 text-white font-medium hover:bg-red-700 transition"
  >
    Call Us Now!
  </a>
</nav>
          {/* Secondary (when on Orders we might show quick link) */}
          {isOrders ? (
            <Link to="/login" className="md:hidden inline-flex items-center rounded-full bg-slate-900 px-3 py-1.5 text-white text-sm">Login</Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}
