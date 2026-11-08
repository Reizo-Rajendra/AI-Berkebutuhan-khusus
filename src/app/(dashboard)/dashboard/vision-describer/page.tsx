"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Eye,
  Camera,
  CameraOff,
  Volume2,
  FileText,
  ShieldAlert,
  Banknote,
  Compass,
  RefreshCw,
  Sparkles,
  Loader2,
  ZoomIn,
  MapPin,
} from "lucide-react";
import { analyzeVisualScene, VisionMode } from "@/actions/accessibility-ai-actions";
import { speakIndonesian, stopSpeaking } from "@/lib/tts-speech";

/* ─── Scan Mode Config ─────────────────────────────────── */
const MODES: {
  id: VisionMode;
  label: string;
  Icon: any;
  color: string;
  iconBg: string;
  desc: string;
}[] = [
  {
    id: "scene",
    label: "Deskripsi Ruang",
    Icon: Compass,
    color: "text-violet-700",
    iconBg: "bg-violet-100",
    desc: "AI mendeskripsikan suasana sekitar",
  },
  {
    id: "text",
    label: "Baca Teks",
    Icon: FileText,
    color: "text-blue-700",
    iconBg: "bg-blue-100",
    desc: "Membaca tulisan pada benda / dokumen",
  },
  {
    id: "obstacle",
    label: "Deteksi Halangan",
    Icon: ShieldAlert,
    color: "text-orange-700",
    iconBg: "bg-orange-100",
    desc: "Peringatkan rintangan di depan",
  },
  {
    id: "money",
    label: "Kenali Uang",
    Icon: Banknote,
    color: "text-emerald-700",
    iconBg: "bg-emerald-100",
    desc: "Identifikasi nominal uang kertas",
  },
];

/* ─── Text Size ─────────────────────────────────────────── */
type TextSize = "normal" | "large" | "jumbo";
const TEXT_SIZE_CLS: Record<TextSize, string> = {
  normal: "text-base leading-relaxed",
  large:  "text-xl leading-relaxed",
  jumbo:  "text-3xl leading-relaxed",
};

export default function VisionDescriberPage() {
  const [cameraActive, setCameraActive]   = useState(false);
  const [cameraError, setCameraError]     = useState<string | null>(null);
  const [activeMode, setActiveMode]       = useState<VisionMode>("scene");
  const [isAnalyzing, setIsAnalyzing]     = useState(false);
  const [isSpeaking, setIsSpeaking]       = useState(false);
  const [textSize, setTextSize]           = useState<TextSize>("large");

  const [result, setResult] = useState<{
    title: string;
    description: string;
    spokenText: string;
    tags: string[];
  }>({
    title: "Mata AI Siap Membantu",
    description:
      "Arahkan kamera ke objek, ruangan, dokumen, atau uang kertas, lalu klik tombol Pindai & Jelaskan. AI akan menganalisis dan langsung membacakan keterangan lewat suara.",
    spokenText:
      "Mata AI siap membantu. Arahkan kamera dan tekan tombol pindai.",
    tags: ["Asisten Visual", "Suara AI", "Ramah Tunanetra"],
  });

  const videoRef  = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  /* ─── Camera ───────────────────────────────────────────── */
  const startCamera = async () => {
    setCameraError(null);
    try {
      let stream: MediaStream;
      try {
        // Try environment camera (mobile back camera) first
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });
      } catch {
        try {
          // Fallback to user/front camera (laptop/webcam)
          stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
            audio: false,
          });
        } catch {
          // Generic fallback
          stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
        }
      }

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(() => {});
        };
      }
      setCameraActive(true);
      speakIndonesian("Kamera aktif. Silakan arahkan kamera dan pilih tombol pindai.");
    } catch (err: any) {
      console.error("Camera error:", err);
      setCameraError("Kamera belum dapat dibuka. Pastikan izin kamera telah diizinkan pada browser Anda.");
      speakIndonesian("Kamera gagal diaktifkan. Periksa izin kamera pada perangkat Anda.");
    }
  };

  // Keep stream bound to video ref
  useEffect(() => {
    if (cameraActive && streamRef.current && videoRef.current) {
      if (videoRef.current.srcObject !== streamRef.current) {
        videoRef.current.srcObject = streamRef.current;
      }
      videoRef.current.play().catch(() => {});
    }
  }, [cameraActive]);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraActive(false);
  }, []);

  /* Auto-start camera on mount */
  useEffect(() => {
    startCamera();
    return () => { stopCamera(); stopSpeaking(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ─── Scan & Analyze ───────────────────────────────────── */
  const handleScan = useCallback(async () => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);
    speakIndonesian("Sedang memindai gambar, mohon tunggu...");

    let base64 = "";
    if (videoRef.current && canvasRef.current && cameraActive) {
      const v = videoRef.current;
      const c = canvasRef.current;
      c.width  = v.videoWidth  || 640;
      c.height = v.videoHeight || 480;
      c.getContext("2d")?.drawImage(v, 0, 0, c.width, c.height);
      base64 = c.toDataURL("image/jpeg", 0.85);
    }

    try {
      const res = await analyzeVisualScene(base64, activeMode);
      setResult(res);
      setIsSpeaking(true);
      speakIndonesian(res.spokenText, () => setIsSpeaking(false));
    } catch {
      speakIndonesian("Maaf, terjadi kendala. Silakan coba kembali.");
    } finally {
      setIsAnalyzing(false);
    }
  }, [activeMode, cameraActive, isAnalyzing]);

  const handleModeChange = (mode: VisionMode, name: string) => {
    setActiveMode(mode);
    speakIndonesian(`Mode ${name} dipilih.`);
  };

  /* ─── Keyboard shortcut (Space = scan) ─────────────────── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" && e.target === document.body) {
        e.preventDefault();
        handleScan();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleScan]);

  /* ─── Render ────────────────────────────────────────────── */
  return (
    <div className="page-container max-w-5xl mx-auto pb-28 md:pb-10">

      {/* ── Header ── */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Eye size={16} className="text-violet-600" />
          <span className="text-xs font-bold text-violet-600 uppercase tracking-widest">Tunanetra & Low Vision</span>
        </div>
        <h1 className="text-2xl font-extrabold text-[#1E1047] mb-1">Mata AI</h1>
        <p className="text-sm text-[#4C3D8A] leading-relaxed">
          Kamera menangkap pandangan, AI mendeskripsikan apa yang ada di depan Anda — dan langsung membacakannya lewat suara.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">

        {/* ── Left col: Camera + Modes ── */}
        <div className="lg:col-span-5 flex flex-col gap-4">

          {/* Camera Box */}
          <div className="rounded-2xl overflow-hidden border-2 border-[#E9E4FF] bg-[#EDE9FE] relative"
               style={{ aspectRatio: "4/3" }}>
            {/* Hidden canvas for capture */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Video element — always rendered, hidden when inactive */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover transition-opacity duration-300 ${cameraActive ? "opacity-100" : "opacity-0 absolute"}`}
            />

            {/* Placeholder when no camera */}
            {!cameraActive && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                {/* Camera SVG illustration */}
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                  <rect width="72" height="72" rx="20" fill="#DDD6FE"/>
                  <rect x="12" y="22" width="48" height="34" rx="8" fill="#7C3AED" opacity="0.2"/>
                  <rect x="14" y="24" width="44" height="30" rx="7" fill="#7C3AED" opacity="0.3"/>
                  <circle cx="36" cy="39" r="11" fill="#6D28D9" opacity="0.5"/>
                  <circle cx="36" cy="39" r="7" fill="#7C3AED"/>
                  <circle cx="36" cy="39" r="3" fill="white"/>
                  <rect x="28" y="17" width="8" height="6" rx="2" fill="#7C3AED" opacity="0.4"/>
                  <circle cx="52" cy="29" r="3" fill="#7C3AED" opacity="0.4"/>
                </svg>
                <p className="text-sm font-semibold text-[#4C3D8A]">
                  {cameraError ?? "Kamera belum aktif"}
                </p>
                <button
                  onClick={startCamera}
                  className="mt-1 px-5 py-2.5 rounded-xl bg-violet-600 text-white font-bold text-sm flex items-center gap-2 hover:bg-violet-700 transition-colors"
                >
                  <Camera size={16} /> Aktifkan Kamera
                </button>
              </div>
            )}

            {/* Live indicator */}
            {cameraActive && (
              <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-violet-700 border border-violet-200 flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Kamera Aktif
              </div>
            )}

            {/* Stop button overlay */}
            {cameraActive && (
              <button
                onClick={stopCamera}
                className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-2.5 py-1.5 rounded-xl text-xs font-bold text-red-600 border border-red-200 flex items-center gap-1 hover:bg-red-50 transition-colors"
              >
                <CameraOff size={13} /> Stop
              </button>
            )}
          </div>

          {/* Scan Mode Buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            {MODES.map(({ id, label, Icon, color, iconBg, desc }) => (
              <button
                key={id}
                onClick={() => handleModeChange(id, label)}
                className={`flex flex-col items-start gap-2 p-3.5 rounded-2xl border-2 text-left transition-all duration-200 ${
                  activeMode === id
                    ? "border-violet-500 bg-violet-50 shadow-md"
                    : "border-[#E9E4FF] bg-white hover:border-violet-300"
                }`}
              >
                <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center`}>
                  <Icon size={18} className={color} />
                </div>
                <div>
                  <p className={`font-bold text-xs ${activeMode === id ? "text-violet-700" : "text-[#1E1047]"}`}>
                    {label}
                  </p>
                  <p className="text-[0.65rem] text-[#7C6FAD] leading-tight mt-0.5">{desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Scan Button */}
          <button
            onClick={handleScan}
            disabled={isAnalyzing}
            className="w-full py-5 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-extrabold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all active:scale-[0.98] disabled:opacity-60 cursor-pointer"
          >
            {isAnalyzing ? (
              <><Loader2 size={24} className="animate-spin" /> Menganalisis...</>
            ) : (
              <><Sparkles size={22} /> Pindai &amp; Jelaskan</>
            )}
          </button>

          {/* Text size */}
          <div className="flex items-center gap-2 justify-center">
            <ZoomIn size={14} className="text-[#7C6FAD]" />
            <span className="text-xs text-[#7C6FAD] font-medium">Ukuran teks:</span>
            {(["normal", "large", "jumbo"] as TextSize[]).map((s) => (
              <button
                key={s}
                onClick={() => setTextSize(s)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                  textSize === s
                    ? "bg-violet-600 text-white"
                    : "bg-[#EDE9FE] text-[#4C3D8A] hover:bg-violet-100"
                }`}
              >
                {s === "normal" ? "A" : s === "large" ? "A+" : "A++"}
              </button>
            ))}
          </div>

        </div>

        {/* ── Right col: AI Result ── */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-white border border-[#E9E4FF] shadow-sm p-6 md:p-8 flex flex-col gap-5 h-full">

            {/* Title row */}
            <div className="flex items-start justify-between border-b border-[#E9E4FF] pb-4 gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#7C6FAD] block mb-1">
                  Hasil Penjelasan AI
                </span>
                <h3 className="text-xl font-extrabold text-[#1E1047]">{result.title}</h3>
              </div>
              <button
                onClick={() => speakIndonesian(result.spokenText)}
                className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#EDE9FE] text-violet-700 font-bold text-xs hover:bg-violet-100 transition-colors"
              >
                <RefreshCw size={13} /> Ulangi Suara
              </button>
            </div>

            {/* Description */}
            <div className="p-5 rounded-2xl bg-[#F3F0FF] border border-[#E9E4FF] flex-1">
              <p className={`font-semibold text-[#1E1047] ${TEXT_SIZE_CLS[textSize]}`}>
                {result.description}
              </p>
              {isSpeaking && (
                <div className="flex items-center gap-2 mt-4 text-xs font-bold text-violet-600">
                  <Volume2 size={14} className="animate-pulse" />
                  Suara AI sedang membaca...
                </div>
              )}
            </div>

            {/* Tags */}
            {result.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <MapPin size={12} className="text-[#7C6FAD]" />
                {result.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-[#EDE9FE] text-[#4C3D8A] border border-[#C4B5FD]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Accessibility tip */}
            <div className="p-4 rounded-xl bg-[#EDE9FE] border border-[#C4B5FD] text-xs text-[#4C3D8A] flex items-start gap-3">
              <Compass size={15} className="text-violet-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#1E1047] block mb-0.5">Pintasan Keyboard:</strong>
                Tekan <kbd className="bg-white border border-[#C4B5FD] rounded px-1.5 py-0.5 font-mono text-[11px]">Space</kbd> kapan saja untuk memindai ulang tanpa menyentuh layar.
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
