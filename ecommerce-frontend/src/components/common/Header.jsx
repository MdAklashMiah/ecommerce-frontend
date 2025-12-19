"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, User, Heart, ShoppingCart, X } from "lucide-react";
import SearchBar from "./SearchBar";
import Container from "./Container";
import LoginModal from "./auth/LoginModal";
import SignupModal from "./auth/SignupModal";
import { useSelector } from "react-redux";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("HOME");

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const user = useSelector((state) => state?.userInfo?.value);

  // ESC key closes modal & mobile menu
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsLoginOpen(false);
        setIsSignupOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const navLinks = ["HOME", "SHOP", "COLLECTION", "CONTACT", "ABOUT US"];
  const getPath = (link) => (link === "HOME" ? "/" : `/${link.toLowerCase()}`);

  return (
    <>
      <header className="w-full bg-secondary fixed top-0 left-0 z-[999] shadow-md">
        <Container>
          <div className="w-full px-4 sm:px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <img
                src="/images/logo.png"
                alt="logo"
                className="h-8 sm:h-9 object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-10 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link}
                  href={getPath(link)}
                  onClick={() => setActive(link)}
                  className={`relative transition ${
                    active === link
                      ? "text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link}
                </Link>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center space-x-4 sm:space-x-6 text-gray-200">
              {/* User */}
              {user ? (
                <div className="hidden sm:flex items-center gap-2 border border-gray-500 rounded-full px-3 py-1">
                  <User className="w-4 h-4" />
                  <span className="text-sm truncate max-w-[100px]">
                    {user.name}
                  </span>
                </div>
              ) : (
                <button
                  aria-label="Login"
                  onClick={() => setIsLoginOpen(true)}
                  className="hover:text-white transition"
                >
                  <User className="w-5 h-5" />
                </button>
              )}

              {/* Wishlist */}
              <Heart className="w-5 h-5 hover:text-white transition cursor-pointer" />

              {/* Cart */}
              <div className="relative cursor-pointer">
                <Link href={"/cart"}>
                <ShoppingCart className="w-5 h-5 hover:text-white transition" />
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-semibold w-4 h-4 flex items-center justify-center rounded-full">
                  3
                </span>
                </Link>
              </div>

              {/* Mobile Menu */}
              <button
                aria-label="Open menu"
                className="md:hidden"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </Container>

        {/* Search Bar */}
        <Container>
          <div className="px-4 sm:px-6 pb-3">
            <SearchBar />
          </div>
        </Container>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[1000] bg-black/40 backdrop-blur-sm md:hidden">
          <div className="absolute top-0 left-0 w-72 h-full bg-secondary shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <img src="/images/logo.png" alt="logo" className="h-8" />
              <X
                className="cursor-pointer"
                onClick={() => setMobileOpen(false)}
              />
            </div>

            <nav className="flex flex-col gap-4 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link}
                  href={getPath(link)}
                  onClick={() => {
                    setActive(link);
                    setMobileOpen(false);
                  }}
                  className={`${
                    active === link
                      ? "text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link}
                </Link>
              ))}
            </nav>

            {!user && (
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setIsLoginOpen(true);
                }}
                className="mt-8 w-full bg-white text-secondary py-2 rounded-lg font-medium"
              >
                Login / Register
              </button>
            )}
          </div>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        openSignup={() => {
          setIsLoginOpen(false);
          setIsSignupOpen(true);
        }}
      />

      {/* Signup Modal */}
      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        openLogin={() => {
          setIsSignupOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </>
  );
};

export default Header;
