import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CheckoutProductArray } from "./context/contextprovider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default:"e-commerce-website",
    template:"e-commerce-website" 
  },
  description: "Hi my name is darshan and this my e-commerce-website",
  keywords:["cloths","e-commerse","website"]. //visible in vie page source
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CheckoutProductArray>
          <Toaster />
          {children}           {/* file:///Users/sanjaykardile/Downloads/React_Context_Explanation.pdf */}
        </CheckoutProductArray>
      </body>
    </html>
  );
}
