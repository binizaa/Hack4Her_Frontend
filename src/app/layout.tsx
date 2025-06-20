import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";
import ChatBot from "@/components/chat-bot";
import { UserProvider } from "@/context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tuali - Dashboard Gamificado",
  description: "Plataforma gamificada para tiendas en Ecuador",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <UserProvider>
            <Navigation />
            {children}
            <ChatBot />
          </UserProvider>
        </div>
      </body>
    </html>
  );
}
