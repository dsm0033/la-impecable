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

export const metadata = {
  metadataBase: new URL("https://laimpecable.es"),
  title: {
    default: "La Impecable | Limpieza Profesional de Vehículos en Sanlúcar de Barrameda",
    template: "%s | La Impecable",
  },
  description:
    "Servicio profesional de limpieza de vehículos en Sanlúcar de Barrameda. Lavado completo, tapicería profunda, encerado y más. Pide tu cita hoy.",
  keywords: [
    "limpieza de coches",
    "lavado de vehículos",
    "detailing",
    "Sanlúcar de Barrameda",
    "limpieza profesional",
    "tapicería",
    "encerado",
  ],
  authors: [{ name: "La Impecable" }],
  creator: "La Impecable",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://laimpecable.es",
    siteName: "La Impecable",
    title: "La Impecable | Limpieza Profesional de Vehículos",
    description:
      "Servicio profesional de limpieza de vehículos en Sanlúcar de Barrameda. Lavado completo, tapicería profunda, encerado y más.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "La Impecable - Limpieza Profesional de Vehículos en Sanlúcar de Barrameda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Impecable | Limpieza Profesional de Vehículos",
    description:
      "Servicio profesional de limpieza de vehículos en Sanlúcar de Barrameda.",
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
        {/* {children} es donde se renderiza cada página */}
        {children}
      </body>
    </html>
  );
}
