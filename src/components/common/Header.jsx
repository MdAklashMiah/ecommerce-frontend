"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, Search, User, Heart, ShoppingCart, X } from "lucide-react";
import Container from "./Container";
import SearchBar from "./SearchBar";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("HOME");

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const loginRef = useRef();

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        setIsLoginOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ESC key closes modal
  useEffect(() => {
    function handleEsc(event) {
      if (event.key === "Escape") setIsLoginOpen(false);
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const navLinks = [
    "HOME",
    "SHOP",
    "COLLECTION",
    "JOURNAL",
    "LOOKBOOK",
    "PAGES",
  ];

  const getPath = (link) => (link === "HOME" ? "/" : `/${link.toLowerCase()}`);

  return (
    <header className="w-full shadow-sm bg-secondary fixed top-0 left-0 z-999 pb-5">
      <Container>
        <div className="w-full mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 cursor-pointer">
            <img src="/images/logo.png" alt="logo" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-10 text-sm font-medium text-gray-800">
            {navLinks.map((link) => (
              <Link
                key={link}
                href={getPath(link)}
                onClick={() => setActive(link)}
                className={`relative tracking-wide transition-all ${
                  active === link
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link}
                {active === link && (
                  <span className="absolute left-0 -bottom-1 w-full h-[1.5px] bg-white rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-6 text-gray-200">
            {/* User Button */}
            <button onClick={() => setIsLoginOpen(true)}>
              <User className="w-5 h-5 cursor-pointer hover:text-white" />
            </button>
            <Heart className="w-5 h-5 cursor-pointer hover:text-white" />
            <div className="relative cursor-pointer">
              <ShoppingCart className="w-5 h-5 hover:text-white" />
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-semibold w-4 h-4 flex items-center justify-center rounded-full">
                3
              </span>
            </div>
            {/* Mobile Menu */}
            <div className="md:hidden">
              <Menu
                className="w-6 h-6 cursor-pointer"
                onClick={() => setMobileOpen(true)}
              />
            </div>
          </div>
        </div>
      </Container>
      {/* ----------- LOGIN MODAL (CENTERED) ----------- */}
      {isLoginOpen && (
        <div className="fixed inset-0 shadow-2xl backdrop-blur-xs flex items-center justify-center z-[999]">
          <div
            ref={loginRef}
            className="bg-white w-full max-w-md px-6 py-8 rounded-xl shadow-xl animate-fadeIn relative"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsLoginOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-semibold text-center mb-6">
              Welcome Back
            </h2>
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email address"
                className="border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/70"
              />
              <input
                type="password"
                placeholder="Password"
                className="border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/70"
              />
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4" />
                  <span className="text-gray-700">Remember me</span>
                </label>
                <a href="#" className="text-gray-500 hover:underline">
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                className="bg-black text-white py-3 rounded-lg hover:bg-gray-900 mt-2"
              >
                Login
              </button>
              <p className="text-center text-sm text-gray-600">
                No account yet?{" "}
                <a href="#" className="underline hover:text-black">
                  Create Account
                </a>
              </p>
            </form>
          </div>
        </div>
      )}
      {/* ----------- MOBILE DRAWER ----------- */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-[998] transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <span className="text-xl font-semibold">MENU</span>
          <X className="cursor-pointer" onClick={() => setMobileOpen(false)} />
        </div>
        <div className="flex flex-col px-6 mt-4 space-y-6 text-gray-800">
          {navLinks.map((link) => (
            <Link
              key={link}
              href={getPath(link)}
              onClick={() => {
                setActive(link);
                setMobileOpen(false);
              }}
              className={`text-lg transition ${
                active === link
                  ? "text-black font-semibold"
                  : "hover:text-black"
              }`}
            >
              {link}
            </Link>
          ))}
        </div>
      </div>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-[997]"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}
      <Container>
        <SearchBar />
      </Container>
    </header>
  );
};

export default Header;
