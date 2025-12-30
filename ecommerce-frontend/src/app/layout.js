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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <ReduxProvider>
          <VerifyUser>
            <Header />
            {children}
            <Footer />
          </VerifyUser>
        </ReduxProvider>
      </body>
    </html>
  );
}

