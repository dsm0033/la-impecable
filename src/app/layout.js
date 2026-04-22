// ============================================
// 🏠 LAYOUT PRINCIPAL
// ============================================
// Este archivo envuelve TODAS las páginas de la web.
// Aquí se define:
// - El idioma (español)
// - Las fuentes
// - El título y descripción para Google (SEO)
// - Los estilos globales
//
// Todo lo que pongas aquí aparece en TODAS las páginas.
// ============================================

import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  metadataBase: new URL("https://laimpecable.es"),
  title: {
    default: "IMPECABLE | Cuidado Profesional del Vehículo · Sanlúcar de Barrameda",
    template: "%s | IMPECABLE",
  },
  description:
    "Estética avanzada de vehículos en Sanlúcar de Barrameda. Tratamientos de precisión, detailing profesional y atención al detalle. Pide tu cita.",
  keywords: [
    "detailing",
    "estética de vehículos",
    "limpieza profesional de coches",
    "Sanlúcar de Barrameda",
    "pulido",
    "tapicería",
    "tratamiento de pintura",
  ],
  authors: [{ name: "Impecable" }],
  creator: "Impecable",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://laimpecable.es",
    siteName: "Impecable",
    title: "IMPECABLE | Cuidado Profesional del Vehículo",
    description:
      "Estética avanzada de vehículos en Sanlúcar de Barrameda. Tratamientos de precisión y detailing profesional.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "IMPECABLE - Cuidado Profesional del Vehículo · Sanlúcar de Barrameda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IMPECABLE | Cuidado Profesional del Vehículo",
    description:
      "Estética avanzada de vehículos en Sanlúcar de Barrameda.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://laimpecable.es",
  },
};

export default function RootLayout({ children }) {
  return (
    // lang="es" le dice al navegador y a Google que la web está en español
    <html lang="es">
      <body className="font-sans">
        <Navbar />
        {/* {children} es donde se renderiza cada página */}
        {children}
      </body>
    </html>
  );
}
