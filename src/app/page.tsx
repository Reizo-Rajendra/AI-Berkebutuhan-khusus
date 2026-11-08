import type { Metadata } from "next";
import LandingClient from "@/components/landing/LandingClient";

export const metadata: Metadata = {
  title: "POLANITAS — Platform Inklusif AI untuk Penyandang Disabilitas",
  description:
    "POLANITAS: Platform AI inklusif — TanganBicara AI mengubah gerakan tangan menjadi suara, Mata AI mendeskripsikan lingkungan untuk tunanetra, navigasi suara & pelacak mata.",
};

export default function LandingPage() {
  return <LandingClient />;
}
