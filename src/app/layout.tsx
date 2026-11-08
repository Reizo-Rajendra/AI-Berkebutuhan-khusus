import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { AuthProvider } from "@/components/auth/AuthProvider";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "POLANITAS — Platform Inklusif AI",
    template: "%s | POLANITAS",
  },
  description:
    "Platform AI inklusif untuk penyandang disabilitas Indonesia: TanganBicara AI (gerakan tangan ke suara), Mata AI (kamera deskripsi lingkungan), navigasi suara, dan pelacak mata.",
  keywords: ["disabilitas", "tunawicara", "tunanetra", "ai inklusif", "tangan bicara", "mata ai", "eye tracking", "aksesibilitas"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning className={`${jakarta.variable} ${spaceMono.variable} antialiased`}>
      <body className="bg-bg text-primary font-sans min-h-dvh overflow-x-hidden leading-[1.6]">
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
