"use client";

import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userInfo } from "@/slices/userSlice";
import { useRouter } from "next/navigation";

const LoginModal = ({ isOpen, onClose, openSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();

  // outside click
  useEffect(() => {
    const handler = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/auth/login`,
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      dispatch(userInfo(res.data.data));
      onClose();
      router.push("/");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] flex items-end sm:items-center justify-center">
      <div
        ref={modalRef}
        className="
          bg-white w-full
          sm:max-w-md
          h-auto
          sm:rounded-xl
          rounded-t-2xl
          px-5 sm:px-6
          py-6 sm:py-8
          shadow-xl
          relative
          animate-slideUp sm:animate-fadeIn
        "
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          aria-label="Close login modal"
        >
          <X />
        </button>

        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-5 sm:mb-6">
          Welcome Back
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            className="
              border px-4 py-3 rounded-lg
              text-sm sm:text-base
              focus:outline-none focus:ring-2 focus:ring-secondary
            "
            value={email}
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="
              border px-4 py-3 rounded-lg
              text-sm sm:text-base
              focus:outline-none focus:ring-2 focus:ring-secondary
            "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-500 text-xs sm:text-sm text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="
              bg-secondary text-white py-3 rounded-lg
              text-sm sm:text-base font-medium
              disabled:opacity-60 disabled:cursor-not-allowed
              transition
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-xs sm:text-sm text-gray-600">
            No account yet?{" "}
            <button
              type="button"
              className="underline font-medium hover:text-black"
              onClick={openSignup}
            >
              Create Account
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
