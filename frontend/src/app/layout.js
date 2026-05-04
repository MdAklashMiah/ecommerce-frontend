// src/app/layout.js
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import ReduxProvider from "@/components/redux/ReduxProvider";
import VerifyUser from "@/components/verify/VerifyUser";

// Google Font (production-safe, Next.js 14 compatible)
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "E-Commerce App",
  description: "E-Commerce App Created by Next.js",
};

import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <ReduxProvider>
          <VerifyUser>
            <Toaster position="bottom-right" toastOptions={{ duration: 3000, style: { background: '#000', color: '#fff', borderRadius: '16px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' } }} />
            <Header />
            <main className="pt-[115px] min-h-screen">
              {children}
            </main>
            <Footer />
          </VerifyUser>
        </ReduxProvider>
      </body>
    </html>
  );
}

