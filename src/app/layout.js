import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Energy Monitor — Dashboard de Monitoreo Energético",
  description:
    "Dashboard en tiempo real para monitoreo energético industrial. Detecta anomalías, reduce costos y optimiza el consumo eléctrico por área.",
  keywords: "monitoreo energético, dashboard, IoT, consumo eléctrico, ahorro energía",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-slate-950 text-white`}>
        {children}
      </body>
    </html>
  );
}
