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

// Metadata: lo que Google y las redes sociales ven
// cuando alguien comparte tu web
export const metadata = {
  title: "La Impecable | Limpieza Profesional de Vehículos",
  description:
    "Servicio profesional de limpieza de vehículos en Sanlúcar de Barrameda. Lavado completo, tapicería profunda, encerado y más.",
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
