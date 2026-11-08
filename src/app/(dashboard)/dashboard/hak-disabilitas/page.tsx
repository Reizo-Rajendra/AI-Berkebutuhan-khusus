"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
 HeartHandshake,
 FileText,
 Phone,
 Shield,
 BookOpen,
 Volume2,
 ChevronDown,
 ExternalLink,
} from "lucide-react";

function speak(text: string) {
 if (typeof window !== "undefined" && "speechSynthesis" in window) {
 window.speechSynthesis.cancel();
 const u = new SpeechSynthesisUtterance(text);
 u.lang = "id-ID";
 u.rate = 0.9;
 window.speechSynthesis.speak(u);
 }
}

interface Section {
 id: string;
 Icon: any;
 color: string;
 title: string;
 content: string;
 links?: { label: string; url: string }[];
}

const SECTIONS: Section[] = [
 {
 id: "hak-dasar",
 Icon: Shield,
 color: "text-violet-600",
 title: "Hak Dasar Penyandang Disabilitas",
 content: `Berdasarkan UU No. 8 Tahun 2016 tentang Penyandang Disabilitas, setiap penyandang disabilitas berhak atas: hak hidup, hak bebas dari stigma, hak privasi, hak keadilan dan perlindungan hukum, hak pendidikan, hak pekerjaan dan kewirausahaan, hak kesehatan, hak politik, hak keagamaan, hak keolahragaan, hak kebudayaan dan pariwisata, hak kesejahteraan sosial, hak aksesibilitas, hak pelayanan publik, hak perlindungan dari bencana, hak habilitasi dan rehabilitasi, serta hak pendataan.`,
 links: [
 { label: "UU No. 8 Tahun 2016", url: "https://www.kemenkumham.go.id" },
 ],
 },
 {
 id: "aksesibilitas",
 Icon: FileText,
 color: "text-blue-600",
 title: "Hak Aksesibilitas & Fasilitas Publik",
 content: `Pemerintah wajib menyediakan aksesibilitas pada fasilitas publik. Ini mencakup: trotoar ramah kursi roda, toilet khusus disabilitas, jalur pemandu (guiding block) untuk tunanetra, parkir khusus, lift dengan braille dan audio, loket prioritas, serta media informasi yang dapat diakses oleh semua jenis disabilitas.`,
 },
 {
 id: "pendidikan",
 Icon: BookOpen,
 color: "text-emerald-600",
 title: "Hak Pendidikan Inklusif",
 content: `Penyandang disabilitas berhak mendapat pendidikan berkualitas pada semua jenjang. Sekolah wajib menyediakan guru pendamping khusus, kurikulum adaptif, dan fasilitas aksesibel. Pemerintah juga menyediakan beasiswa khusus penyandang disabilitas melalui LPDP dan Kemendikbud.`,
 },
 {
 id: "layanan-darurat",
 Icon: Phone,
 color: "text-red-600",
 title: "Layanan Darurat & Kontak Penting",
 content: `Nomor darurat yang perlu diketahui: Polisi: 110, Ambulans/BPBD: 119, Pemadam Kebakaran: 113, Komnas HAM: (021) 3925-230, Pusat Pelayanan Disabilitas Kemensos: 1500-454.`,
 links: [
 { label: "Kemensos RI", url: "https://www.kemensos.go.id" },
 ],
 },
 {
 id: "bantuan-sosial",
 Icon: HeartHandshake,
 color: "text-orange-600",
 title: "Program Bantuan Sosial",
 content: `Program bantuan sosial dari pemerintah untuk penyandang disabilitas: Program Keluarga Harapan (PKH), Kartu Indonesia Sehat (KIS) prioritas disabilitas, Asistensi Sosial Penyandang Disabilitas Berat (ASPDB), serta subsidi alat bantu dari BPJS Kesehatan meliputi kursi roda, kaki palsu, alat bantu dengar, dan kacamata.`,
 },
];

export default function HakDisabilitasPage() {
 const [expanded, setExpanded] = useState<string | null>("hak-dasar");

 return (
 <div className="page-container max-w-2xl mx-auto pb-28 md:pb-10">
 {/* Header */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="mb-6"
 >
 <div className="flex items-center gap-2 mb-2">
 <HeartHandshake size={16} className="text-accent-text" />
 <span className="text-xs font-bold text-accent-text uppercase tracking-widest">Panduan Resmi</span>
 </div>
 <h1 className="text-2xl font-extrabold text-primary mb-2">Hak Disabilitas</h1>
 <p className="text-sm text-secondary leading-relaxed">
 Panduan hak-hak penyandang disabilitas di Indonesia berdasarkan undang-undang dan peraturan yang berlaku.
 Tekan ikon suara untuk mendengarkan.
 </p>
 </motion.div>

 {/* Sections */}
 <div className="flex flex-col gap-3">
 {SECTIONS.map(({ id, Icon, color, title, content, links }, i) => (
 <motion.div
 key={id}
 initial={{ opacity: 0, y: 16 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: i * 0.08 }}
 className="bg-surface border border-border rounded-2xl overflow-hidden"
 >
 {/* Header row */}
 <button
 className="w-full flex items-center gap-3 p-4 text-left"
 onClick={() => setExpanded(expanded === id ? null : id)}
 aria-expanded={expanded === id}
 >
 <div className="w-9 h-9 rounded-xl bg-accent-subtle flex items-center justify-center shrink-0">
 <Icon size={18} className={color} />
 </div>
 <span className="font-bold text-sm text-primary flex-1">{title}</span>
 <div className="flex items-center gap-2 shrink-0">
 {/* TTS button */}
 <button
 onClick={(e) => { e.stopPropagation(); speak(`${title}. ${content}`); }}
 className="w-8 h-8 rounded-lg bg-accent-subtle flex items-center justify-center hover:bg-accent/20 transition-colors"
 title="Dengarkan"
 aria-label="Dengarkan dengan suara"
 >
 <Volume2 size={14} className="text-accent-text" />
 </button>
 <motion.div animate={{ rotate: expanded === id ? 180 : 0 }} transition={{ duration: 0.2 }}>
 <ChevronDown size={16} className="text-secondary" />
 </motion.div>
 </div>
 </button>

 {/* Content */}
 {expanded === id && (
 <motion.div
 initial={{ opacity: 0, height: 0 }}
 animate={{ opacity: 1, height: "auto" }}
 exit={{ opacity: 0, height: 0 }}
 className="px-4 pb-4"
 >
 <p className="text-sm text-secondary leading-relaxed mb-3">{content}</p>
 {links && (
 <div className="flex flex-wrap gap-2">
 {links.map(({ label, url }) => (
 <a
 key={url}
 href={url}
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center gap-1 text-xs font-semibold text-accent-text bg-accent-subtle px-3 py-1.5 rounded-full no-underline hover:bg-accent/20 transition-colors"
 >
 <ExternalLink size={11} /> {label}
 </a>
 ))}
 </div>
 )}
 </motion.div>
 )}
 </motion.div>
 ))}
 </div>

 {/* Emergency banner */}
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ delay: 0.5 }}
 className="mt-6 rounded-2xl bg-gradient-to-br from-red-500 to-rose-700 p-5"
 >
 <p className="text-white font-extrabold text-sm mb-1">ðŸ†˜ Butuh Bantuan Segera?</p>
 <p className="text-white/80 text-xs mb-3">Hubungi layanan darurat nasional</p>
 <div className="flex gap-3">
 <a href="tel:119" className="flex-1 bg-white/20 rounded-xl py-2 text-center text-white font-bold text-sm no-underline hover:bg-white/30 transition-colors">
 ðŸ“ž 119
 </a>
 <a href="tel:110" className="flex-1 bg-white/20 rounded-xl py-2 text-center text-white font-bold text-sm no-underline hover:bg-white/30 transition-colors">
 ðŸš” 110
 </a>
 <button
 onClick={() => speak("Tolong, saya butuh bantuan segera. Hubungi layanan darurat di nomor 119 untuk ambulans atau 110 untuk polisi.")}
 className="flex-1 bg-white rounded-xl py-2 text-center text-red-600 font-bold text-sm flex items-center justify-center gap-1"
 >
 <Volume2 size={13} /> Ucapkan
 </button>
 </div>
 </motion.div>
 </div>
 );
}

