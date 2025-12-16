"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, User, Heart, ShoppingCart, X } from "lucide-react";
import Container from "./Container";
import SearchBar from "./SearchBar";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("HOME");

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const loginRef = useRef();
  const signupRef = useRef();

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (isLoginOpen && loginRef.current && !loginRef.current.contains(event.target)) {
        setIsLoginOpen(false);
      }
      if (isSignupOpen && signupRef.current && !signupRef.current.contains(event.target)) {
        setIsSignupOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isLoginOpen, isSignupOpen]);

  // ESC key closes modal
  useEffect(() => {
    function handleEsc(event) {
      if (event.key === "Escape") {
        setIsLoginOpen(false);
        setIsSignupOpen(false);
      }
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const navLinks = ["HOME", "SHOP", "COLLECTION", "CONTACT", "ABOUT US"];

  const getPath = (link) => (link === "HOME" ? "/" : `/${link.toLowerCase()}`);

  return (
    <header className="w-full shadow-sm bg-secondary fixed top-0 left-0 z-999 pb-5">
      <Container>
        <div className="w-full mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <img src="/images/logo.png" alt="logo" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-10 text-sm font-medium text-gray-800">
            {navLinks.map((link) => (
              <Link
                key={link}
                href={getPath(link)}
                onClick={() => setActive(link)}
                className={`relative ${
                  active === link ? "text-white" : "text-gray-300 hover:text-white"
                }`}
              >
                {link}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-6 text-gray-200">
            <button onClick={() => setIsLoginOpen(true)}>
              <User className="w-5 h-5 hover:text-white" />
            </button>

            <Heart className="w-5 h-5 hover:text-white" />

            <div className="relative cursor-pointer">
              <ShoppingCart className="w-5 h-5 hover:text-white" />
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-semibold w-4 h-4 flex items-center justify-center rounded-full">
                3
              </span>
            </div>

            <div className="md:hidden">
              <Menu className="w-6 h-6 cursor-pointer" onClick={() => setMobileOpen(true)} />
            </div>
          </div>
        </div>
      </Container>

      {/* LOGIN MODAL */}
      {isLoginOpen && (
        <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-[999]">
          <div
            ref={loginRef}
            className="bg-white w-full max-w-md px-6 py-8 rounded-xl shadow-xl relative"
          >
            <button className="absolute top-3 right-3" onClick={() => setIsLoginOpen(false)}>
              <X />
            </button>

            <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

            <form className="flex flex-col gap-4">
              <input type="email" placeholder="Email address" className="border px-4 py-3 rounded-lg" />
              <input type="password" placeholder="Password" className="border px-4 py-3 rounded-lg" />

              <button type="submit" className="bg-secondary text-white py-3 rounded-lg mt-2">
                Login
              </button>

              <p className="text-center text-sm text-gray-600">
                No account yet?{" "}
                <button
                  type="button"
                  className="underline"
                  onClick={() => {
                    setIsLoginOpen(false);
                    setIsSignupOpen(true); // 👉 Open Signup instead
                  }}
                >
                  Create Account
                </button>
              </p>
            </form>
          </div>
        </div>
      )}

      {/* SIGNUP MODAL */}
      {isSignupOpen && (
        <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-[999]">
          <div
            ref={signupRef}
            className="bg-white w-full max-w-md px-6 py-8 rounded-xl shadow-xl relative"
          >
            <button className="absolute top-3 right-3" onClick={() => setIsSignupOpen(false)}>
              <X />
            </button>

            <h2 className="text-2xl font-semibold text-center mb-6">Create Account</h2>

            <form className="flex flex-col gap-4">
              <input type="text" placeholder="Full Name" className="border px-4 py-3 rounded-lg" />
              <input type="email" placeholder="Email address" className="border px-4 py-3 rounded-lg" />
              <input type="password" placeholder="Password" className="border px-4 py-3 rounded-lg" />

              <button type="submit" className="bg-secondary text-white py-3 rounded-lg mt-2">
                Register
              </button>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  className="underline"
                  onClick={() => {
                    setIsSignupOpen(false);
                    setIsLoginOpen(true); // back to login
                  }}
                >
                  Login
                </button>
              </p>
            </form>
          </div>
        </div>
      )}

      <Container>
        <SearchBar />
      </Container>
    </header>
  );
};

export default Header;
