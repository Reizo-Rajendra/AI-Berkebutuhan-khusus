"use client";

import { motion } from "framer-motion";
import { Mic, Volume2, Command, ChevronRight } from "lucide-react";

const COMMANDS = [
 { cmd: "\"Buka Beranda\"", action: "Navigasi ke halaman utama" },
 { cmd: "\"Buka TanganBicara\"", action: "Buka fitur gestur ke suara" },
 { cmd: "\"Buka Mata AI\"", action: "Buka fitur kamera deskripsi" },
 { cmd: "\"Buka Hak Disabilitas\"", action: "Buka panduan hak-hak penyandang disabilitas" },
 { cmd: "\"Buka Panduan\"", action: "Buka halaman bantuan" },
 { cmd: "\"Buka Eye Tracking\"", action: "Buka panduan pelacak mata" },
 { cmd: "\"Baca Halaman\"", action: "AI membaca seluruh teks yang terlihat" },
 { cmd: "\"Scroll Bawah\"", action: "Gulir halaman ke bawah" },
 { cmd: "\"Scroll Atas\"", action: "Gulir halaman ke atas" },
 { cmd: "\"Kembali\"", action: "Kembali ke halaman sebelumnya" },
];

export default function VoiceCommandsPage() {
 return (
 <div className="page-container max-w-2xl mx-auto pb-28 md:pb-10">
 {/* Header */}
 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
 <div className="flex items-center gap-2 mb-2">
 <Mic size={16} className="text-accent-text" />
 <span className="text-xs font-bold text-accent-text uppercase tracking-widest">Tunanetra & Low Vision</span>
 </div>
 <h1 className="text-2xl font-extrabold text-primary mb-2">Navigasi Suara</h1>
 <p className="text-sm text-secondary leading-relaxed">
 Ucapkan perintah suara untuk berpindah halaman, membaca konten, dan berinteraksi dengan aplikasi â€” tanpa menyentuh layar.
 </p>
 </motion.div>

 {/* How to activate */}
 <div className="bg-gradient-to-br from-violet-600 to-purple-800 rounded-2xl p-5 mb-6">
 <div className="flex items-center gap-3 mb-3">
 <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
 <Volume2 size={20} className="text-white" />
 </div>
 <div>
 <p className="text-white font-extrabold text-sm">Cara Mengaktifkan</p>
 <p className="text-white/70 text-xs">Tombol mikrofon sudah aktif otomatis</p>
 </div>
 </div>
 <p className="text-white/80 text-xs leading-relaxed">
 Ucapkan perintah dengan jelas dalam Bahasa Indonesia. Aplikasi mendengarkan terus-menerus â€” tidak perlu menekan tombol apa pun. Pastikan mikrofon diizinkan di browser.
 </p>
 </div>

 {/* Commands List */}
 <section>
 <div className="flex items-center gap-2 mb-3">
 <Command size={14} className="text-accent-text" />
 <h2 className="font-bold text-sm text-primary uppercase tracking-wide">Daftar Perintah Suara</h2>
 </div>
 <div className="flex flex-col gap-2">
 {COMMANDS.map(({ cmd, action }, i) => (
 <motion.div
 key={cmd}
 initial={{ opacity: 0, x: -12 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ delay: i * 0.05 }}
 className="flex items-center gap-3 bg-surface border border-border rounded-xl p-3"
 >
 <div className="w-8 h-8 rounded-lg bg-accent-subtle flex items-center justify-center shrink-0">
 <Mic size={13} className="text-accent-text" />
 </div>
 <div className="flex-1 min-w-0">
 <p className="font-bold text-xs text-primary">{cmd}</p>
 <p className="text-xs text-muted">{action}</p>
 </div>
 <ChevronRight size={14} className="text-muted shrink-0" />
 </motion.div>
 ))}
 </div>
 </section>

 {/* Tip */}
 <div className="mt-5 bg-amber-50 border border-amber-200 rounded-xl p-4">
 <p className="text-xs font-bold text-amber-700 mb-1">ðŸ’¡ Tips</p>
 <p className="text-xs text-amber-600 leading-relaxed">
 Jika perintah tidak dikenali, coba ulangi dengan nada yang lebih jelas atau periksa izin mikrofon di pengaturan browser.
 </p>
 </div>
 </div>
 );
}

