"use client";

import { useState } from "react";
import { User } from "lucide-react";

export default function AuthModal() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("login"); // login | signup

  return (
    <div className="relative">
      {/* USER ICON */}
      <button onClick={() => setOpen(!open)} className="p-2">
        <User className="w-6 h-6" />
      </button>

      {/* POPUP BOX */}
      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white shadow-2xl rounded-lg p-5 z-50">

          {/* ---------------- LOGIN VIEW ---------------- */}
          {view === "login" && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Login</h3>

              {/* Email */}
              <input
                type="email"
                placeholder="Email"
                className="w-full border px-3 py-2 mb-3 rounded"
              />

              {/* Password */}
              <input
                type="password"
                placeholder="Password"
                className="w-full border px-3 py-2 mb-4 rounded"
              />

              {/* Login Button */}
              <button className="w-full bg-black text-white py-2 rounded">
                Login
              </button>

              <p className="text-sm mt-4 text-center text-gray-600">
                Don't have an account?{" "}
                <button
                  className="text-blue-600 underline"
                  onClick={() => setView("signup")}
                >
                  Create Account
                </button>
              </p>
            </div>
          )}

          {/* ---------------- SIGNUP VIEW ---------------- */}
          {view === "signup" && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Create Account</h3>

              {/* Name */}
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border px-3 py-2 mb-3 rounded"
              />

              {/* Email */}
              <input
                type="email"
                placeholder="Email"
                className="w-full border px-3 py-2 mb-3 rounded"
              />

              {/* Password */}
              <input
                type="password"
                placeholder="Password"
                className="w-full border px-3 py-2 mb-4 rounded"
              />

              {/* Register Button */}
              <button className="w-full bg-black text-white py-2 rounded">
                Register
              </button>

              <p className="text-sm mt-4 text-center text-gray-600">
                Already have an account?{" "}
                <button
                  className="text-blue-600 underline"
                  onClick={() => setView("login")}
                >
                  Login Here
                </button>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
