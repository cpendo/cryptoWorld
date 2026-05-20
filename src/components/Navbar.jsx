import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const NAV_ITEMS = [
  { to: "/", label: "Home", end: true },
  { to: "/currencies", label: "Currencies" },
  { to: "/exchanges", label: "Exchanges" },
  { to: "/news", label: "News" },
];

const linkClass = ({ isActive }) =>
  `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
    isActive
      ? "bg-green-100 text-green-700"
      : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
  }`;

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => e.key === "Escape" && setMobileOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl">
        <nav className="flex items-center justify-between px-3 sm:px-4 py-2.5 rounded-full bg-white/85 backdrop-blur-md border border-zinc-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2.5 px-2 group">
            <img
              src="/nodes.png"
              alt=""
              className="w-8 h-8 object-contain invert group-hover:scale-105 transition-transform"
            />
            <span className="font-heading text-xl sm:text-2xl text-zinc-900 leading-none tracking-wide">
              CryptoWorld
            </span>
          </NavLink>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end} className={linkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 text-zinc-900 rounded-full hover:bg-zinc-100"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <HiMenu className="text-2xl" />
          </button>
        </nav>
      </header>

      {/* Mobile overlay menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="absolute inset-0 bg-white/95 backdrop-blur-md" />
          <div className="relative h-full flex flex-col">
            <div className="flex justify-end p-6">
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-zinc-900 rounded-full hover:bg-zinc-100"
                aria-label="Close menu"
              >
                <HiX className="text-3xl" />
              </button>
            </div>
            <ul className="flex flex-col items-center justify-center flex-1 gap-8 -mt-16">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `font-heading text-3xl tracking-wide ${
                        isActive ? "text-green-700" : "text-zinc-900"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
