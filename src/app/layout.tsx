import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AosInit } from "./_components/aos-init";
import { FloatingWhatsApp } from "./_components/floating-whatsapp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coleta e Compra de Caroço do Açaí | Açaí da Amazônia",
  description: "Transforme o resíduo do açaí em renda. Coleta no seu endereço e pagamento no ato. Atendemos Belém/PA e região.",
  openGraph: {
    title: "Coleta e Compra de Caroço do Açaí | Açaí da Amazônia",
    description: "Coleta agendada, pagamento no ato e destinação ambientalmente correta do caroço do açaí.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <FloatingWhatsApp />
        <AosInit />
      </body>
    </html>
  );
}
