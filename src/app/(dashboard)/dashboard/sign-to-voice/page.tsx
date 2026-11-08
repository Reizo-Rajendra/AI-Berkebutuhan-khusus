"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Camera,
  CameraOff,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Sparkles,
  Hand,
  RefreshCw,
  Copy,
  Check,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { speakIndonesian, stopSpeaking } from "@/lib/tts-speech";
import { convertGestureToSentence } from "@/actions/accessibility-ai-actions";

// ── Types ─────────────────────────────────────────────────────────────────────
interface GestureItem {
  id: string;
  label: string;
  meaning: string;
  category: "Salam" | "Kebutuhan" | "Respon" | "Darurat";
}

// ── Gesture Library ───────────────────────────────────────────────────────────
const GESTURE_LIBRARY: GestureItem[] = [
  { id: "HALO",           label: "Telapak Terbuka",       meaning: "Halo / Salam",           category: "Salam"     },
  { id: "TERIMA_KASIH",   label: "Tangan di Dada",        meaning: "Terima Kasih",           category: "Salam"     },
  { id: "TOLONG",         label: "Tangan Melambai",       meaning: "Tolong Bantu Saya",      category: "Kebutuhan" },
  { id: "SAYA_LAPAR",     label: "Tangan di Perut",       meaning: "Saya Lapar / Mau Makan", category: "Kebutuhan" },
  { id: "BUTUH_MINUM",    label: "Jempol ke Mulut",       meaning: "Butuh Air Minum",        category: "Kebutuhan" },
  { id: "YA",             label: "Jempol Naik",           meaning: "Ya / Setuju",            category: "Respon"    },
  { id: "TIDAK",          label: "Jempol Turun",          meaning: "Tidak / Tidak Setuju",   category: "Respon"    },
  { id: "MAAF",           label: "Kedua Tangan Bertemu",  meaning: "Mohon Maaf",             category: "Salam"     },
  { id: "DARURAT",        label: "Lengan Menyilang",      meaning: "DARURAT! Butuh Dokter",  category: "Darurat"   },
  { id: "SENANG_BERTEMU", label: "Dua Jari V",            meaning: "Senang Bertemu Anda",    category: "Salam"     },
];

// ── SVG Hand Gesture Icons ────────────────────────────────────────────────────
function HandGestureIcon({ id }: { id: string }) {
  const size = 56;
  switch (id) {
    case "HALO":
      return (
        <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
          <rect width="56" height="56" rx="12" fill="#EDE9FE" />
          {/* Palm */}
          <rect x="18" y="24" width="20" height="20" rx="6" fill="#6D28D9" />
          {/* Fingers */}
          <rect x="18" y="12" width="4" height="14" rx="2" fill="#6D28D9" />
          <rect x="24" y="10" width="4" height="16" rx="2" fill="#6D28D9" />
          <rect x="30" y="11" width="4" height="15" rx="2" fill="#6D28D9" />
          <rect x="36" y="13" width="4" height="13" rx="2" fill="#6D28D9" />
          {/* Thumb */}
          <rect x="12" y="22" width="8" height="4" rx="2" fill="#6D28D9" transform="rotate(-20 12 22)" />
        </svg>
      );
    case "TERIMA_KASIH":
      return (
        <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
          <rect width="56" height="56" rx="12" fill="#EDE9FE" />
          <ellipse cx="28" cy="32" rx="10" ry="12" fill="#6D28D9" />
          <rect x="20" y="12" width="4" height="22" rx="2" fill="#6D28D9" />
          <rect x="26" y="10" width="4" height="24" rx="2" fill="#6D28D9" />
          <rect x="32" y="12" width="4" height="22" rx="2" fill="#6D28D9" />
          <rect x="38" y="16" width="4" height="18" rx="2" fill="#6D28D9" />
          <ellipse cx="17" cy="28" rx="4" ry="6" fill="#6D28D9" />
        </svg>
      );
    case "TOLONG":
      return (
        <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
          <rect width="56" height="56" rx="12" fill="#FEF3C7" />
          <rect x="20" y="22" width="18" height="22" rx="5" fill="#D97706" />
          <rect x="20" y="10" width="4" height="14" rx="2" fill="#D97706" transform="rotate(-10 20 10)" />
          <rect x="26" y="8" width="4" height="16" rx="2" fill="#D97706" />
          <rect x="32" y="10" width="4" height="14" rx="2" fill="#D97706" transform="rotate(10 32 10)" />
          <rect x="38" y="14" width="4" height="12" rx="2" fill="#D97706" transform="rotate(20 38 14)" />
          <ellipse cx="16" cy="24" rx="4" ry="6" fill="#D97706" transform="rotate(-15 16 24)" />
        </svg>
      );
    case "SAYA_LAPAR":
      return (
        <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
          <rect width="56" height="56" rx="12" fill="#ECFDF5" />
          <ellipse cx="28" cy="34" rx="11" ry="10" fill="#059669" />
          <rect x="20" y="14" width="4" height="22" rx="2" fill="#059669" />
          <rect x="26" y="12" width="4" height="24" rx="2" fill="#059669" />
          <rect x="32" y="13" width="4" height="23" rx="2" fill="#059669" />
          <ellipse cx="17" cy="28" rx="4" ry="7" fill="#059669" />
          <circle cx="28" cy="34" r="4" fill="white" opacity="0.4" />
        </svg>
      );
    case "BUTUH_MINUM":
      return (
        <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
          <rect width="56" height="56" rx="12" fill="#EFF6FF" />
          <ellipse cx="28" cy="30" rx="10" ry="12" fill="#2563EB" />
          <rect x="22" y="14" width="4" height="18" rx="2" fill="#2563EB" />
          <rect x="28" y="12" width="4" height="20" rx="2" fill="#2563EB" />
          <rect x="34" y="14" width="4" height="18" rx="2" fill="#2563EB" />
          <ellipse cx="38" cy="20" rx="6" ry="4" fill="#2563EB" transform="rotate(30 38 20)" />
          {/* thumb tip near mouth */}
          <circle cx="17" cy="22" r="5" fill="#2563EB" />
        </svg>
      );
    case "YA":
      return (
        <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
          <rect width="56" height="56" rx="12" fill="#ECFDF5" />
          <rect x="20" y="28" width="22" height="16" rx="6" fill="#059669" />
          <rect x="14" y="12" width="8" height="18" rx="4" fill="#059669" transform="rotate(-15 14 12)" />
          <rect x="20" y="22" width="4" height="10" rx="2" fill="#059669" />
          <rect x="26" y="22" width="4" height="10" rx="2" fill="#059669" />
          <rect x="32" y="22" width="4" height="10" rx="2" fill="#059669" />
          <rect x="38" y="22" width="4" height="10" rx="2" fill="#059669" />
        </svg>
      );
    case "TIDAK":
      return (
        <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
          <rect width="56" height="56" rx="12" fill="#FEF2F2" />
          <rect x="20" y="12" width="22" height="16" rx="6" fill="#DC2626" />
          <rect x="14" y="26" width="8" height="18" rx="4" fill="#DC2626" transform="rotate(15 14 26)" />
          <rect x="20" y="24" width="4" height="10" rx="2" fill="#DC2626" />
          <rect x="26" y="24" width="4" height="10" rx="2" fill="#DC2626" />
          <rect x="32" y="24" width="4" height="10" rx="2" fill="#DC2626" />
          <rect x="38" y="24" width="4" height="10" rx="2" fill="#DC2626" />
        </svg>
      );
    case "MAAF":
      return (
        <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
          <rect width="56" height="56" rx="12" fill="#F5F3FF" />
          <rect x="22" y="14" width="6" height="28" rx="3" fill="#7C3AED" />
          <rect x="28" y="14" width="6" height="28" rx="3" fill="#5B21B6" />
          <rect x="16" y="20" width="8" height="22" rx="4" fill="#7C3AED" transform="rotate(-8 16 20)" />
          <rect x="32" y="20" width="8" height="22" rx="4" fill="#7C3AED" transform="rotate(8 32 20)" />
          <ellipse cx="28" cy="40" rx="8" ry="4" fill="#6D28D9" />
        </svg>
      );
    case "DARURAT":
      return (
        <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
          <rect width="56" height="56" rx="12" fill="#FEF2F2" />
          <rect x="8" y="24" width="40" height="8" rx="4" fill="#DC2626" transform="rotate(40 8 24)" />
          <rect x="8" y="24" width="40" height="8" rx="4" fill="#DC2626" transform="rotate(-40 48 24)" />
        </svg>
      );
    case "SENANG_BERTEMU":
      return (
        <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
          <rect width="56" height="56" rx="12" fill="#F0FDF4" />
          <ellipse cx="28" cy="36" rx="10" ry="10" fill="#16A34A" />
          <rect x="20" y="12" width="4" height="20" rx="2" fill="#16A34A" transform="rotate(-12 20 12)" />
          <rect x="32" y="12" width="4" height="20" rx="2" fill="#16A34A" transform="rotate(12 32 12)" />
          <rect x="26" y="22" width="4" height="14" rx="2" fill="#16A34A" />
          <ellipse cx="16" cy="30" rx="4" ry="7" fill="#16A34A" />
          <rect x="38" y="20" width="4" height="12" rx="2" fill="#16A34A" />
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
          <rect width="56" height="56" rx="12" fill="#EDE9FE" />
          <ellipse cx="28" cy="30" rx="10" ry="12" fill="#6D28D9" />
        </svg>
      );
  }
}

// ── Page Component ────────────────────────────────────────────────────────────
export default function SignToVoicePage() {
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [detectedGesture, setDetectedGesture] = useState<string | null>(null);
  const [currentSentence, setCurrentSentence] = useState<string>(
    "Arahkan kamera ke tangan Anda atau pilih isyarat di bawah untuk dibunyikan."
  );
  const [history, setHistory] = useState<Array<{ id: string; text: string; time: string }>>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);

  // Two-way conversation: Listen to partner
  const [partnerListening, setPartnerListening] = useState(false);
  const [partnerTranscript, setPartnerTranscript] = useState<string>("");
  const recognitionRef = useRef<any>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // ── Camera Control ─────────────────────────────────────────────
  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(() => {});
        };
      }
      setCameraActive(true);
    } catch (err: any) {
      setCameraError("Tidak dapat mengakses kamera. Pastikan izin kamera telah diberikan di browser.");
      setCameraActive(false);
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
    return () => {
      stopCamera();
      stopSpeaking();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
    };
  }, []);

  // ── Speech Generation (Sign to Voice) ──────────────────────────
  const triggerVoiceForGesture = useCallback(async (gestureId: string) => {
    setDetectedGesture(gestureId);
    const result = await convertGestureToSentence(gestureId);
    setCurrentSentence(result.text);

    setIsSpeaking(true);
    speakIndonesian(result.spokenText, () => setIsSpeaking(false));

    const now = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    setHistory((prev) => [{ id: Math.random().toString(), text: result.text, time: now }, ...prev.slice(0, 9)]);
  }, []);

  // ── Two-Way Partner Audio Recognition (Speech to Text) ─────────
  const togglePartnerMic = () => {
    if (partnerListening) {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch {}
      }
      setPartnerListening(false);
      return;
    }

    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      alert("Browser Anda belum mendukung Speech Recognition. Gunakan Chrome atau Edge.");
      return;
    }

    try {
      const recog = new SpeechRec();
      recog.lang = "id-ID";
      recog.continuous = true;
      recog.interimResults = true;

      recog.onresult = (e: any) => {
        let transcript = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
          transcript += e.results[i][0].transcript;
        }
        setPartnerTranscript(transcript);
      };

      recog.onerror = (e: any) => {
        console.warn("Partner speech error:", e);
        setPartnerListening(false);
      };

      recog.onend = () => {
        setPartnerListening(false);
      };

      recog.start();
      recognitionRef.current = recog;
      setPartnerListening(true);
    } catch (err) {
      console.error(err);
      setPartnerListening(false);
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(currentSentence);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Render ─────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-8 pb-16 max-w-7xl mx-auto">

      {/* ── Page Header ──────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E9E4FF] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-100 text-violet-800 border border-violet-200">
              <Hand size={14} /> TanganBicara AI
            </span>
            <span className="text-xs text-[#7C6FAD]">Ramah Tunawicara &amp; Tunarungu</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#1E1047]">
            Penerjemah Bahasa Isyarat &amp; Gerakan Tangan ke Suara
          </h1>
          <p className="text-[#4C3D8A] text-sm md:text-base mt-1 max-w-3xl">
            Ubah gerakan tangan dan bahasa isyarat secara langsung menjadi suara AI bahasa Indonesia yang ramah,
            dilengkapi mode percakapan dua arah untuk mendengar dan merespon lawan bicara.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={cameraActive ? stopCamera : startCamera}
            className={`btn ${cameraActive ? "btn-secondary text-red-600" : "btn-primary"} px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-semibold shadow-sm`}
          >
            {cameraActive ? <CameraOff size={16} /> : <Camera size={16} />}
            {cameraActive ? "Matikan Kamera" : "Nyalakan Kamera"}
          </button>
        </div>
      </div>

      {cameraError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3">
          <AlertCircle size={18} className="shrink-0" />
          <span>{cameraError}</span>
        </div>
      )}

      {/* ── Main Work Area (Two Columns) ─────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Left Col: Camera & Live AI Voice Card (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">

          {/* Camera Viewport */}
          <div className="relative rounded-2xl overflow-hidden bg-[#F3F0FF] border border-[#E9E4FF] shadow-sm aspect-[4/3] flex items-center justify-center">
            {cameraActive ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover rounded-2xl"
                />
                {/* Hand Detection Overlay Frame */}
                <div className="absolute inset-8 border-2 border-dashed border-violet-400/60 rounded-2xl pointer-events-none flex items-center justify-center">
                  <div className="bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#1E1047] border border-[#E9E4FF] flex items-center gap-2 shadow-sm">
                    <Sparkles size={14} className="text-violet-600" />
                    Posisikan Tangan di Dalam Kotak
                  </div>
                </div>

                {detectedGesture && (
                  <div className="absolute top-4 left-4 bg-violet-600 text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md animate-fade-in flex items-center gap-1.5">
                    <span>Terdeteksi:</span>
                    <span>{GESTURE_LIBRARY.find((g) => g.id === detectedGesture)?.meaning ?? detectedGesture}</span>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-[#EDE9FE] text-violet-600 flex items-center justify-center border border-violet-100">
                  <Camera size={32} />
                </div>
                <div className="max-w-xs">
                  <h3 className="font-bold text-[#1E1047] text-base">Kamera Sedang Nonaktif</h3>
                  <p className="text-xs text-[#7C6FAD] mt-1">
                    Aktifkan kamera untuk membaca gerakan isyarat tangan Anda secara langsung, atau klik tombol isyarat di bawah.
                  </p>
                </div>
                <button
                  onClick={startCamera}
                  className="btn btn-primary btn-sm rounded-lg mt-2 font-medium"
                >
                  Nyalakan Kamera Sekarang
                </button>
              </div>
            )}
          </div>

          {/* Voice Output Display Card */}
          <div className="p-6 rounded-2xl bg-white border border-[#E9E4FF] shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7C6FAD] flex items-center gap-1.5">
                <Volume2 size={15} className="text-violet-600" /> Suara AI yang Dibunyikan
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyText}
                  className="btn btn-ghost btn-icon w-8 h-8 rounded-lg text-[#7C6FAD] hover:text-[#1E1047]"
                  title="Salin Kalimat"
                >
                  {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                </button>
                <button
                  onClick={() => speakIndonesian(currentSentence)}
                  className="btn btn-secondary btn-sm rounded-lg flex items-center gap-1.5 text-xs font-semibold"
                >
                  <RefreshCw size={12} /> Bunyikan Lagi
                </button>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#F3F0FF] border border-[#E9E4FF]">
              <p className="text-xl md:text-2xl font-bold text-[#1E1047] leading-relaxed">
                &ldquo;{currentSentence}&rdquo;
              </p>
              {isSpeaking && (
                <div className="flex items-center gap-2 mt-3 text-xs font-medium text-violet-700">
                  <span className="w-2 h-2 rounded-full bg-violet-600 animate-ping" />
                  AI sedang berbicara kepada lawan bicara...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Col: Gesture Quick Triggers & Two-Way Conversation (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">

          {/* Quick Gesture Catalog (Touch / Click to Speak) */}
          <div className="p-6 rounded-2xl bg-white border border-[#E9E4FF] shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-[#1E1047] text-base">Kamus Isyarat Cepat (BISINDO)</h3>
                <p className="text-xs text-[#7C6FAD]">Sentuh tombol untuk langsung membunyikan suara AI</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {GESTURE_LIBRARY.map((item) => {
                const isSelected = detectedGesture === item.id;
                const isEmergency = item.category === "Darurat";
                return (
                  <button
                    key={item.id}
                    onClick={() => triggerVoiceForGesture(item.id)}
                    className={`flex flex-col text-left p-3 rounded-xl border transition-all text-xs font-medium cursor-pointer ${
                      isSelected
                        ? "bg-violet-600 text-white border-violet-600 shadow-md scale-[1.02]"
                        : isEmergency
                        ? "bg-red-50 hover:bg-red-100 text-red-800 border-red-200"
                        : "bg-[#F3F0FF] hover:bg-[#EDE9FE] text-[#1E1047] border-[#E9E4FF] hover:border-violet-300"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <HandGestureIcon id={item.id} />
                      <span
                        className={`text-[0.6875rem] px-1.5 py-0.5 rounded-full ${
                          isSelected ? "bg-white/20 text-white" : "bg-[#EDE9FE] text-[#7C6FAD]"
                        }`}
                      >
                        {item.category}
                      </span>
                    </div>
                    <span className="font-bold truncate mt-1">{item.meaning}</span>
                    <span className={`text-[0.6875rem] truncate ${isSelected ? "text-white/80" : "text-[#7C6FAD]"}`}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Two-Way Conversation: Lawan Bicara (Speech-to-Text) */}
          <div className="p-6 rounded-2xl bg-white border border-[#E9E4FF] shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-[#1E1047] text-base flex items-center gap-2">
                  <MessageSquare size={16} className="text-violet-600" /> Respon Lawan Bicara
                </h3>
                <p className="text-xs text-[#7C6FAD]">Ubah ucapan lawan bicara menjadi teks besar</p>
              </div>
              <button
                onClick={togglePartnerMic}
                className={`btn btn-sm rounded-lg flex items-center gap-1.5 font-semibold ${
                  partnerListening ? "bg-red-600 text-white hover:bg-red-700" : "btn-secondary"
                }`}
              >
                {partnerListening ? <MicOff size={14} /> : <Mic size={14} />}
                {partnerListening ? "Stop Rekam" : "Dengarkan"}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#F3F0FF] border border-[#E9E4FF] min-h-[100px] flex flex-col justify-center">
              {partnerListening ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    Sedang mendengarkan lawan bicara berbicara...
                  </div>
                  <p className="text-base font-semibold text-[#1E1047]">
                    {partnerTranscript || "Menunggu lawan bicara berbicara..."}
                  </p>
                </div>
              ) : partnerTranscript ? (
                <p className="text-base font-semibold text-[#1E1047]">{partnerTranscript}</p>
              ) : (
                <p className="text-xs text-[#7C6FAD] text-center">
                  Klik tombol <strong>&ldquo;Dengarkan&rdquo;</strong> lalu minta lawan bicara Anda berbicara di dekat mikrofon. Teks percakapan mereka akan tampil di sini.
                </p>
              )}
            </div>
          </div>

          {/* Conversation Log */}
          {history.length > 0 && (
            <div className="p-5 rounded-2xl bg-white border border-[#E9E4FF] shadow-sm flex flex-col gap-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#7C6FAD]">
                Riwayat Isyarat Terakhir
              </h4>
              <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto">
                {history.map((h) => (
                  <div
                    key={h.id}
                    onClick={() => speakIndonesian(h.text)}
                    className="p-2.5 rounded-lg bg-[#F3F0FF] hover:bg-[#EDE9FE] border border-[#E9E4FF] text-xs flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <span className="font-medium text-[#1E1047] truncate pr-2">&ldquo;{h.text}&rdquo;</span>
                    <span className="text-[0.6875rem] text-[#7C6FAD] shrink-0 flex items-center gap-1">
                      <Volume2 size={12} /> {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
