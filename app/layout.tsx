import type { Metadata, Viewport } from "next";
import "./globals.css";
import { MenuProvider } from "@/lib/store/MenuContext";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "La Trattoria — Carta Digital",
  description: "Descubrí nuestra carta de cocina italiana artesanal. Pastas, carnes, pizzas y más.",
  keywords: ["restaurante", "carta digital", "menú online", "La Trattoria", "cocina italiana"],
  openGraph: {
    title: "La Trattoria — Carta Digital",
    description: "Cocina italiana con alma porteña. Escaneá el QR y explorá nuestra carta.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#ff6b35",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased">
        <MenuProvider>
          {children}
          <Toaster />
        </MenuProvider>
      </body>
    </html>
  );
}
