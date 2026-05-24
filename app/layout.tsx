import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UFOP Anúncios - Conectando a comunidade da UFOP",
  description:
    "Compre e venda itens usados entre universitários. Simples, rápido e sem taxas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="min-h-full flex flex-col bg-gray-50">{children}</body>
    </html>
  );
}
