"use client";

import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

const SignupModal = ({ isOpen, onClose, openLogin }) => {
  const modalRef = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleSignup = async (e) => {
    e.preventDefault();

    // basic validation
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await axios.post(
        `${process.env.NEXT_PUBLIC_API}/auth/signup`,
        { name, email, password }
      );

      onClose();
      openLogin();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Registration failed. Please try again."
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
          rounded-t-2xl sm:rounded-xl
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
          aria-label="Close signup modal"
        >
          <X />
        </button>

        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-5 sm:mb-6">
          Create Account
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            className="
              border px-4 py-3 rounded-lg
              text-sm sm:text-base
              focus:outline-none focus:ring-2 focus:ring-secondary
            "
            value={name}
            autoFocus
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email address"
            className="
              border px-4 py-3 rounded-lg
              text-sm sm:text-base
              focus:outline-none focus:ring-2 focus:ring-secondary
            "
            value={email}
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
            {loading ? "Creating account..." : "Register"}
          </button>

          <p className="text-center text-xs sm:text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              className="underline font-medium hover:text-black"
              onClick={openLogin}
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
