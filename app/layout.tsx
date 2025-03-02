import { Open_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/store/store-provider";
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.css";
import "./custom-bootstrap.scss"
import { WebVitals } from '@/components/web-vitals'

const geistSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable}`}>
        <Providers>
          {/* <WebVitals /> */}
          {children}
        </Providers>
      </body>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        crossOrigin="anonymous"
      />
    </html>
  );
}