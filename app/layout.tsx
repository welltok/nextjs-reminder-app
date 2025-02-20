"use client"; // 1) Enable client-side usage (hooks, etc.)

import { Open_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./store-provider";
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.css";
import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { RootState, persistor } from "@/store/store";

const geistSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable}`}>
        <Providers>
        <PersistGate loading={null} persistor={persistor}>
        <LayoutWithCheck>{children}</LayoutWithCheck>
        </PersistGate>
        </Providers>
      </body>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        crossOrigin="anonymous"
      />
    </html>
  );
}


function LayoutWithCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!token && pathname !== "/login") {
      router.replace("/login");
    }
  }, [token, pathname, router]);

  return <>{children}</>;
}