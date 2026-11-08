"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Eye,
  Camera,
  CameraOff,
  Volume2,
  VolumeX,
  FileText,
  ShieldAlert,
  Banknote,
  Compass,
  RefreshCw,
  Sparkles,
  Loader2,
  ZoomIn,
  CheckCircle2,
} from "lucide-react";
import { analyzeVisualScene, VisionMode } from "@/actions/accessibility-ai-actions";
import { speakIndonesian, stopSpeaking } from "@/lib/tts-speech";

export default function VisionDescriberPage() {
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState<VisionMode>("scene");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [textSize, setTextSize] = useState<"normal" | "large" | "jumbo">("large");

  const [result, setResult] = useState<{
    title: string;
    description: string;
    spokenText: string;
    tags: string[];
    source?: string;
  } | null>({
    title: "Mata AI Siap Membantu",
    description:
      "Arahkan kamera perangkat Anda ke objek, ruangan, dokumen, atau uang kertas, lalu klik tombol 'Pindai & Jelaskan'. AI akan menganalisis dan langsung membacakan keterangannya lewat suara.",
    spokenText:
      "Mata AI siap membantu. Arahkan kamera dan tekan tombol pindai untuk mendengarkan penjelasan visual.",
    tags: ["Asisten Visual", "Suara AI", "Ramah Tunanetra"],
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // ── Camera setup ─────────────────────────────────────────────
  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
      speakIndonesian("Kamera aktif. Silakan arahkan kamera dan pilih tombol pindai.");
    } catch (err: any) {
      setCameraError("Tidak dapat mengakses kamera. Pastikan izin kamera telah diizinkan pada browser.");
      speakIndonesian("Kamera gagal diaktifkan. Periksa izin kamera pada perangkat Anda.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
      stopSpeaking();
    };
  }, []);

  // ── Capture and Analyze ──────────────────────────────────────
  const handleScanAndExplain = useCallback(async () => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);
    speakIndonesian("Sedang memindai dan menganalisis gambar. Mohon tunggu sebentar...");

    let base64 = "";

    // Capture from video feed if camera is running
    if (videoRef.current && canvasRef.current && cameraActive) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        base64 = canvas.toDataURL("image/jpeg", 0.85);
      }
    }

    try {
      const res = await analyzeVisualScene(base64, activeMode);
      setResult(res);

      // Auto speak aloud for visually impaired user
      setIsSpeaking(true);
      speakIndonesian(res.spokenText, () => setIsSpeaking(false));
    } catch (err) {
      const errText = "Maaf, terjadi kendala saat memproses gambar. Silakan coba kembali.";
      speakIndonesian(errText);
    } finally {
      setIsAnalyzing(false);
    }
  }, [activeMode, cameraActive, isAnalyzing]);

  // Mode change handler with voice announcement
  const handleModeChange = (mode: VisionMode, modeName: string) => {
    setActiveMode(mode);
    speakIndonesian(`Mode ${modeName} dipilih.`);
  };

  const getFontSizeClass = () => {
    if (textSize === "jumbo") return "text-2xl md:text-3xl leading-relaxed";
    if (textSize === "large") return "text-lg md:text-xl leading-relaxed";
    return "text-base leading-normal";
  };

  return (
    <div className="flex flex-col gap-8 pb-16 max-w-6xl mx-auto">
      {/* Hidden canvas for snapshot capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* ── Page Header ─────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-100 text-violet-800 dark:bg-violet-950/60 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
              <Eye size={14} /> Mata AI
            </span>
            <span className="text-xs text-muted">Ramah Tunanetra & Low Vision</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-primary">
            Pendamping Visual Cerdas & Pembaca Lingkungan
          </h1>
          <p className="text-secondary text-sm md:text-base mt-1 max-w-2xl">
            Arahkan kamera perangkat Anda untuk mendengarkan deskripsi ruangan, membaca teks dokumen/kemasan obat, 
            mendeteksi rintangan jalan, hingga mengenali pecahan uang rupiah secara otomatis.
          </p>
        </div>

        {/* Text size changer & camera toggler */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              const next = textSize === "normal" ? "large" : textSize === "large" ? "jumbo" : "normal";
              setTextSize(next);
            }}
            className="btn btn-secondary px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
            title="Ubah Ukuran Tulisan"
          >
            <ZoomIn size={14} /> Ukuran Teks: {textSize.toUpperCase()}
          </button>
          <button
            onClick={cameraActive ? stopCamera : startCamera}
            className={`btn ${cameraActive ? "btn-secondary text-red-600" : "btn-primary"} px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm`}
          >
            {cameraActive ? <CameraOff size={14} /> : <Camera size={14} />}
            {cameraActive ? "Matikan Kamera" : "Nyalakan Kamera"}
          </button>
        </div>
      </div>

      {cameraError && (
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-200 text-sm">
          {cameraError}
        </div>
      )}

      {/* ── 4 Selection Modes (Big Accessible Buttons) ──────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        {[
          { id: "scene" as VisionMode, label: "Deskripsi Ruangan", icon: Compass, desc: "Pahami suasana & objek" },
          { id: "text" as VisionMode, label: "Baca Teks & Label", icon: FileText, desc: "Obat, buku, & surat" },
          { id: "obstacle" as VisionMode, label: "Cek Rintangan", icon: ShieldAlert, desc: "Tangga & jalan aman" },
          { id: "money" as VisionMode, label: "Cek Uang Rupiah", icon: Banknote, desc: "Nominal uang belanja" },
        ].map((item) => {
          const isActive = activeMode === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleModeChange(item.id, item.label)}
              className={`p-4 rounded-2xl border text-left flex flex-col gap-2 transition-all cursor-pointer ${
                isActive
                  ? "bg-violet-600 text-white border-violet-600 shadow-md scale-[1.02]"
                  : "bg-surface hover:bg-surface-2 text-primary border-border hover:border-border-2"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  isActive ? "bg-white/20 text-white" : "bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-400"
                }`}>
                  <Icon size={18} />
                </div>
                {isActive && <CheckCircle2 size={16} className="text-white" />}
              </div>
              <div>
                <span className="font-bold text-sm block">{item.label}</span>
                <span className={`text-xs block mt-0.5 ${isActive ? "text-white/80" : "text-muted"}`}>
                  {item.desc}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Main Viewport & Trigger Bar ─────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Camera Live View (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="relative rounded-2xl overflow-hidden bg-surface border border-border shadow-sm aspect-[4/3] flex items-center justify-center">
            {cameraActive ? (
              <>
                <video
                  ref={videoRef}
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-surface/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-primary border border-border shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Kamera Lingkungan Aktif
                </div>
              </>
            ) : (
              <div className="p-8 text-center flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-surface-2 text-muted flex items-center justify-center">
                  <CameraOff size={26} />
                </div>
                <p className="text-xs text-muted max-w-xs">
                  Kamera tidak aktif. Anda tetap dapat menekan tombol &ldquo;Pindai & Jelaskan&rdquo; untuk mendengar simulasi kecerdasan AI.
                </p>
              </div>
            )}
          </div>

          {/* Big Action Button (Extra accessible for blind tactile navigation) */}
          <button
            onClick={handleScanAndExplain}
            disabled={isAnalyzing}
            className="w-full py-5 px-6 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-extrabold text-lg md:text-xl flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer disabled:opacity-60"
          >
            {isAnalyzing ? (
              <>
                <Loader2 size={24} className="animate-spin" />
                Menganalisis Pandangan...
              </>
            ) : (
              <>
                <Sparkles size={22} />
                📸 Pindai & Jelaskan Sekarang
              </>
            )}
          </button>
        </div>

        {/* AI Voice Explanation Card (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="p-6 md:p-8 rounded-2xl bg-surface border border-border shadow-sm flex flex-col gap-6">
            
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted block mb-1">
                  Hasil Penjelasan AI
                </span>
                <h3 className="text-xl font-bold text-primary">{result?.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (result?.spokenText) {
                      speakIndonesian(result.spokenText);
                    }
                  }}
                  className="btn btn-secondary btn-sm rounded-xl flex items-center gap-2 text-xs font-semibold px-3 py-2"
                >
                  <RefreshCw size={13} />
                  Ulangi Suara
                </button>
              </div>
            </div>

            {/* Description Text Box (High readability) */}
            <div className="p-6 rounded-2xl bg-violet-50/50 dark:bg-violet-950/20 border border-violet-100 dark:border-violet-900/50">
              <p className={`font-semibold text-primary ${getFontSizeClass()}`}>
                {result?.description}
              </p>

              {isSpeaking && (
                <div className="flex items-center gap-2.5 mt-4 text-xs font-semibold text-violet-700 dark:text-violet-300">
                  <Volume2 size={16} className="animate-pulse" />
                  Suara AI sedang membaca dengan lantang...
                </div>
              )}
            </div>

            {/* Tag Pills */}
            {result?.tags && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-muted font-medium">Kata Kunci:</span>
                {result.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-surface-2 border border-border text-secondary"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Accessibility Shortcut Tip */}
            <div className="p-4 rounded-xl bg-surface-2 border border-border text-xs text-secondary flex items-start gap-3">
              <Compass size={16} className="text-violet-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-primary block mb-0.5">Petunjuk Ramah Tunanetra:</strong>
                Anda dapat menggunakan tombol Spasi pada keyboard atau mengetuk dua kali layar untuk memicu pemindaian visual kapan saja.
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
