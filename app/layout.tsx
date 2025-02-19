import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./store-provider"
import Script from 'next/script'
import 'bootstrap/dist/css/bootstrap.css'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>{children}</Providers>
      </body>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ENjdO4Dr2bkBIFxQpeo6LpIRjcryw5anPN/JB34AW2FNvX23+p0hBT0/9JvM6Q"
        crossOrigin="anonymous"
      />
    </html>
  );
}
