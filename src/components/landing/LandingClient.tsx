"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Hand,
  Eye,
  Ear,
  Brain,
  Volume2,
  Camera,
  Shield,
  Zap,
  ArrowRight,
  HeartHandshake,
  Mic,
  ScanLine,
  MessageCircle,
  Accessibility,
  Sparkles,
} from "lucide-react";
import { ThemeLogo } from "@/components/layout/ThemeLogo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease },
  }),
};

const FEATURES = [
  {
    Icon: Hand,
    title: "TanganBicara AI",
    desc: "Gerakan tangan dan bahasa isyarat diterjemahkan secara langsung menjadi suara AI bahasa Indonesia yang alami. Percakapan dua arah dengan siapapun tanpa hambatan.",
    tag: "Tunawicara & Tunarungu",
    color: "#7C3AED",
    href: "/dashboard/sign-to-voice",
    highlight: true,
  },
  {
    Icon: Eye,
    title: "Mata AI — Deskriptor Visual",
    desc: "Arahkan kamera ke lingkungan sekitar, teks dokumen, uang kertas, atau rintangan jalan. AI akan membacakan keterangannya dengan lantang secara otomatis.",
    tag: "Tunanetra & Low Vision",
    color: "#2563EB",
    href: "/dashboard/vision-describer",
    highlight: false,
  },
  {
    Icon: Mic,
    title: "Suara Perintah & Navigasi",
    desc: "Kendalikan seluruh aplikasi hanya dengan suara. Navigasi halaman, buka fitur, dan dengarkan konten tanpa menyentuh layar atau keyboard sama sekali.",
    tag: "Tunanetra & Disabilitas Fisik",
    color: "#059669",
    href: "/dashboard",
    highlight: false,
  },
  {
    Icon: ScanLine,
    title: "Pelacak Tatapan Mata (Eye Tracking)",
    desc: "Navigasi cursor dan klik elemen secara otomatis menggunakan gerakan mata (Dwell Click) atau kedipan mata (Blink Click) — tanpa mouse, tanpa keyboard.",
    tag: "Disabilitas Fisik & Tangan",
    color: "#D97706",
    href: "/dashboard",
    highlight: false,
  },
  {
    Icon: MessageCircle,
    title: "Asisten Percakapan AI",
    desc: "AI conversational yang memahami konteks komunikasi khusus penyandang disabilitas. Ajukan pertanyaan tentang kondisi, solusi, hak, dan dukungan yang tersedia.",
    tag: "Semua Disabilitas",
    color: "#0891B2",
    href: "/dashboard",
    highlight: false,
  },
  {
    Icon: Brain,
    title: "Panduan Kesehatan & Hak Disabilitas",
    desc: "Informasi terverifikasi tentang hak penyandang disabilitas, layanan pemerintah, kondisi medis, dan cara mendapatkan dukungan yang tepat — dibacakan oleh AI.",
    tag: "Semua Disabilitas",
    color: "#BE185D",
    href: "/dashboard",
    highlight: false,
  },
];

const DISABILITY_STATS = [
  { number: "30 Juta+", label: "Penyandang Disabilitas di Indonesia", icon: "🇮🇩" },
  { number: "95%", label: "Kesulitan Mengakses Layanan Digital", icon: "📱" },
  { number: "3 Detik", label: "Respons AI untuk Terjemahan Isyarat", icon: "⚡" },
  { number: "24/7", label: "Tersedia Tanpa Biaya Apapun", icon: "💚" },
];

export default function LandingClient() {
  return (
    <div className="min-h-dvh bg-bg flex flex-col font-sans overflow-x-hidden">
      {/* ── Navigation ─────────────────────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease }}
        className="flex items-center justify-between px-6 md:px-10 py-4 fixed top-0 left-0 right-0 z-[100] bg-surface/90 backdrop-blur-[12px] border-b border-border"
      >
        <div className="flex items-center gap-3">
          <ThemeLogo height={26} />
          <span className="hidden sm:inline text-xs font-semibold px-2.5 py-1 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
            Platform Inklusif AI
          </span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold shadow-sm transition-colors"
            >
              Buka Aplikasi <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
          </motion.div>
        </div>
      </motion.nav>

      <main className="flex-1 flex flex-col items-center pt-[72px]">
        {/* ── Hero ───────────────────────────────────────────────────── */}
        <motion.section
          initial="hidden"
          animate="visible"
          className="w-full max-w-[960px] mx-auto px-6 pt-20 pb-16 flex flex-col items-center text-center gap-7"
        >
          <motion.div
            variants={fadeUp}
            custom={0}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300"
          >
            <Accessibility size={16} />
            <span className="text-sm font-semibold">Teknologi AI untuk Semua, Tanpa Terkecuali</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-[clamp(2.25rem,5.5vw,4rem)] font-extrabold tracking-[-0.03em] leading-[1.1] text-primary"
          >
            Ketika Teknologi AI
            <br />
            <span className="glow-text">Merangkul Semua Orang</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="max-w-[620px] text-base md:text-lg text-secondary leading-[1.7]"
          >
            Platform kecerdasan buatan gratis yang dirancang khusus untuk membantu teman-teman penyandang disabilitas — tunawicara, tunarungu, tunanetra, dan disabilitas fisik — berkomunikasi, bereksplorasi, dan berdaya secara mandiri.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/dashboard/sign-to-voice"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-base shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <Hand size={18} /> Coba TanganBicara AI
            </Link>
            <Link
              href="/dashboard/vision-describer"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-surface hover:bg-surface-2 text-primary font-bold text-base border border-border hover:border-border-2 shadow-sm transition-all hover:-translate-y-0.5"
            >
              <Eye size={18} /> Mata AI — Deskriptor Visual
            </Link>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            variants={fadeUp}
            custom={4}
            className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mt-4"
          >
            {DISABILITY_STATS.map((s) => (
              <div
                key={s.label}
                className="p-4 rounded-2xl bg-surface border border-border shadow-sm text-center"
              >
                <span className="text-2xl block mb-1">{s.icon}</span>
                <span className="text-xl md:text-2xl font-extrabold text-primary block">{s.number}</span>
                <span className="text-xs text-muted mt-0.5 block leading-[1.4]">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* ── Features Grid ───────────────────────────────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="w-full max-w-[1100px] mx-auto px-6 pb-20"
        >
          <motion.div variants={fadeUp} custom={0} className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted block mb-3">Solusi Inovatif AI</span>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold text-primary tracking-tight leading-[1.15]">
              Satu Platform, Semua Kebutuhan Disabilitas
            </h2>
            <p className="text-secondary text-base mt-3 max-w-xl mx-auto">
              Didukung kecerdasan buatan terdepan, setiap fitur dirancang dengan memahami tantangan nyata penyandang disabilitas.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ Icon, title, desc, tag, color, href, highlight }, i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                custom={i + 1}
                className={`group relative flex flex-col p-7 rounded-[1.75rem] border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  highlight
                    ? "bg-violet-600 border-violet-600 text-white"
                    : "bg-surface border-border hover:border-border-2"
                }`}
              >
                {/* Background Glow */}
                {!highlight && (
                  <div
                    className="absolute top-0 right-0 w-28 h-28 opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500 blur-2xl rounded-full pointer-events-none"
                    style={{ background: color, transform: "translate(30%, -30%)" }}
                  />
                )}

                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-0.5"
                    style={
                      highlight
                        ? { background: "rgba(255,255,255,0.2)", color: "#fff" }
                        : { background: `${color}15`, color }
                    }
                  >
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <span
                    className="text-[0.6875rem] font-bold uppercase tracking-[0.08em] px-2.5 py-1 rounded-full border"
                    style={
                      highlight
                        ? { background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)", borderColor: "rgba(255,255,255,0.2)" }
                        : { background: `${color}10`, color: color, borderColor: `${color}25` }
                    }
                  >
                    {tag}
                  </span>
                </div>

                <h3 className={`text-lg font-bold mb-3 ${highlight ? "text-white" : "text-primary"}`}>
                  {title}
                </h3>
                <p className={`text-sm leading-[1.65] flex-1 ${highlight ? "text-white/80" : "text-secondary"}`}>
                  {desc}
                </p>

                <Link
                  href={href}
                  className={`mt-6 pt-4 border-t flex items-center justify-between text-sm font-semibold transition-colors ${
                    highlight
                      ? "border-white/20 text-white/80 hover:text-white"
                      : "border-border text-secondary hover:text-primary"
                  }`}
                >
                  <span>Buka Fitur</span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                      highlight
                        ? "bg-white/20 hover:bg-white/30"
                        : "bg-surface-2 border border-border group-hover:bg-primary group-hover:border-primary group-hover:text-bg"
                    }`}
                  >
                    <ArrowRight size={13} strokeWidth={2.5} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── How It Works ────────────────────────────────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="w-full bg-surface border-y border-border py-20"
        >
          <div className="max-w-[960px] mx-auto px-6">
            <motion.div variants={fadeUp} custom={0} className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted block mb-3">Cara Kerja</span>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold text-primary">
                TanganBicara AI: Bagaimana Cara Kerjanya?
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: "01", icon: "✋", title: "Tunjukkan Isyarat", desc: "Aktifkan kamera atau sentuh tombol isyarat dari kamus BISINDO yang tersedia. Pilih dari kata sambutan, kebutuhan dasar, respons, hingga kode darurat." },
                { step: "02", icon: "🤖", title: "AI Proses & Terjemahkan", desc: "Sistem AI mengidentifikasi gestur tangan dan mengubahnya menjadi kalimat alami berbahasa Indonesia yang bermakna, bukan sekadar kata tunggal." },
                { step: "03", icon: "🔊", title: "Suara AI Berbicara", desc: "Kalimat hasil terjemahan diucapkan dengan lantang oleh AI menggunakan teknologi text-to-speech bahasa Indonesia, sehingga lawan bicara dapat mendengar dengan jelas." },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  variants={fadeUp}
                  custom={i + 1}
                  className="p-6 rounded-2xl bg-bg border border-border flex flex-col gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{item.icon}</span>
                    <span className="text-[0.6875rem] font-black text-muted tracking-widest">LANGKAH {item.step}</span>
                  </div>
                  <h4 className="font-bold text-primary text-base">{item.title}</h4>
                  <p className="text-secondary text-sm leading-[1.65]">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── CTA Final ───────────────────────────────────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full max-w-[720px] mx-auto px-6 py-24 text-center"
        >
          <motion.div variants={fadeUp} custom={0} className="text-5xl mb-6">
            💜
          </motion.div>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold text-primary leading-[1.15] mb-4"
          >
            Semua orang berhak berkomunikasi dan berekspresi secara bebas.
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-secondary text-base md:text-lg mb-8">
            Platform ini gratis, terus berkembang, dan dibangun dengan kepedulian nyata terhadap teman-teman disabilitas di Indonesia.
          </motion.p>
          <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-7 py-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-base shadow-sm transition-all hover:-translate-y-0.5"
            >
              <Sparkles size={18} /> Mulai Gunakan Sekarang — Gratis
            </Link>
          </motion.div>
        </motion.section>
      </main>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer className="py-6 px-10 flex justify-between items-center flex-wrap gap-4 bg-surface border-t border-border">
        <div className="flex items-center gap-3">
          <ThemeLogo height={16} />
          <span className="text-[0.8125rem] text-muted">© 2026 Platform Inklusif AI — Untuk Semua.</span>
        </div>
        <div className="flex items-center gap-2 text-muted text-xs">
          <HeartHandshake size={14} className="text-violet-500" />
          <span>Dibuat dengan kepedulian untuk teman disabilitas Indonesia</span>
        </div>
      </footer>
    </div>
  );
}
