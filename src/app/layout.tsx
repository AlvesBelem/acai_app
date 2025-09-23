import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AosInit } from "./_components/aos-init";
import Script from "next/script";
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
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            try {
              var saved = localStorage.getItem('theme');
              var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
              var isDark = saved ? (saved === 'dark') : prefersDark;
              if (isDark) document.documentElement.classList.add('dark');
              else document.documentElement.classList.remove('dark');
            } catch (e) {}
          `}
        </Script>
        {children}
        <FloatingWhatsApp />
        <AosInit />
      </body>
    </html>
  );
}
