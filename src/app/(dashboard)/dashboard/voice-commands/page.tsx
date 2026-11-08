"use client";

import { motion } from "framer-motion";
import { Mic, Volume2, Command, ChevronRight, Lightbulb } from "lucide-react";

const COMMANDS = [
  { cmd: "\"Buka Beranda\"",         action: "Navigasi ke halaman utama" },
  { cmd: "\"Buka TanganBicara\"",    action: "Buka fitur gestur ke suara" },
  { cmd: "\"Buka Mata AI\"",         action: "Buka fitur kamera deskripsi" },
  { cmd: "\"Buka Hak Disabilitas\"", action: "Buka panduan hak-hak penyandang disabilitas" },
  { cmd: "\"Buka Panduan\"",         action: "Buka halaman bantuan" },
  { cmd: "\"Buka Eye Tracking\"",    action: "Buka panduan pelacak mata" },
  { cmd: "\"Baca Halaman\"",         action: "AI membaca seluruh teks yang terlihat" },
  { cmd: "\"Scroll Bawah\"",         action: "Gulir halaman ke bawah" },
  { cmd: "\"Scroll Atas\"",          action: "Gulir halaman ke atas" },
  { cmd: "\"Kembali\"",              action: "Kembali ke halaman sebelumnya" },
];

export default function VoiceCommandsPage() {
  return (
    <div className="page-container max-w-2xl mx-auto pb-28 md:pb-10 text-[#1E1B4B]">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Mic size={16} className="text-violet-600" />
          <span className="text-xs font-bold text-violet-600 uppercase tracking-widest">Tunanetra & Low Vision</span>
        </div>
        <h1 className="text-2xl font-extrabold text-[#1E1B4B] mb-2">Navigasi Suara</h1>
        <p className="text-sm text-[#475569] leading-relaxed">
          Ucapkan perintah suara untuk berpindah halaman, membaca konten, dan berinteraksi dengan aplikasi — tanpa menyentuh layar.
        </p>
      </motion.div>

      {/* How to activate */}
      <div className="bg-gradient-to-br from-violet-600 to-purple-800 rounded-2xl p-5 mb-6 text-white shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Volume2 size={20} className="text-white" />
          </div>
          <div>
            <p className="font-extrabold text-sm">Cara Mengaktifkan</p>
            <p className="text-white/80 text-xs">Mikrofon siap mendengarkan ucapan</p>
          </div>
        </div>
        <p className="text-white/85 text-xs leading-relaxed">
          Ucapkan perintah dengan jelas dalam Bahasa Indonesia. Aplikasi siap mendengarkan tanpa perlu menekan tombol apapun berulang kali. Pastikan izin mikrofon telah aktif di browser Anda.
        </p>
      </div>

      {/* Commands List */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Command size={14} className="text-violet-600" />
          <h2 className="font-bold text-xs text-[#64748B] uppercase tracking-wide">Daftar Perintah Suara</h2>
        </div>
        <div className="flex flex-col gap-2">
          {COMMANDS.map(({ cmd, action }, i) => (
            <motion.div
              key={cmd}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 bg-white border border-[#E2E8F0] rounded-xl p-3 shadow-sm hover:border-violet-200 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">
                <Mic size={13} className="text-violet-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-xs text-[#1E1B4B]">{cmd}</p>
                <p className="text-[0.7rem] text-[#64748B]">{action}</p>
              </div>
              <ChevronRight size={14} className="text-[#94A3B8] shrink-0" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tip */}
      <div className="mt-5 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <Lightbulb size={18} className="text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-bold text-amber-900 mb-0.5">Tips Navigasi</p>
          <p className="text-xs text-amber-800 leading-relaxed">
            Jika perintah tidak langsung dikenali, ucapkan dengan tempo tenang atau periksa izin mikrofon pada ikon gembok di sebelah URL browser Anda.
          </p>
        </div>
      </div>
    </div>
  );
}
