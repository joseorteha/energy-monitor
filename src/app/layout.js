import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Energy Monitor — Monitoreo Energético Inteligente",
  description:
    "Plataforma de monitoreo energético en tiempo real. Detecta anomalías, reduce costos y optimiza el consumo eléctrico de tu empresa.",
  keywords: "monitoreo energético, dashboard, IoT, consumo eléctrico, ahorro energía, SaaS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
