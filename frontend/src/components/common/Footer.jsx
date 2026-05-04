import Container from "./Container";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, CreditCard, Shield, Truck, HeadphonesIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#111] text-gray-300 pt-16">
      <Container>
        {/* Top Icons Row */}
        <div className="border-b border-gray-800 pb-12 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-4">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold tracking-wider text-white text-sm mb-1 uppercase">
                  Fast & Free Delivery
                </h4>
                <p className="text-sm text-gray-400">
                  Free delivery for all orders over $140
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white">
                <HeadphonesIcon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold tracking-wider text-white text-sm mb-1 uppercase">
                  24/7 Customer Support
                </h4>
                <p className="text-sm text-gray-400">
                  Friendly 24/7 customer support
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-white">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold tracking-wider text-white text-sm mb-1 uppercase">
                  Money Back Guarantee
                </h4>
                <p className="text-sm text-gray-400">
                  We return money within 30 days
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo + Contact */}
          <div className="space-y-6">
            <img 
              src="/images/logo.png" 
              alt="Logo" 
              className="h-8 object-contain filter invert opacity-90" 
              style={{ filter: "brightness(0) invert(1)" }} 
            />
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
              1418 River Drive, Suite 35 Cottonhall, CA 9622 <br />
              United States
            </p>
            <div className="space-y-1">
              <p className="text-sm text-gray-300 hover:text-white transition cursor-pointer">sale@uomo.com</p>
              <p className="text-sm text-gray-300">+1 246-345-0695</p>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-5 pt-2">
              <a href="#" className="text-gray-400 hover:text-white transition"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 tracking-wide text-sm uppercase">Company</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-white transition">Careers</Link></li>
              <li><Link href="/affiliates" className="hover:text-white transition">Affiliates</Link></li>
              <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 tracking-wide text-sm uppercase">Shop</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/shop" className="hover:text-white transition">New Arrivals</Link></li>
              <li><Link href="/shop" className="hover:text-white transition">Accessories</Link></li>
              <li><Link href="/shop" className="hover:text-white transition">Men</Link></li>
              <li><Link href="/shop" className="hover:text-white transition">Women</Link></li>
              <li><Link href="/shop" className="hover:text-white transition">Shop All</Link></li>
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <h4 className="text-white font-semibold mb-6 tracking-wide text-sm uppercase">Subscribe</h4>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Be the first to get the latest news about trends, promotions, and much more!
            </p>

            <form className="flex border border-gray-700 rounded-md overflow-hidden focus-within:border-gray-400 transition">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 text-sm bg-transparent text-white placeholder-gray-500 outline-none"
                required
              />
              <button className="px-6 bg-white text-black text-sm font-semibold hover:bg-gray-200 transition">
                JOIN
              </button>
            </form>

            <div className="mt-8">
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-semibold">Secure payments</p>
              <div className="flex space-x-3 opacity-70">
                <img src="/images/payment/discover.png" alt="Discover" className="h-6 object-contain" />
                <img src="/images/payment/mastercard.png" alt="Mastercard" className="h-6 object-contain" />
                <img src="/images/payment/PayPal.png" alt="PayPal" className="h-6 object-contain" />
                <img src="/images/payment/Stripe.png" alt="Stripe" className="h-6 object-contain" />
                <img src="/images/payment/visa.png" alt="Visa" className="h-6 object-contain" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Uomo. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <span className="cursor-pointer hover:text-white transition">Privacy Policy</span>
            <span className="cursor-pointer hover:text-white transition">Terms of Service</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
