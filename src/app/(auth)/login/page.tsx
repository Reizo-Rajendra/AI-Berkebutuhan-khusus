import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Masuk" };

export default function LoginPage() {
  redirect("/dashboard");
}
