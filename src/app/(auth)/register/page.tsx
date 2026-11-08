import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Daftar" };

export default function RegisterPage() {
  redirect("/dashboard");
}
