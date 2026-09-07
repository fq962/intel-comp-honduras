import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartDrawer } from "@/app/components/cart/cart-drawer";
import { CartProvider } from "@/app/components/cart/cart-context";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Intelcomp Honduras",
  description:
    "Tecnología, mobiliario y sistemas de seguridad de alta calidad para equipar tu empresa, con soporte experto en toda Honduras.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
