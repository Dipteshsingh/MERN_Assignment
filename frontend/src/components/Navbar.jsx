import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { name: "Dashboard", path: "/dashboard", icon: "ti-layout-dashboard" },
  { name: "Agents", path: "/agents", icon: "ti-robot" },
  { name: "Upload", path: "/upload", icon: "ti-upload" },
];

const Navbar = ({ user }) => {
  const location = useLocation();
  const { logout } = useAuth();
  const initials = user?.email
  ? user.email.split("@")[0].slice(0, 2).toUpperCase()
  : "U";

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-black flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-[15px] font-semibold text-gray-900 tracking-tight">AgentFlow</span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-2.5">
          {navLinks.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors duration-150 ${active
                  ? "bg-black text-white"           // 
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                  }`}
              >
                <i className={`ti ${link.icon} text-[14px]`} aria-hidden="true" />
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2.5">

          <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-[12px] font-medium text-gray-700 select-none">
            {initials}
          </div>

          <button
            onClick={logout}
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-red-200 text-[13px] font-medium text-red-500 bg-red-50 hover:text-red-600 hover:border-red-400 hover:bg-red-100 active:scale-95 transition-all duration-200"
          >
            <i className="ti ti-logout text-[14px] group-hover:translate-x-0.5 transition-transform duration-200" aria-hidden="true" />
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
