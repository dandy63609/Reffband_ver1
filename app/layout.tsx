import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "REFFBAND — 3D Accordion Gig Zine & Indie Band EPK Dossier",
  description: "Platform kurasi dan direktori digital musisi indie lokal Semarang & Event Organizer panggung dengan arsitektur 3D Accordion Booklet.",
  icons: {
    icon: "/extracted_assets/logo-r-square.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="overflow-hidden h-screen w-screen bg-[#14110F]">
        {children}
      </body>
    </html>
  );
}
