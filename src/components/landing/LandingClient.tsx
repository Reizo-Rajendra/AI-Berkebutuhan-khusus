"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Hand,
  Eye,
  Volume2,
  Camera,
  Shield,
  ArrowRight,
  HeartHandshake,
  Mic,
  ScanLine,
  MessageCircle,
  Accessibility,
  Sparkles,
  Smartphone,
  Globe2,
  Zap,
  Heart,
  Bot,
  HelpCircle,
} from "lucide-react";
import { ThemeLogo } from "@/components/layout/ThemeLogo";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease },
  }),
};

const FEATURES = [
  {
    Icon: Hand,
    title: "TanganBicara AI",
    desc: "Gerakan tangan dan bahasa isyarat BISINDO diterjemahkan langsung menjadi suara bahasa Indonesia. Dilengkapi mode dialog 2 arah untuk berkomunikasi dengan siapapun.",
    tag: "Tunawicara & Tunarungu",
    color: "#6D28D9",
    href: "/dashboard/sign-to-voice",
    highlight: true,
  },
  {
    Icon: Eye,
    title: "Mata AI — Deskriptor Visual",
    desc: "Arahkan kamera ke ruangan, dokumen, uang kertas, atau rintangan. AI menganalisis dan langsung membacakan keterangannya secara jelas melalui suara.",
    tag: "Tunanetra & Low Vision",
    color: "#2563EB",
    href: "/dashboard/vision-describer",
    highlight: false,
  },
  {
    Icon: Mic,
    title: "Navigasi & Perintah Suara",
    desc: "Kendalikan seluruh aplikasi cukup dengan berbicara dalam bahasa Indonesia. Berpindah halaman dan dengarkan isi informasi tanpa sentuh layar.",
    tag: "Tunanetra & Fisik",
    color: "#059669",
    href: "/dashboard/voice-commands",
    highlight: false,
  },
  {
    Icon: ScanLine,
    title: "Pelacak Tatapan Mata (Eye Tracking)",
    desc: "Navigasi otomatis menggunakan pandangan mata (Dwell Click) atau kedipan mata (Blink Click) — bebas digunakan tanpa mouse atau keyboard.",
    tag: "Disabilitas Fisik & Motorik",
    color: "#D97706",
    href: "/dashboard/eye-tracking",
    highlight: false,
  },
  {
    Icon: HeartHandshake,
    title: "Panduan Hak Disabilitas",
    desc: "Informasi resmi UU No. 8/2016, aksesibilitas fasilitas publik, beasiswa pendidikan inklusif, dan kontak layanan darurat nasional yang siap dibacakan oleh suara AI.",
    tag: "Advokasi & Hak",
    color: "#BE185D",
    href: "/dashboard/hak-disabilitas",
    highlight: false,
  },
  {
    Icon: HelpCircle,
    title: "Pusat Panduan & Aksesibilitas",
    desc: "Panduan cara memakai setiap fitur, tips pencahayaan kamera, penyesuaian ukuran teks besar, dan bantuan langsung bebas biaya.",
    tag: "Bantuan & Dukungan",
    color: "#0891B2",
    href: "/dashboard/panduan",
    highlight: false,
  },
];

const DISABILITY_STATS = [
  { number: "30 Juta+", label: "Penyandang Disabilitas di Indonesia", Icon: Globe2, color: "text-violet-600", bg: "bg-violet-100" },
  { number: "95%", label: "Kesulitan Mengakses Aplikasi Digital", Icon: Smartphone, color: "text-blue-600", bg: "bg-blue-100" },
  { number: "Instan", label: "Terjemahan Isyarat ke Suara AI", Icon: Zap, color: "text-amber-600", bg: "bg-amber-100" },
  { number: "100% Gratis", label: "Tanpa Akun & Langsung Digunakan", Icon: Heart, color: "text-emerald-600", bg: "bg-emerald-100" },
];

export default function LandingClient() {
  return (
    <div className="min-h-dvh bg-[#F8F9FD] flex flex-col font-sans overflow-x-hidden text-[#1E1B4B]">
      
      {/* ── Navigation (Clean, No Theme Toggle) ───────────────────────── */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease }}
        className="flex items-center justify-between px-6 md:px-12 py-3.5 fixed top-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-md border-b border-[#E2E8F0] shadow-sm"
      >
        <div className="flex items-center gap-3">
          <ThemeLogo height={28} />
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-200">
            <Accessibility size={13} /> Platform Inklusif AI Disabilitas
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold shadow-sm transition-all hover:shadow hover:-translate-y-0.5"
          >
            Buka Aplikasi <ArrowRight size={15} strokeWidth={2.5} />
          </Link>
        </div>
      </motion.nav>

      <main className="flex-1 flex flex-col items-center pt-[72px]">
        {/* ── Hero ───────────────────────────────────────────────────── */}
        <motion.section
          initial="hidden"
          animate="visible"
          className="w-full max-w-[980px] mx-auto px-6 pt-16 md:pt-24 pb-16 flex flex-col items-center text-center gap-6"
        >
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100/80 border border-violet-200 text-violet-800 text-xs md:text-sm font-semibold"
          >
            <Sparkles size={15} className="text-violet-600" />
            <span>Teknologi Kecerdasan Buatan Ramah Semua Disabilitas</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-[clamp(2.1rem,5vw,3.75rem)] font-extrabold tracking-tight leading-[1.15] text-[#1E1B4B]"
          >
            Ketika Teknologi AI
            <br />
            <span className="text-violet-600">Merangkul Semua Teman Disabilitas</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            custom={2}
            className="max-w-[640px] text-base md:text-lg text-[#475569] leading-relaxed"
          >
            Platform asistif berbasis AI untuk membantu teman-teman tunawicara, tunarungu, tunanetra, dan disabilitas fisik berkomunikasi bebas lewat kamera, suara alami, dan pelacak mata.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3.5 justify-center mt-2">
            <Link
              href="/dashboard/sign-to-voice"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm md:text-base shadow-sm hover:shadow transition-all hover:-translate-y-0.5"
            >
              <Hand size={18} /> Coba TanganBicara AI
            </Link>
            <Link
              href="/dashboard/vision-describer"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-violet-50 text-violet-700 font-bold text-sm md:text-base border border-violet-200 shadow-sm transition-all hover:-translate-y-0.5"
            >
              <Eye size={18} /> Mata AI — Pemandu Visual
            </Link>
          </motion.div>

          {/* Stats Cards (Icons instead of emoji) */}
          <motion.div
            variants={fadeUp}
            custom={4}
            className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mt-6"
          >
            {DISABILITY_STATS.map((s) => (
              <div
                key={s.label}
                className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col items-center text-center gap-2 hover:border-violet-200 transition-colors"
              >
                <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center ${s.color}`}>
                  <s.Icon size={20} strokeWidth={2} />
                </div>
                <span className="text-xl md:text-2xl font-extrabold text-[#1E1B4B]">{s.number}</span>
                <span className="text-xs text-[#64748B] leading-snug">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* ── Features Grid ───────────────────────────────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="w-full max-w-[1100px] mx-auto px-6 py-12"
        >
          <motion.div variants={fadeUp} custom={0} className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-violet-600 block mb-2">Solusi Inklusif</span>
            <h2 className="text-[clamp(1.75rem,3.2vw,2.4rem)] font-extrabold text-[#1E1B4B] tracking-tight">
              Fitur AI untuk Kebutuhan Sehari-hari
            </h2>
            <p className="text-[#475569] text-sm md:text-base mt-2 max-w-xl mx-auto">
              Setiap inovasi dibuat untuk memberikan kemandirian penuh tanpa rasa terasing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ Icon, title, desc, tag, color, href, highlight }, i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                custom={i + 1}
                className={`flex flex-col p-6 rounded-2xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                  highlight
                    ? "bg-violet-600 text-white border-violet-600 shadow-sm"
                    : "bg-white text-[#1E1B4B] border-[#E2E8F0] hover:border-violet-300"
                }`}
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: highlight ? "rgba(255,255,255,0.2)" : `${color}15`,
                      color: highlight ? "#fff" : color,
                    }}
                  >
                    <Icon size={22} strokeWidth={2} />
                  </div>
                  <span
                    className="text-[0.6875rem] font-bold px-2.5 py-1 rounded-full border"
                    style={{
                      background: highlight ? "rgba(255,255,255,0.2)" : `${color}10`,
                      color: highlight ? "#fff" : color,
                      borderColor: highlight ? "rgba(255,255,255,0.3)" : `${color}25`,
                    }}
                  >
                    {tag}
                  </span>
                </div>

                <h3 className={`text-base md:text-lg font-bold mb-2 ${highlight ? "text-white" : "text-[#1E1B4B]"}`}>
                  {title}
                </h3>
                <p className={`text-xs md:text-sm leading-relaxed flex-1 ${highlight ? "text-white/85" : "text-[#475569]"}`}>
                  {desc}
                </p>

                <Link
                  href={href}
                  className={`mt-5 pt-3.5 border-t flex items-center justify-between text-xs font-bold transition-colors ${
                    highlight
                      ? "border-white/20 text-white hover:text-white/90"
                      : "border-[#E2E8F0] text-violet-700 hover:text-violet-900"
                  }`}
                >
                  <span>Buka Fitur</span>
                  <ArrowRight size={14} strokeWidth={2.5} />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── How It Works (Icons instead of emoji) ───────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="w-full bg-white border-y border-[#E2E8F0] py-16"
        >
          <div className="max-w-[960px] mx-auto px-6">
            <motion.div variants={fadeUp} custom={0} className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-violet-600 block mb-2">Alur Interaksi</span>
              <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-extrabold text-[#1E1B4B]">
                Bagaimana TanganBicara AI Bekerja?
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  Icon: Camera,
                  title: "Peragakan Isyarat Tangan",
                  desc: "Arahkan tangan ke kamera atau pilih isyarat dari katalog BISINDO (bahasa isyarat asli dan kebutuhan harian).",
                },
                {
                  step: "02",
                  Icon: Bot,
                  title: "AI Memahami Makna",
                  desc: "AI mengonversi pose tangan menjadi kalimat bahasa Indonesia yang ramah, sopan, dan jelas maknanya.",
                },
                {
                  step: "03",
                  Icon: Volume2,
                  title: "Suara AI Berbicara",
                  desc: "AI membacakan suara secara lantang sehingga lawan bicara yang bisa mendengar langsung paham.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  variants={fadeUp}
                  custom={i + 1}
                  className="p-6 rounded-2xl bg-[#F8F9FD] border border-[#E2E8F0] flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-700">
                      <item.Icon size={20} strokeWidth={2} />
                    </div>
                    <span className="text-xs font-extrabold text-[#94A3B8] tracking-wider">LANGKAH {item.step}</span>
                  </div>
                  <h4 className="font-bold text-[#1E1B4B] text-base">{item.title}</h4>
                  <p className="text-[#475569] text-xs leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── Friendly CTA ────────────────────────────────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full max-w-[700px] mx-auto px-6 py-20 text-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-violet-100 text-violet-700 mx-auto flex items-center justify-center mb-5">
            <HeartHandshake size={28} />
          </div>
          <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-extrabold text-[#1E1B4B] leading-tight mb-3">
            Komunikasi adalah Hak Setiap Insan
          </h2>
          <p className="text-[#475569] text-sm md:text-base mb-6 leading-relaxed">
            Tidak ada biaya, tidak perlu registrasi. Langsung gunakan semua fitur asistif AI untuk membantu keseharian teman disabilitas.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-base shadow-sm transition-all hover:-translate-y-0.5"
          >
            <Sparkles size={18} /> Buka Dashboard Aksesibilitas
          </Link>
        </motion.section>
      </main>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer className="py-6 px-8 md:px-12 flex justify-between items-center flex-wrap gap-4 bg-white border-t border-[#E2E8F0] text-xs text-[#64748B]">
        <div className="flex items-center gap-3">
          <ThemeLogo height={20} />
          <span>© 2026 POLANITAS — Platform Inklusif AI untuk Teman Disabilitas.</span>
        </div>
        <div className="flex items-center gap-1.5 text-violet-700 font-medium">
          <HeartHandshake size={14} />
          <span>Inovasi Aksesibilitas Indonesia</span>
        </div>
      </footer>
    </div>
  );
}
