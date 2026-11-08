"use client";

import { motion } from "framer-motion";
import { MousePointer2, Eye, Zap, Settings2, Info } from "lucide-react";

const STEPS = [
  {
    num: "01",
    title: "Aktifkan Eye Tracking",
    desc: "Klik tombol mata (👁) di pojok kanan bawah layar. Izinkan akses kamera saat browser meminta.",
  },
  {
    num: "02",
    title: "Kalibrasi Mata",
    desc: "Ikuti titik merah yang bergerak di layar dengan mata kamu selama ±30 detik untuk meningkatkan akurasi.",
  },
  {
    num: "03",
    title: "Dwell Click",
    desc: "Tatap elemen selama 1,5–2 detik untuk mengkliknya. Lingkaran biru akan muncul saat berhasil terkunci.",
  },
  {
    num: "04",
    title: "Blink Click",
    desc: "Kedipkan mata (bukan berkedip alami) selama ~0,5 detik pada elemen yang ingin diklik.",
  },
];

const TIPS = [
  { Icon: Eye,         tip: "Pastikan cahaya cukup agar kamera dapat membaca pupil mata dengan baik." },
  { Icon: Settings2,   tip: "Atur sensitivitas dwell di pengaturan Eye Tracking jika terlalu cepat/lambat klik." },
  { Icon: Zap,         tip: "Gunakan headrest atau sandarkan kepala untuk gerakan mata yang lebih stabil." },
  { Icon: Info,        tip: "Restart kalibrasi kapan saja dengan menekan tombol 'Kalibrasi Ulang' di panel Eye Tracking." },
];

export default function EyeTrackingPage() {
  return (
    <div className="page-container max-w-2xl mx-auto pb-28 md:pb-10">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <MousePointer2 size={16} className="text-accent-text" />
          <span className="text-xs font-bold text-accent-text uppercase tracking-widest">Disabilitas Fisik</span>
        </div>
        <h1 className="text-2xl font-extrabold text-primary mb-2">Navigasi Pelacak Mata</h1>
        <p className="text-sm text-secondary leading-relaxed">
          Jelajahi seluruh aplikasi hanya dengan gerakan mata — tanpa mouse, tanpa sentuhan. Ikuti panduan berikut.
        </p>
      </motion.div>

      {/* How-to Steps */}
      <section className="mb-8">
        <h2 className="font-bold text-sm text-primary uppercase tracking-wide mb-3">Cara Memulai</h2>
        <div className="flex flex-col gap-3">
          {STEPS.map(({ num, title, desc }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 bg-surface border border-border rounded-2xl p-4"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shrink-0 shadow-sm">
                <span className="text-white font-extrabold text-xs">{num}</span>
              </div>
              <div>
                <p className="font-bold text-sm text-primary mb-1">{title}</p>
                <p className="text-xs text-secondary leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section>
        <h2 className="font-bold text-sm text-primary uppercase tracking-wide mb-3">Tips Akurasi</h2>
        <div className="flex flex-col gap-2">
          {TIPS.map(({ Icon, tip }, i) => (
            <div key={i} className="flex items-start gap-3 bg-surface border border-border rounded-xl p-3">
              <div className="w-7 h-7 rounded-lg bg-accent-subtle flex items-center justify-center shrink-0">
                <Icon size={14} className="text-accent-text" />
              </div>
              <p className="text-xs text-secondary leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-700 p-5 text-center"
      >
        <MousePointer2 size={28} className="text-white mx-auto mb-2" />
        <p className="text-white font-extrabold text-sm mb-1">Eye Tracking Sudah Aktif</p>
        <p className="text-white/80 text-xs">
          Klik tombol 👁 di pojok kanan bawah untuk mengaktifkan atau menonaktifkan kapan saja.
        </p>
      </motion.div>
    </div>
  );
}
