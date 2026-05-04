"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, User, Heart, ShoppingCart, X, Shield } from "lucide-react";
import SearchBar from "./SearchBar";
import Container from "./Container";
import LoginModal from "./auth/LoginModal";
import SignupModal from "./auth/SignupModal";
import { useSelector } from "react-redux";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("HOME");
  const [scrolled, setScrolled] = useState(false);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const user = useSelector((state) => state?.userInfo?.value);

  // Handle Scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
  const getPath = (link) => (link === "HOME" ? "/" : `/${link.toLowerCase().replace(" ", "-")}`);

  return (
    <>
      <header
        className={`w-full fixed top-0 left-0 z-[999] transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-1" : "bg-white py-3 border-b border-gray-100"
          }`}
      >
        <Container>
          <div className="w-full px-4 sm:px-6 py-3 flex items-center justify-between">
            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 md:hidden">
              <button
                aria-label="Open menu"
                onClick={() => setMobileOpen(true)}
                className="text-gray-800 hover:text-black transition"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Logo */}
            <Link href="/" className="shrink-0 flex items-center group">
              <img
                src="/images/logo.png"
                alt="FlexFitFashion Logo"
                className="h-14 sm:h-16 md:h-20 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-10 text-[13px] font-semibold tracking-wide uppercase">
              {navLinks.map((link) => (
                <Link
                  key={link}
                  href={getPath(link)}
                  onClick={() => setActive(link)}
                  className={`relative transition overflow-hidden group ${active === link ? "text-black" : "text-gray-500 hover:text-black"
                    }`}
                >
                  {link}
                  <span className={`absolute left-0 bottom-0 w-full h-[2px] bg-black transform transition-transform duration-300 ${active === link ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </Link>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="hidden md:flex items-center space-x-6 text-gray-700">
              {/* User */}
              {user ? (
                <div className="flex items-center gap-2">
                  <Link href="/dashboard" className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100 transition cursor-pointer">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium truncate max-w-[100px]">
                      {user.name}
                    </span>
                  </Link>
                  {user.role === "admin" && (
                    <Link href="/admin" className="text-[10px] font-black bg-black text-white px-2 py-0.5 rounded-full tracking-widest hover:bg-gray-800 transition">
                      ADMIN
                    </Link>
                  )}
                </div>
              ) : (
                <button
                  aria-label="Login"
                  onClick={() => setIsLoginOpen(true)}
                  className="hover:text-black transition"
                >
                  <User className="w-5 h-5" />
                </button>
              )}

              {/* Wishlist */}
              <button className="hover:text-black transition">
                <Heart className="w-5 h-5" />
              </button>

              {/* Cart */}
              <div className="relative cursor-pointer hover:text-black transition">
                <Link href={"/cart"}>
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    0
                  </span>
                </Link>
              </div>
            </div>

            {/* Mobile Cart/User Icons */}
            <div className="flex items-center space-x-4 md:hidden text-gray-800">
              {!user && (
                <button onClick={() => setIsLoginOpen(true)}>
                  <User className="w-5 h-5" />
                </button>
              )}
              <Link href={"/cart"} className="relative">
                <ShoppingCart className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </Container>

        {/* Search Bar - Included conditionally or styled differently */}
        <Container>
          <div className="px-4 sm:px-6 pb-2">
            <SearchBar />
          </div>
        </Container>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm md:hidden animate-fade-in">
          <div className="absolute top-0 left-0 w-80 h-full bg-white shadow-2xl p-6 flex flex-col transform transition-transform duration-300">
            <div className="flex items-center justify-between mb-8 pb-4 border-b">
              <img src="/images/logo.png" alt="logo" className="h-8 w-auto object-contain" />
              <button onClick={() => setMobileOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            <nav className="flex flex-col gap-6 text-[15px] font-semibold tracking-wide uppercase">
              {navLinks.map((link) => (
                <Link
                  key={link}
                  href={getPath(link)}
                  onClick={() => {
                    setActive(link);
                    setMobileOpen(false);
                  }}
                  className={`flex items-center justify-between ${active === link ? "text-black" : "text-gray-500 hover:text-black transition"
                    }`}
                >
                  {link}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-8 border-t">
              {!user ? (
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setIsLoginOpen(true);
                  }}
                  className="w-full bg-black text-white py-3.5 rounded-md font-semibold tracking-wide hover:bg-gray-900 transition"
                >
                  LOGIN / REGISTER
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="w-full flex items-center justify-center gap-2 bg-gray-100 text-black py-3.5 rounded-md font-semibold hover:bg-gray-200 transition"
                  >
                    <User className="w-5 h-5" />
                    MY ACCOUNT
                  </Link>
                  {user.role === "admin" && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileOpen(false)}
                      className="w-full flex items-center justify-center gap-2 bg-black text-white py-3.5 rounded-md font-semibold hover:bg-gray-900 transition"
                    >
                      <Shield className="w-5 h-5" />
                      ADMIN PANEL
                    </Link>
                  )}
                </div>
              )}
            </div>
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
