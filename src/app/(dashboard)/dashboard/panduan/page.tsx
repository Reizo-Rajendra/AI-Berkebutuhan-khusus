"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  HelpCircle,
  HandMetal,
  Eye,
  Mic,
  MousePointer2,
  HeartHandshake,
  ArrowRight,
  Mail,
} from "lucide-react";

const FAQ = [
  {
    q: "Apakah aplikasi ini gratis?",
    a: "Ya, seluruh fitur POLANITAS 100% gratis dan tidak memerlukan akun atau pendaftaran.",
  },
  {
    q: "Apakah data saya aman?",
    a: "Video kamera diproses langsung di perangkat kamu (browser). Tidak ada rekaman yang dikirim ke server.",
  },
  {
    q: "Browser apa yang didukung?",
    a: "POLANITAS bekerja terbaik di Google Chrome dan Microsoft Edge versi terbaru. Firefox juga didukung.",
  },
  {
    q: "Apakah bisa digunakan tanpa internet?",
    a: "Navigasi suara dan TTS (text-to-speech) memerlukan browser yang mendukung Web Speech API. Fitur analisis kamera memerlukan koneksi untuk Gemini AI.",
  },
  {
    q: "Bagaimana cara melaporkan masalah?",
    a: "Hubungi kami lewat email di bawah halaman ini, atau buka isu di GitHub repositori proyek.",
  },
];

const QUICK_LINKS = [
  { href: "/dashboard/sign-to-voice",    Icon: HandMetal,     label: "TanganBicara AI" },
  { href: "/dashboard/vision-describer", Icon: Eye,           label: "Mata AI" },
  { href: "/dashboard/voice-commands",   Icon: Mic,           label: "Navigasi Suara" },
  { href: "/dashboard/eye-tracking",     Icon: MousePointer2, label: "Pelacak Mata" },
  { href: "/dashboard/hak-disabilitas",  Icon: HeartHandshake,label: "Hak Disabilitas" },
];

export default function PanduanPage() {
  return (
    <div className="page-container max-w-2xl mx-auto pb-28 md:pb-10">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle size={16} className="text-accent-text" />
          <span className="text-xs font-bold text-accent-text uppercase tracking-widest">Pusat Bantuan</span>
        </div>
        <h1 className="text-2xl font-extrabold text-primary mb-2">Panduan & Bantuan</h1>
        <p className="text-sm text-secondary leading-relaxed">
          Temukan jawaban atas pertanyaan umum dan panduan penggunaan setiap fitur POLANITAS.
        </p>
      </motion.div>

      {/* Quick Links */}
      <section className="mb-8">
        <h2 className="font-bold text-sm text-primary uppercase tracking-wide mb-3">Panduan Per Fitur</h2>
        <div className="flex flex-col gap-2">
          {QUICK_LINKS.map(({ href, Icon, label }, i) => (
            <motion.div
              key={href}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Link href={href} className="no-underline flex items-center gap-3 bg-surface border border-border rounded-xl p-3 hover:border-accent/40 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-accent-subtle flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-accent-text" />
                </div>
                <span className="font-semibold text-sm text-primary flex-1">{label}</span>
                <ArrowRight size={14} className="text-muted" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-8">
        <h2 className="font-bold text-sm text-primary uppercase tracking-wide mb-3">Pertanyaan Umum (FAQ)</h2>
        <div className="flex flex-col gap-3">
          {FAQ.map(({ q, a }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="bg-surface border border-border rounded-xl p-4"
            >
              <p className="font-bold text-sm text-primary mb-1.5">❓ {q}</p>
              <p className="text-xs text-secondary leading-relaxed">{a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-purple-800 p-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
          <Mail size={22} className="text-white" />
        </div>
        <div>
          <p className="text-white font-extrabold text-sm mb-0.5">Hubungi Kami</p>
          <p className="text-white/70 text-xs">
            Punya saran atau menemukan bug?{" "}
            <a
              href="https://github.com/Reizo-Rajendra/AI-Berkebutuhan-khusus/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline"
            >
              Buka issue di GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
