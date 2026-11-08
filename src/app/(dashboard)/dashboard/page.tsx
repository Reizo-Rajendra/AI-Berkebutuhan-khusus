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

const FADE_UP = {
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
    color: "from-violet-500 to-purple-700",
    bg: "bg-violet-50 dark:bg-violet-950/40",
    border: "border-violet-200 dark:border-violet-800",
    iconColor: "text-violet-600 dark:text-violet-400",
    label: "TanganBicara AI",
    desc: "Gerakan tangan → teks → suara. Untuk tunawicara & tunarungu.",
    badge: "Unggulan",
  },
  {
    href: "/dashboard/vision-describer",
    icon: Eye,
    color: "from-blue-500 to-indigo-700",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    border: "border-blue-200 dark:border-blue-800",
    iconColor: "text-blue-600 dark:text-blue-400",
    label: "Mata AI",
    desc: "AI mendeskripsikan lingkungan, teks, uang, dan rintangan lewat kamera.",
    badge: "Tunanetra",
  },
  {
    href: "/dashboard/voice-commands",
    icon: Mic,
    color: "from-emerald-500 to-teal-700",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    border: "border-emerald-200 dark:border-emerald-800",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    label: "Navigasi Suara",
    desc: "Ucapkan perintah untuk navigasi halaman tanpa sentuh layar.",
    badge: null,
  },
  {
    href: "/dashboard/eye-tracking",
    icon: MousePointer2,
    color: "from-orange-500 to-amber-700",
    bg: "bg-orange-50 dark:bg-orange-950/40",
    border: "border-orange-200 dark:border-orange-800",
    iconColor: "text-orange-600 dark:text-orange-400",
    label: "Pelacak Mata",
    desc: "Navigasi penuh dengan tatapan mata — dwell click & blink click.",
    badge: null,
  },
];

const QUICK_TIPS = [
  { Icon: Volume2,  tip: "Ucapkan \"Buka Mata AI\" untuk langsung buka fitur kamera." },
  { Icon: Camera,   tip: "Izinkan akses kamera di browser saat diminta untuk TanganBicara AI & Mata AI." },
  { Icon: Activity, tip: "Semua fitur bekerja offline — data kamu tidak dikirim ke server." },
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
          <Sparkles size={16} className="text-accent-text" />
          <span className="text-xs font-bold text-accent-text uppercase tracking-widest">Platform Inklusif AI</span>
        </div>
        <h1 className="text-2xl font-extrabold text-primary leading-tight mb-2">
          Selamat Datang di <span className="text-accent-text">POLANITAS</span>
        </h1>
        <p className="text-sm text-secondary leading-relaxed">
          Teknologi AI yang dirancang khusus untuk penyandang disabilitas — tunawicara, tunanetra, tunarungu, dan disabilitas fisik.
        </p>
      </motion.div>

      {/* AI Tools Grid */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-sm text-primary uppercase tracking-wide">Alat AI Utama</h2>
        </div>

        <div className="flex flex-col gap-3">
          {TOOLS.map(({ href, icon: Icon, bg, border, iconColor, label, desc, badge, color }, i) => (
            <motion.div
              key={href}
              custom={i}
              initial="hidden"
              animate="show"
              variants={FADE_UP}
            >
              <Link href={href} className="no-underline">
                <div className={`rounded-2xl p-4 border ${bg} ${border} flex items-center gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md`}>
                  {/* Icon box */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${color} shadow-sm`}>
                    <Icon size={22} className="text-white" strokeWidth={2} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-extrabold text-sm text-primary">{label}</span>
                      {badge && (
                        <span className="text-[10px] font-bold bg-accent text-white px-2 py-0.5 rounded-full">{badge}</span>
                      )}
                    </div>
                    <p className="text-xs text-secondary leading-relaxed line-clamp-2">{desc}</p>
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
          <p className="text-white font-extrabold text-xl mb-1">30 Juta+ Penyandang</p>
          <p className="text-white/80 text-xs leading-relaxed mb-4">
            Disabilitas — dan sebagian besar belum mendapat akses teknologi yang layak.
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
          <Info size={14} className="text-accent-text" />
          <h2 className="font-bold text-sm text-primary uppercase tracking-wide">Tips Cepat</h2>
        </div>
        <div className="flex flex-col gap-2">
          {QUICK_TIPS.map(({ Icon, tip }, i) => (
            <div key={i} className="flex items-start gap-3 bg-surface border border-border rounded-xl p-3">
              <div className="w-7 h-7 rounded-lg bg-accent-subtle flex items-center justify-center shrink-0">
                <Icon size={14} className="text-accent-text" />
              </div>
              <p className="text-xs text-secondary leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </motion.section>

    </div>
  );
}
