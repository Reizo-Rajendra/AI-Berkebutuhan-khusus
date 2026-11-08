import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Lengkapi Profil" };

export default function SetupProfilePage() {
  redirect("/dashboard");
}
