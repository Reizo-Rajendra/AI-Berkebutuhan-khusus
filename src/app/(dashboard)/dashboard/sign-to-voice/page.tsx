"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Camera,
  CameraOff,
  Volume2,
  Mic,
  MicOff,
  Hand,
  RefreshCw,
  Copy,
  Check,
  MessageSquare,
  AlertCircle,
  Sparkles,
  Loader2,
  BookOpen,
  Send,
} from "lucide-react";
import { speakIndonesian, stopSpeaking } from "@/lib/tts-speech";
import {
  convertGestureToSentence,
  recognizeHandSignFromCamera,
} from "@/actions/accessibility-ai-actions";

// ── Types ─────────────────────────────────────────────────────────────────────
interface GestureItem {
  id: string;
  label: string;
  meaning: string;
  category: string;
  type: "daily" | "bisindo_alphabet";
}

// ── Gesture Catalog (Kosa Kata & Alfabet BISINDO Asli) ────────────────────────
const GESTURE_CATALOG: GestureItem[] = [
  // ── Percakapan Harian ──
  { id: "HALO", label: "Lambaian Tangan", meaning: "Halo / Salam Sejahtera", category: "Salam", type: "daily" },
  { id: "TERIMA_KASIH", label: "Tangan di Dada", meaning: "Terima Kasih Banyak", category: "Kesopanan", type: "daily" },
  { id: "SAMA_SAMA", label: "Dua Tangan Terbuka", meaning: "Sama-sama, Senang Membantu", category: "Kesopanan", type: "daily" },
  { id: "TOLONG", label: "Kedua Tangan Memohon", meaning: "Tolong Bantu Saya", category: "Bantuan", type: "daily" },
  { id: "SAYA_LAPAR", label: "Tangan Dekat Mulut", meaning: "Saya Lapar / Mau Makan", category: "Kebutuhan", type: "daily" },
  { id: "BUTUH_MINUM", label: "Jempol ke Arah Bibir", meaning: "Saya Butuh Air Minum", category: "Kebutuhan", type: "daily" },
  { id: "YA", label: "Jempol Naik", meaning: "Ya / Saya Setuju", category: "Respon", type: "daily" },
  { id: "TIDAK", label: "Jempol Turun / Telapak", meaning: "Tidak / Kurang Setuju", category: "Respon", type: "daily" },
  { id: "MAAF", label: "Kedua Telapak Terkatup", meaning: "Mohon Maaf Sebesar-besarnya", category: "Kesopanan", type: "daily" },
  { id: "SAKIT", label: "Tangan Memegang Dahi", meaning: "Tubuh Saya Sakit", category: "Kebutuhan", type: "daily" },
  { id: "TOILET", label: "Silang Jari Telunjuk", meaning: "Di Mana Toilet / Kamar Mandi?", category: "Kebutuhan", type: "daily" },
  { id: "DARURAT", label: "Kedua Lengan Menyilang", meaning: "DARURAT! Butuh Dokter Segera", category: "Darurat", type: "daily" },

  // ── Alfabet & Isyarat Tangan Asli BISINDO ──
  { id: "BISINDO_A", label: "Kepalan Tangan Tegak", meaning: "Huruf A (BISINDO)", category: "Alfabet", type: "bisindo_alphabet" },
  { id: "BISINDO_B", label: "Empat Jari Rapat Lurus", meaning: "Huruf B (BISINDO)", category: "Alfabet", type: "bisindo_alphabet" },
  { id: "BISINDO_C", label: "Lengkungan Setengah C", meaning: "Huruf C (BISINDO)", category: "Alfabet", type: "bisindo_alphabet" },
  { id: "BISINDO_D", label: "Telunjuk Lurus Menunjuk", meaning: "Huruf D (BISINDO)", category: "Alfabet", type: "bisindo_alphabet" },
  { id: "BISINDO_E", label: "Ujung Jari Menekuk", meaning: "Huruf E (BISINDO)", category: "Alfabet", type: "bisindo_alphabet" },
  { id: "BISINDO_I", label: "Kelingking Tegak Lurus", meaning: "Huruf I (BISINDO)", category: "Alfabet", type: "bisindo_alphabet" },
  { id: "BISINDO_L", label: "Telunjuk & Jempol 90°", meaning: "Huruf L (BISINDO)", category: "Alfabet", type: "bisindo_alphabet" },
  { id: "BISINDO_O", label: "Lingkaran Jari Penuh", meaning: "Huruf O (BISINDO)", category: "Alfabet", type: "bisindo_alphabet" },
  { id: "BISINDO_V", label: "Dua Jari Membentuk V", meaning: "Huruf V (BISINDO)", category: "Alfabet", type: "bisindo_alphabet" },
  { id: "BISINDO_ILOVEYOU", label: "Jempol, Telunjuk, Kelingking", meaning: "Isyarat Cinta / I Love You", category: "Isyarat Khusus", type: "bisindo_alphabet" },
];

// ── Realistic Hand Gesture SVG Component ──────────────────────────────────────
function RealisticHandIcon({ id }: { id: string }) {
  const size = 64;
  switch (id) {
    case "HALO":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <rect width="64" height="64" rx="14" fill="#EDE9FE" />
          <path d="M22 28C22 25 24 23 27 23H37C40 23 42 25 42 28V42C42 46 38 49 34 49H30C26 49 22 46 22 42V28Z" fill="#6D28D9" />
          <rect x="23" y="12" width="3.5" height="15" rx="1.75" fill="#7C3AED" />
          <rect x="28.5" y="9" width="3.5" height="18" rx="1.75" fill="#7C3AED" />
          <rect x="34" y="11" width="3.5" height="16" rx="1.75" fill="#7C3AED" />
          <rect x="39.5" y="15" width="3.5" height="12" rx="1.75" fill="#7C3AED" />
          <path d="M16 28C16 26.5 17.5 25.5 19 26L23 28V34L19 32C17.5 31.5 16 30 16 28Z" fill="#7C3AED" />
        </svg>
      );

    case "TERIMA_KASIH":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <rect width="64" height="64" rx="14" fill="#EDE9FE" />
          <path d="M20 32C20 26 25 22 32 22C39 22 44 26 44 32C44 40 37 46 32 46C27 46 20 40 20 32Z" fill="#6D28D9" />
          <rect x="26" y="12" width="3.5" height="15" rx="1.75" fill="#7C3AED" />
          <rect x="31" y="10" width="3.5" height="17" rx="1.75" fill="#7C3AED" />
          <rect x="36" y="13" width="3.5" height="14" rx="1.75" fill="#7C3AED" />
          <circle cx="32" cy="34" r="5" fill="#EDE9FE" opacity="0.6" />
        </svg>
      );

    case "SAMA_SAMA":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <rect width="64" height="64" rx="14" fill="#EDE9FE" />
          <path d="M12 36C12 30 16 26 22 26V44C16 44 12 40 12 36Z" fill="#7C3AED" />
          <path d="M52 36C52 30 48 26 42 26V44C48 44 52 40 52 36Z" fill="#7C3AED" />
          <rect x="24" y="32" width="16" height="12" rx="4" fill="#6D28D9" />
          <circle cx="32" cy="24" r="4" fill="#7C3AED" />
        </svg>
      );

    case "TOLONG":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <rect width="64" height="64" rx="14" fill="#FEF3C7" />
          <path d="M22 30C22 24 26 20 31 22L32 24L33 22C38 20 42 24 42 30V40C42 44 38 47 32 47C26 47 22 44 22 40V30Z" fill="#D97706" />
          <rect x="24" y="13" width="3.5" height="14" rx="1.75" fill="#B45309" transform="rotate(-6 24 13)" />
          <rect x="29" y="11" width="3.5" height="16" rx="1.75" fill="#B45309" />
          <rect x="34" y="11" width="3.5" height="16" rx="1.75" fill="#B45309" />
          <rect x="39" y="13" width="3.5" height="14" rx="1.75" fill="#B45309" transform="rotate(6 39 13)" />
        </svg>
      );

    case "SAYA_LAPAR":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <rect width="64" height="64" rx="14" fill="#ECFDF5" />
          <circle cx="32" cy="38" r="14" fill="#059669" />
          <rect x="24" y="14" width="4" height="18" rx="2" fill="#047857" />
          <rect x="30" y="12" width="4" height="20" rx="2" fill="#047857" />
          <rect x="36" y="14" width="4" height="18" rx="2" fill="#047857" />
          <circle cx="32" cy="38" r="6" fill="#A7F3D0" />
        </svg>
      );

    case "BUTUH_MINUM":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <rect width="64" height="64" rx="14" fill="#EFF6FF" />
          <rect x="22" y="24" width="20" height="22" rx="6" fill="#2563EB" />
          <rect x="15" y="16" width="6" height="16" rx="3" fill="#1D4ED8" transform="rotate(-15 15 16)" />
          <circle cx="16" cy="15" r="4" fill="#60A5FA" />
          <rect x="26" y="14" width="3.5" height="12" rx="1.75" fill="#1D4ED8" />
          <rect x="31" y="14" width="3.5" height="12" rx="1.75" fill="#1D4ED8" />
          <rect x="36" y="14" width="3.5" height="12" rx="1.75" fill="#1D4ED8" />
        </svg>
      );

    case "YA":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <rect width="64" height="64" rx="14" fill="#ECFDF5" />
          <rect x="22" y="26" width="22" height="18" rx="7" fill="#059669" />
          <rect x="15" y="11" width="7" height="20" rx="3.5" fill="#047857" transform="rotate(-8 15 11)" />
          <circle cx="16" cy="11" r="4" fill="#10B981" />
          <rect x="24" y="22" width="3.5" height="9" rx="1.5" fill="#047857" />
          <rect x="29" y="22" width="3.5" height="9" rx="1.5" fill="#047857" />
          <rect x="34" y="22" width="3.5" height="9" rx="1.5" fill="#047857" />
        </svg>
      );

    case "TIDAK":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <rect width="64" height="64" rx="14" fill="#FEF2F2" />
          <rect x="22" y="16" width="22" height="18" rx="7" fill="#DC2626" />
          <rect x="15" y="26" width="7" height="20" rx="3.5" fill="#B91C1C" transform="rotate(8 15 26)" />
          <circle cx="16" cy="45" r="4" fill="#EF4444" />
          <rect x="24" y="28" width="3.5" height="9" rx="1.5" fill="#B91C1C" />
          <rect x="29" y="28" width="3.5" height="9" rx="1.5" fill="#B91C1C" />
          <rect x="34" y="28" width="3.5" height="9" rx="1.5" fill="#B91C1C" />
        </svg>
      );

    case "MAAF":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <rect width="64" height="64" rx="14" fill="#F5F3FF" />
          <rect x="24" y="14" width="6.5" height="28" rx="3.25" fill="#7C3AED" />
          <rect x="33.5" y="14" width="6.5" height="28" rx="3.25" fill="#5B21B6" />
          <rect x="18" y="20" width="7" height="20" rx="3.5" fill="#6D28D9" transform="rotate(-8 18 20)" />
          <rect x="39" y="20" width="7" height="20" rx="3.5" fill="#6D28D9" transform="rotate(8 39 20)" />
          <ellipse cx="32" cy="44" rx="10" ry="5" fill="#4C1D95" />
        </svg>
      );

    case "SAKIT":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <rect width="64" height="64" rx="14" fill="#FFF1F2" />
          <circle cx="32" cy="32" r="16" fill="#E11D48" />
          <path d="M24 32H40M32 24V40" stroke="white" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case "TOILET":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <rect width="64" height="64" rx="14" fill="#F0FDF4" />
          <rect x="18" y="18" width="28" height="7" rx="3.5" fill="#059669" />
          <rect x="28.5" y="22" width="7" height="24" rx="3.5" fill="#047857" />
        </svg>
      );

    case "DARURAT":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <rect width="64" height="64" rx="14" fill="#FEF2F2" />
          <rect x="10" y="28" width="44" height="8" rx="4" fill="#DC2626" transform="rotate(42 10 28)" />
          <rect x="10" y="28" width="44" height="8" rx="4" fill="#DC2626" transform="rotate(-42 54 28)" />
        </svg>
      );

    // ── Alfabet BISINDO ──
    case "BISINDO_A":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <rect width="64" height="64" rx="14" fill="#EDE9FE" />
          <rect x="22" y="22" width="22" height="24" rx="8" fill="#6D28D9" />
          <rect x="15" y="18" width="8" height="20" rx="4" fill="#7C3AED" />
          <text x="33" y="38" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">A</text>
        </svg>
      );

    case "BISINDO_B":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <rect width="64" height="64" rx="14" fill="#EDE9FE" />
          <rect x="22" y="28" width="20" height="20" rx="6" fill="#6D28D9" />
          <rect x="22" y="11" width="4" height="20" rx="2" fill="#7C3AED" />
          <rect x="27" y="10" width="4" height="21" rx="2" fill="#7C3AED" />
          <rect x="32" y="10" width="4" height="21" rx="2" fill="#7C3AED" />
          <rect x="37" y="12" width="4" height="19" rx="2" fill="#7C3AED" />
          <rect x="18" y="30" width="10" height="5" rx="2.5" fill="#5B21B6" />
          <text x="49" y="22" fill="#7C3AED" fontSize="14" fontWeight="bold">B</text>
        </svg>
      );

    case "BISINDO_C":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <rect width="64" height="64" rx="14" fill="#EDE9FE" />
          <path d="M42 18C30 14 20 22 20 32C20 42 30 50 42 46" stroke="#6D28D9" strokeWidth="8" strokeLinecap="round" />
          <text x="32" y="37" fill="#7C3AED" fontSize="16" fontWeight="bold" textAnchor="middle">C</text>
        </svg>
      );

    case "BISINDO_D":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <rect width="64" height="64" rx="14" fill="#EDE9FE" />
          <rect x="28" y="11" width="5" height="24" rx="2.5" fill="#7C3AED" />
          <circle cx="28" cy="38" r="10" fill="#6D28D9" />
          <text x="48" y="24" fill="#7C3AED" fontSize="14" fontWeight="bold">D</text>
        </svg>
      );

    case "BISINDO_E":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <rect width="64" height="64" rx="14" fill="#EDE9FE" />
          <rect x="22" y="24" width="22" height="22" rx="7" fill="#6D28D9" />
          <path d="M22 24C22 18 44 18 44 24" stroke="#7C3AED" strokeWidth="6" strokeLinecap="round" />
          <text x="33" y="39" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">E</text>
        </svg>
      );

    case "BISINDO_I":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <rect width="64" height="64" rx="14" fill="#EDE9FE" />
          <rect x="20" y="26" width="24" height="20" rx="7" fill="#6D28D9" />
          <rect x="38" y="10" width="5" height="20" rx="2.5" fill="#7C3AED" />
          <circle cx="40.5" cy="11" r="3" fill="#A78BFA" />
          <text x="24" y="22" fill="#7C3AED" fontSize="14" fontWeight="bold">I</text>
        </svg>
      );

    case "BISINDO_L":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <rect width="64" height="64" rx="14" fill="#EDE9FE" />
          <rect x="28" y="11" width="5" height="24" rx="2.5" fill="#7C3AED" />
          <rect x="14" y="32" width="18" height="5" rx="2.5" fill="#6D28D9" />
          <circle cx="30" cy="34" r="6" fill="#5B21B6" />
          <text x="46" y="24" fill="#7C3AED" fontSize="14" fontWeight="bold">L</text>
        </svg>
      );

    case "BISINDO_O":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <rect width="64" height="64" rx="14" fill="#EDE9FE" />
          <circle cx="32" cy="32" r="14" stroke="#6D28D9" strokeWidth="8" />
          <text x="32" y="37" fill="#7C3AED" fontSize="14" fontWeight="bold" textAnchor="middle">O</text>
        </svg>
      );

    case "BISINDO_V":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <rect width="64" height="64" rx="14" fill="#EDE9FE" />
          <rect x="22" y="28" width="20" height="20" rx="7" fill="#6D28D9" />
          <rect x="24" y="11" width="4.5" height="20" rx="2.25" fill="#7C3AED" transform="rotate(-12 24 11)" />
          <rect x="35" y="11" width="4.5" height="20" rx="2.25" fill="#7C3AED" transform="rotate(12 35 11)" />
          <text x="48" y="22" fill="#7C3AED" fontSize="14" fontWeight="bold">V</text>
        </svg>
      );

    case "BISINDO_ILOVEYOU":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <rect width="64" height="64" rx="14" fill="#FDF2F8" />
          <rect x="22" y="28" width="20" height="20" rx="7" fill="#DB2777" />
          {/* Thumb */}
          <rect x="13" y="26" width="12" height="5" rx="2.5" fill="#BE185D" transform="rotate(-20 13 26)" />
          {/* Index Finger */}
          <rect x="23" y="10" width="4.5" height="22" rx="2.25" fill="#BE185D" />
          {/* Pinky */}
          <rect x="37" y="12" width="4.5" height="20" rx="2.25" fill="#BE185D" />
          <circle cx="32" cy="38" r="4" fill="#FCE7F3" />
        </svg>
      );

    default:
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <rect width="64" height="64" rx="14" fill="#EDE9FE" />
          <circle cx="32" cy="32" r="12" fill="#6D28D9" />
        </svg>
      );
  }
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function SignToVoicePage() {
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [activeCatalogTab, setActiveCatalogTab] = useState<"daily" | "bisindo_alphabet">("daily");
  const [selectedGestureId, setSelectedGestureId] = useState<string | null>(null);
  const [isScanningHand, setIsScanningHand] = useState(false);

  const [currentSentence, setCurrentSentence] = useState<string>(
    "Pilih isyarat di bawah atau nyalakan kamera untuk diterjemahkan menjadi suara AI."
  );
  const [history, setHistory] = useState<Array<{ id: string; text: string; time: string }>>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);

  // Two-way conversation: Listen to partner
  const [partnerListening, setPartnerListening] = useState(false);
  const [partnerTranscript, setPartnerTranscript] = useState<string>("");
  const recognitionRef = useRef<any>(null);

  // Video & Stream refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // ── Camera Control with Robust Fallback ─────────────────────────
  const startCamera = async () => {
    setCameraError(null);
    try {
      let stream: MediaStream;
      try {
        // First try with facingMode user
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
          audio: false,
        });
      } catch {
        // Fallback to standard video for desktop/USB webcams
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
      }

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(() => {});
        };
      }

      setCameraActive(true);
      speakIndonesian("Kamera aktif. Silakan arahkan tangan Anda ke kamera.");
    } catch (err: any) {
      console.error("Camera error:", err);
      setCameraError(
        "Kamera belum dapat dibuka. Mohon berikan izin kamera pada ikon gembok di sebelah URL browser Anda."
      );
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

  // Ensure stream stays attached when active
  useEffect(() => {
    if (cameraActive && streamRef.current && videoRef.current) {
      if (videoRef.current.srcObject !== streamRef.current) {
        videoRef.current.srcObject = streamRef.current;
      }
      videoRef.current.play().catch(() => {});
    }
  }, [cameraActive]);

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

  // ── Trigger Gesture Voice Output ──────────────────────────────
  const handleSelectGesture = useCallback(async (gestureId: string) => {
    setSelectedGestureId(gestureId);
    const result = await convertGestureToSentence(gestureId);
    setCurrentSentence(result.text);

    setIsSpeaking(true);
    speakIndonesian(result.spokenText, () => setIsSpeaking(false));

    const now = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    setHistory((prev) => [{ id: Math.random().toString(), text: result.text, time: now }, ...prev.slice(0, 10)]);
  }, []);

  // ── Scan Live Hand from Camera ────────────────────────────────
  const handleScanLiveHand = async () => {
    if (!cameraActive || isScanningHand) return;
    setIsScanningHand(true);
    speakIndonesian("Menganalisis gerakan tangan dari kamera...");

    let base64 = "";
    if (videoRef.current && canvasRef.current) {
      const v = videoRef.current;
      const c = canvasRef.current;
      c.width = v.videoWidth || 640;
      c.height = v.videoHeight || 480;
      c.getContext("2d")?.drawImage(v, 0, 0, c.width, c.height);
      base64 = c.toDataURL("image/jpeg", 0.85);
    }

    try {
      const res = await recognizeHandSignFromCamera(base64);
      setCurrentSentence(`${res.gestureName} (${res.confidence}): "${res.text}"`);
      setIsSpeaking(true);
      speakIndonesian(res.spokenText, () => setIsSpeaking(false));

      const now = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
      setHistory((prev) => [
        { id: Math.random().toString(), text: `[Kamera] ${res.gestureName}: ${res.text}`, time: now },
        ...prev.slice(0, 10),
      ]);
    } catch {
      speakIndonesian("Gerakan tangan belum terdeteksi jelas, silakan coba dekatkan tangan ke kamera.");
    } finally {
      setIsScanningHand(false);
    }
  };

  // ── Two-Way Partner Speech-to-Text ────────────────────────────
  const togglePartnerMic = () => {
    if (partnerListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setPartnerListening(false);
      return;
    }

    const SpeechRec =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRec) {
      alert("Browser ini belum mendukung fitur pengenalan suara mikrofon.");
      return;
    }

    try {
      const recog = new SpeechRec();
      recog.lang = "id-ID";
      recog.continuous = true;
      recog.interimResults = true;

      recog.onresult = (e: any) => {
        let transcript = "";
        for (let i = 0; i < e.results.length; i++) {
          transcript += e.results[i][0].transcript;
        }
        setPartnerTranscript(transcript);
      };

      recog.onerror = () => setPartnerListening(false);
      recog.onend = () => setPartnerListening(false);

      recog.start();
      recognitionRef.current = recog;
      setPartnerListening(true);
    } catch {
      setPartnerListening(false);
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(currentSentence);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredCatalog = GESTURE_CATALOG.filter((item) => item.type === activeCatalogTab);

  // ── Render ─────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-6 pb-20 max-w-7xl mx-auto text-[#1E1B4B]">
      
      {/* Hidden canvas for snapshotting */}
      <canvas ref={canvasRef} className="hidden" />

      {/* ── Page Header ──────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-violet-100 text-violet-800 border border-violet-200">
              <Hand size={14} /> TanganBicara AI
            </span>
            <span className="text-xs text-[#64748B] font-medium">Khusus Teman Tunawicara &amp; Tunarungu</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#1E1B4B]">
            Penerjemah Bahasa Isyarat &amp; Gerakan Tangan ke Suara
          </h1>
          <p className="text-[#475569] text-sm mt-1 max-w-3xl">
            Tampilkan gerakan tangan ke kamera atau sentuh isyarat BISINDO di bawah untuk diubah langsung menjadi suara AI bahasa Indonesia.
          </p>
        </div>

        {/* Camera Toggle Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={cameraActive ? stopCamera : startCamera}
            className={`px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-bold shadow-sm transition-all ${
              cameraActive
                ? "bg-red-50 hover:bg-red-100 text-red-700 border border-red-200"
                : "bg-violet-600 hover:bg-violet-700 text-white"
            }`}
          >
            {cameraActive ? <CameraOff size={16} /> : <Camera size={16} />}
            {cameraActive ? "Matikan Kamera" : "Nyalakan Kamera"}
          </button>
        </div>
      </div>

      {cameraError && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-center gap-3">
          <AlertCircle size={18} className="shrink-0 text-amber-600" />
          <span>{cameraError}</span>
        </div>
      )}

      {/* ── Main Layout: Two Columns ─────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Camera Feed & AI Voice Output (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          
          {/* Camera Viewport (Always in DOM) */}
          <div className="relative rounded-2xl overflow-hidden bg-[#F1F5F9] border-2 border-[#E2E8F0] shadow-sm aspect-[4/3] flex items-center justify-center">
            
            {/* The Video Element: ALWAYS MOUNTED to guarantee ref is ready */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                cameraActive ? "opacity-100" : "opacity-0 absolute pointer-events-none"
              }`}
            />

            {/* Inactive Camera State Illustration */}
            {!cameraActive && (
              <div className="flex flex-col items-center justify-center gap-3 p-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center">
                  <Camera size={32} />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#1E1B4B] text-base">Kamera Sedang Nonaktif</h3>
                  <p className="text-xs text-[#64748B] max-w-xs mt-1">
                    Nyalakan kamera untuk mendeteksi pose tangan Anda, atau gunakan katalog isyarat di sebelah kanan.
                  </p>
                </div>
                <button
                  onClick={startCamera}
                  className="mt-1 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
                >
                  <Camera size={15} /> Aktifkan Kamera Sekarang
                </button>
              </div>
            )}

            {/* Active State Badges */}
            {cameraActive && (
              <>
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-violet-700 border border-violet-200 flex items-center gap-2 shadow-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  Kamera Memindai Tangan
                </div>

                {/* Scan Hand Button */}
                <button
                  onClick={handleScanLiveHand}
                  disabled={isScanningHand}
                  className="absolute bottom-3 left-3 right-3 py-3 rounded-xl bg-violet-600/95 hover:bg-violet-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md backdrop-blur-sm transition-all active:scale-[0.98] disabled:opacity-60"
                >
                  {isScanningHand ? (
                    <><Loader2 size={16} className="animate-spin" /> Menganalisis Pose Tangan...</>
                  ) : (
                    <><Sparkles size={16} /> Pindai Gerakan Tangan dari Kamera</>
                  )}
                </button>
              </>
            )}
          </div>

          {/* AI Voice Output Display Card */}
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                  Suara AI yang Diucapkan
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={copyText}
                  className="p-1.5 rounded-lg text-[#64748B] hover:text-violet-700 hover:bg-violet-50 transition-colors"
                  title="Salin Teks"
                >
                  {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                </button>
                <button
                  onClick={() => speakIndonesian(currentSentence)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-violet-50 hover:bg-violet-100 text-violet-700 flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw size={12} /> Ulangi Suara
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#F8F9FD] border border-[#E2E8F0]">
              <p className="text-base md:text-lg font-bold text-[#1E1B4B] leading-relaxed">
                &ldquo;{currentSentence}&rdquo;
              </p>
              {isSpeaking && (
                <div className="flex items-center gap-2 mt-3 text-xs font-bold text-violet-700">
                  <Volume2 size={15} className="animate-pulse" />
                  AI sedang membacakan kalimat dengan lantang...
                </div>
              )}
            </div>
          </div>

          {/* Two-Way Conversation (Dengar Lawan Bicara) */}
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-[#1E1B4B] text-sm flex items-center gap-2">
                  <MessageSquare size={16} className="text-violet-600" /> Respon Suara Lawan Bicara
                </h3>
                <p className="text-xs text-[#64748B]">Ubah ucapan lawan bicara menjadi teks yang mudah dibaca</p>
              </div>
              <button
                onClick={togglePartnerMic}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  partnerListening
                    ? "bg-red-600 text-white animate-pulse"
                    : "bg-violet-50 hover:bg-violet-100 text-violet-700 border border-violet-200"
                }`}
              >
                {partnerListening ? <MicOff size={14} /> : <Mic size={14} />}
                {partnerListening ? "Hentikan Rekam" : "Dengarkan"}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#F8F9FD] border border-[#E2E8F0] min-h-[80px] flex items-center justify-center text-center">
              {partnerListening ? (
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs font-bold text-emerald-600 animate-pulse">
                    Mendengarkan ucapan lawan bicara...
                  </span>
                  <p className="text-sm font-bold text-[#1E1B4B]">{partnerTranscript || "Bicaralah sekarang..."}</p>
                </div>
              ) : partnerTranscript ? (
                <p className="text-sm font-bold text-[#1E1B4B] text-left w-full">{partnerTranscript}</p>
              ) : (
                <p className="text-xs text-[#64748B]">
                  Tekan <strong>&ldquo;Dengarkan&rdquo;</strong> lalu persilakan lawan bicara berbicara di dekat mikrofon.
                </p>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Gesture Catalog (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col gap-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] pb-4">
              <div>
                <h3 className="font-extrabold text-[#1E1B4B] text-base">Katalog Isyarat Tangan</h3>
                <p className="text-xs text-[#64748B]">Sentuh isyarat untuk langsung dibunyikan oleh suara AI</p>
              </div>

              {/* Category Tab Switcher */}
              <div className="flex items-center p-1 rounded-xl bg-[#F1F5F9] border border-[#E2E8F0] self-start sm:self-auto">
                <button
                  onClick={() => setActiveCatalogTab("daily")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeCatalogTab === "daily"
                      ? "bg-white text-violet-700 shadow-sm"
                      : "text-[#64748B] hover:text-[#1E1B4B]"
                  }`}
                >
                  Kebutuhan Harian
                </button>
                <button
                  onClick={() => setActiveCatalogTab("bisindo_alphabet")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeCatalogTab === "bisindo_alphabet"
                      ? "bg-white text-violet-700 shadow-sm"
                      : "text-[#64748B] hover:text-[#1E1B4B]"
                  }`}
                >
                  Alfabet BISINDO Asli
                </button>
              </div>
            </div>

            {/* Gesture Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[560px] overflow-y-auto pr-1">
              {filteredCatalog.map((item) => {
                const isSelected = selectedGestureId === item.id;
                const isEmergency = item.category === "Darurat";

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectGesture(item.id)}
                    className={`flex flex-col items-center text-center p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? "border-violet-600 bg-violet-50/80 shadow-md scale-[1.02]"
                        : isEmergency
                        ? "border-red-200 bg-red-50/50 hover:bg-red-50 hover:border-red-300"
                        : "border-[#E2E8F0] bg-white hover:border-violet-300 hover:bg-[#FAF9FF]"
                    }`}
                  >
                    {/* Realistic SVG Vector Hand Icon */}
                    <div className="mb-2">
                      <RealisticHandIcon id={item.id} />
                    </div>

                    <span className="font-extrabold text-xs text-[#1E1B4B] line-clamp-1">
                      {item.meaning}
                    </span>
                    <span className="text-[0.65rem] text-[#64748B] line-clamp-1 mt-0.5">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recent Speech Log */}
          {history.length > 0 && (
            <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col gap-2.5">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#64748B]">
                Riwayat Ucapan Terakhir
              </h4>
              <div className="flex flex-col gap-1.5 max-h-[160px] overflow-y-auto">
                {history.map((h) => (
                  <div
                    key={h.id}
                    onClick={() => speakIndonesian(h.text)}
                    className="p-2.5 rounded-xl bg-[#F8F9FD] hover:bg-violet-50 border border-[#E2E8F0] text-xs flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <span className="font-semibold text-[#1E1B4B] truncate pr-2">&ldquo;{h.text}&rdquo;</span>
                    <span className="text-[0.65rem] text-[#64748B] shrink-0 flex items-center gap-1 font-medium">
                      <Volume2 size={12} className="text-violet-600" /> {h.time}
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
