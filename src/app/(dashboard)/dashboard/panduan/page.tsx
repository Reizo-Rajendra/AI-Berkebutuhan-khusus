"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  HelpCircle,
  Hand,
  Eye,
  Mic,
  MousePointer2,
  HeartHandshake,
  ArrowRight,
  Mail,
  MessageCircleQuestion,
} from "lucide-react";

const FAQ = [
  {
    q: "Apakah seluruh fitur di platform ini gratis?",
    a: "Ya, seluruh fitur POLANITAS 100% gratis dan dapat langsung digunakan tanpa memerlukan pendaftaran akun.",
  },
  {
    q: "Bagaimana privasi video kamera saya?",
    a: "Video kamera diproses secara lokal di browser Anda. Tidak ada video atau gambar yang disimpan maupun disebarluaskan.",
  },
  {
    q: "Browser apa yang paling disarankan?",
    a: "POLANITAS bekerja paling optimal di Google Chrome dan Microsoft Edge versi terbaru, baik di komputer, laptop, maupun ponsel pintar.",
  },
  {
    q: "Mengapa kamera tidak mau terbuka?",
    a: "Pastikan Anda telah mengizinkan akses kamera pada ikon gembok/setelan situs di samping alamat web (URL) browser Anda, lalu klik 'Nyalakan Kamera'.",
  },
  {
    q: "Bagaimana cara kerja TanganBicara AI?",
    a: "Anda dapat memilih isyarat BISINDO pada katalog atau memperagakan pose tangan di depan kamera. AI akan menerjemahkannya dan membunyikan suara bahasa Indonesia.",
  },
];

const QUICK_LINKS = [
  { href: "/dashboard/sign-to-voice",    Icon: Hand,          label: "TanganBicara AI (Bahasa Isyarat ke Suara)" },
  { href: "/dashboard/vision-describer", Icon: Eye,           label: "Mata AI (Pemandu & Deskripsi Visual)" },
  { href: "/dashboard/voice-commands",   Icon: Mic,           label: "Navigasi & Perintah Suara" },
  { href: "/dashboard/eye-tracking",     Icon: MousePointer2, label: "Pelacak Tatapan Mata (Eye Tracking)" },
  { href: "/dashboard/hak-disabilitas",  Icon: HeartHandshake,label: "Panduan Hak Penyandang Disabilitas" },
];

export default function PanduanPage() {
  return (
    <div className="page-container max-w-2xl mx-auto pb-28 md:pb-10 text-[#1E1B4B]">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle size={16} className="text-violet-600" />
          <span className="text-xs font-bold text-violet-600 uppercase tracking-widest">Pusat Bantuan</span>
        </div>
        <h1 className="text-2xl font-extrabold text-[#1E1B4B] mb-2">Panduan &amp; Bantuan</h1>
        <p className="text-sm text-[#475569] leading-relaxed">
          Temukan petunjuk penggunaan fitur asistif AI dan jawaban atas pertanyaan umum seputar aksesibilitas.
        </p>
      </motion.div>

      {/* Quick Links */}
      <section className="mb-8">
        <h2 className="font-bold text-xs text-[#64748B] uppercase tracking-wide mb-3">Panduan Fitur</h2>
        <div className="flex flex-col gap-2">
          {QUICK_LINKS.map(({ href, Icon, label }, i) => (
            <motion.div
              key={href}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Link href={href} className="no-underline flex items-center gap-3 bg-white border border-[#E2E8F0] rounded-xl p-3.5 shadow-sm hover:border-violet-300 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-violet-600" />
                </div>
                <span className="font-bold text-xs text-[#1E1B4B] flex-1">{label}</span>
                <ArrowRight size={14} className="text-[#94A3B8]" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-8">
        <h2 className="font-bold text-xs text-[#64748B] uppercase tracking-wide mb-3">Pertanyaan yang Sering Diajukan (FAQ)</h2>
        <div className="flex flex-col gap-3">
          {FAQ.map(({ q, a }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-start gap-2.5 mb-1.5">
                <MessageCircleQuestion size={16} className="text-violet-600 shrink-0 mt-0.5" />
                <p className="font-bold text-xs md:text-sm text-[#1E1B4B]">{q}</p>
              </div>
              <p className="text-xs text-[#475569] leading-relaxed pl-6">{a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-purple-800 p-5 flex items-center gap-4 text-white shadow-sm">
        <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
          <Mail size={20} className="text-white" />
        </div>
        <div>
          <p className="font-extrabold text-sm mb-0.5">Saran &amp; Masukan</p>
          <p className="text-white/80 text-xs">
            Ingin mengajukan penambahan bahasa isyarat baru?{" "}
            <a
              href="https://github.com/Reizo-Rajendra/AI-Berkebutuhan-khusus/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-bold underline"
            >
              Buka GitHub Repositori
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
