"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  HandMetal,
  Eye,
  Mic,
  MousePointer2,
  HeartHandshake,
  ArrowRight,
  Activity,
  Sparkles,
  Volume2,
  Camera,
  Info,
} from "lucide-react";

const FADE_UP: any = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" },
  }),
};

const TOOLS = [
  {
    href: "/dashboard/sign-to-voice",
    icon: HandMetal,
    gradient: "from-violet-500 to-purple-700",
    bg: "bg-violet-50",
    border: "border-violet-200",
    iconColor: "text-violet-600",
    label: "TanganBicara AI",
    desc: "Gerakan tangan → teks → suara. Khusus tunawicara & tunarungu.",
    badge: "Unggulan",
  },
  {
    href: "/dashboard/vision-describer",
    icon: Eye,
    gradient: "from-blue-500 to-indigo-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
    iconColor: "text-blue-600",
    label: "Mata AI",
    desc: "AI mendeskripsikan lingkungan, teks, uang, dan rintangan lewat kamera.",
    badge: "Tunanetra",
  },
  {
    href: "/dashboard/voice-commands",
    icon: Mic,
    gradient: "from-emerald-500 to-teal-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    iconColor: "text-emerald-600",
    label: "Navigasi Suara",
    desc: "Ucapkan perintah untuk navigasi halaman tanpa sentuh layar.",
    badge: null,
  },
  {
    href: "/dashboard/eye-tracking",
    icon: MousePointer2,
    gradient: "from-orange-500 to-amber-700",
    bg: "bg-orange-50",
    border: "border-orange-200",
    iconColor: "text-orange-600",
    label: "Pelacak Mata",
    desc: "Navigasi penuh dengan tatapan mata — dwell click & blink click.",
    badge: null,
  },
];

const QUICK_TIPS = [
  { Icon: Volume2,  tip: "Ucapkan \"Buka Mata AI\" untuk langsung buka fitur kamera AI." },
  { Icon: Camera,   tip: "Izinkan akses kamera di browser saat diminta untuk TanganBicara AI & Mata AI." },
  { Icon: Activity, tip: "Semua fitur aksesibilitas bekerja tanpa akun — langsung pakai." },
];

export default function DashboardPage() {
  return (
    <div className="page-container max-w-2xl mx-auto pb-28 md:pb-10">

      {/* Hero greeting */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={16} className="text-violet-600" />
          <span className="text-xs font-bold text-violet-600 uppercase tracking-widest">Platform Inklusif AI</span>
        </div>
        <h1 className="text-2xl font-extrabold text-[#1E1047] leading-tight mb-2">
          Selamat Datang di <span className="text-violet-600">POLANITAS</span>
        </h1>
        <p className="text-sm text-[#4C3D8A] leading-relaxed">
          Teknologi AI yang dirancang khusus untuk penyandang disabilitas — tunawicara, tunanetra, tunarungu, dan disabilitas fisik.
        </p>
      </motion.div>

      {/* AI Tools */}
      <section className="mb-8">
        <h2 className="font-bold text-xs text-[#7C6FAD] uppercase tracking-wide mb-3">Alat AI Utama</h2>
        <div className="flex flex-col gap-3">
          {TOOLS.map(({ href, icon: Icon, bg, border, iconColor, label, desc, badge, gradient }, i) => (
            <motion.div
              key={href}
              custom={i}
              initial="hidden"
              animate="show"
              variants={FADE_UP}
            >
              <Link href={href} className="no-underline">
                <div className={`rounded-2xl p-4 border ${bg} ${border} flex items-center gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${gradient} shadow-sm`}>
                    <Icon size={22} className="text-white" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-extrabold text-sm text-[#1E1047]">{label}</span>
                      {badge && (
                        <span className="text-[10px] font-bold bg-violet-600 text-white px-2 py-0.5 rounded-full">{badge}</span>
                      )}
                    </div>
                    <p className="text-xs text-[#4C3D8A] leading-relaxed line-clamp-2">{desc}</p>
                  </div>
                  <ArrowRight size={16} className={`shrink-0 ${iconColor}`} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="rounded-2xl bg-gradient-to-br from-violet-600 to-purple-800 p-5 mb-8 relative overflow-hidden"
      >
        <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/10" />
        <div className="absolute right-4 bottom-4 w-16 h-16 rounded-full bg-white/5" />
        <div className="relative z-10">
          <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">Di Indonesia</p>
          <p className="text-white font-extrabold text-xl mb-1">30 Juta+ Penyandang Disabilitas</p>
          <p className="text-white/80 text-xs leading-relaxed mb-4">
            Sebagian besar belum mendapat akses teknologi yang layak. POLANITAS hadir untuk itu.
          </p>
          <Link
            href="/dashboard/hak-disabilitas"
            className="inline-flex items-center gap-1.5 bg-white text-violet-700 font-bold text-xs px-4 py-2 rounded-full no-underline hover:bg-violet-50 transition-colors"
          >
            <HeartHandshake size={13} /> Pelajari Hak Disabilitas
          </Link>
        </div>
      </motion.div>

      {/* Quick Tips */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Info size={14} className="text-violet-600" />
          <h2 className="font-bold text-xs text-[#7C6FAD] uppercase tracking-wide">Tips Cepat</h2>
        </div>
        <div className="flex flex-col gap-2">
          {QUICK_TIPS.map(({ Icon, tip }, i) => (
            <div key={i} className="flex items-start gap-3 bg-white border border-[#E9E4FF] rounded-xl p-3">
              <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
                <Icon size={14} className="text-violet-600" />
              </div>
              <p className="text-xs text-[#4C3D8A] leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </motion.section>

    </div>
  );
}
