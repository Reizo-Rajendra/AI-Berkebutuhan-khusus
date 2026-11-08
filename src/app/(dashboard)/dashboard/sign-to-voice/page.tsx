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
  HelpCircle,
  HeartHandshake,
  HeartPulse,
} from "lucide-react";
import { speakIndonesian, stopSpeaking } from "@/lib/tts-speech";
import { convertGestureToSentence } from "@/actions/accessibility-ai-actions";

interface GestureItem {
  id: string;
  label: string;
  iconText: string;
  meaning: string;
  category: "Salam" | "Kebutuhan" | "Respon" | "Darurat";
}

const GESTURE_LIBRARY: GestureItem[] = [
  { id: "HALO", label: "Telapak Terbuka", iconText: "✋", meaning: "Halo / Salam", category: "Salam" },
  { id: "TERIMA_KASIH", label: "Tangan di Dada", iconText: "🙏", meaning: "Terima Kasih", category: "Salam" },
  { id: "TOLONG", label: "Tangan Melambai", iconText: "🙋", meaning: "Tolong Bantu Saya", category: "Kebutuhan" },
  { id: "SAYA_LAPAR", label: "Tangan di Perut", iconText: "🍽️", meaning: "Saya Lapar / Ingin Makan", category: "Kebutuhan" },
  { id: "BUTUH_MINUM", label: "Ibu Jari ke Mulut", iconText: "🥤", meaning: "Saya Butuh Air Minum", category: "Kebutuhan" },
  { id: "YA", label: "Jempol Naik", iconText: "👍", meaning: "Ya / Setuju", category: "Respon" },
  { id: "TIDAK", label: "Jempol Turun / Geleng", iconText: "👎", meaning: "Tidak / Kurang Cocok", category: "Respon" },
  { id: "MAAF", label: "Tangan Terkatup", iconText: "🙇", meaning: "Mohon Maaf", category: "Salam" },
  { id: "DARURAT", label: "Kedua Tangan Silang", iconText: "🚨", meaning: "Darurat / Butuh Dokter!", category: "Darurat" },
  { id: "SENANG_BERTEMU", label: "Dua Jari V-Peace", iconText: "✌️", meaning: "Senang Bertemu Anda", category: "Salam" },
];

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

  // ── Camera Control ───────────────────────────────────────────
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
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch (err: any) {
      setCameraError("Tidak dapat mengakses kamera. Pastikan izin kamera telah diberikan.");
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

  // ── Speech Generation (Sign to Voice) ────────────────────────
  const triggerVoiceForGesture = useCallback(async (gestureId: string) => {
    setDetectedGesture(gestureId);
    const result = await convertGestureToSentence(gestureId);
    setCurrentSentence(result.text);

    // Speak with AI voice
    setIsSpeaking(true);
    speakIndonesian(result.spokenText, () => setIsSpeaking(false));

    // Append to conversation history
    const now = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    setHistory((prev) => [{ id: Math.random().toString(), text: result.text, time: now }, ...prev.slice(0, 9)]);
  }, []);

  // ── Two-Way Partner Audio Recognition (Speech to Text) ───────
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

  return (
    <div className="flex flex-col gap-8 pb-16 max-w-7xl mx-auto">
      {/* ── Page Header ─────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-100 text-violet-800 dark:bg-violet-950/60 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
              <Hand size={14} /> TanganBicara AI
            </span>
            <span className="text-xs text-muted">Ramah Tunawicara & Tunarungu</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-primary">
            Penerjemah Bahasa Isyarat & Gerakan Tangan ke Suara
          </h1>
          <p className="text-secondary text-sm md:text-base mt-1 max-w-3xl">
            Ubah gerakan tangan dan bahasa isyarat secara langsung menjadi suara AI bahasa Indonesia yang ramah, 
            dilengkapi mode percakapan dua arah untuk mendengar dan merespon lawan bicara.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={cameraActive ? stopCamera : startCamera}
            className={`btn ${cameraActive ? "btn-secondary text-red-600 dark:text-red-400" : "btn-primary"} px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-semibold shadow-sm`}
          >
            {cameraActive ? <CameraOff size={16} /> : <Camera size={16} />}
            {cameraActive ? "Matikan Kamera" : "Nyalakan Kamera"}
          </button>
        </div>
      </div>

      {cameraError && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-sm flex items-center gap-3">
          <AlertCircle size={18} className="shrink-0" />
          <span>{cameraError}</span>
        </div>
      )}

      {/* ── Main Work Area (Two Columns) ────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Col: Camera & Live AI Voice Card (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Camera Viewport */}
          <div className="relative rounded-2xl overflow-hidden bg-surface border border-border shadow-sm aspect-[4/3] flex items-center justify-center">
            {cameraActive ? (
              <>
                <video
                  ref={videoRef}
                  playsInline
                  muted
                  className="w-full h-full object-cover transform -scale-x-100"
                />
                {/* Hand Detection Overlay Frame */}
                <div className="absolute inset-8 border-2 border-dashed border-violet-400/60 rounded-2xl pointer-events-none flex items-center justify-center">
                  <div className="bg-surface/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-primary border border-border flex items-center gap-2 shadow-sm">
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
                <div className="w-16 h-16 rounded-2xl bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 flex items-center justify-center border border-violet-100 dark:border-violet-900">
                  <Camera size={32} />
                </div>
                <div className="max-w-xs">
                  <h3 className="font-bold text-primary text-base">Kamera Sedang Nonaktif</h3>
                  <p className="text-xs text-secondary mt-1">
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
          <div className="p-6 rounded-2xl bg-surface border border-border shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                <Volume2 size={15} className="text-violet-600" /> Suara AI yang Dibunyikan
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyText}
                  className="btn btn-ghost btn-icon w-8 h-8 rounded-lg text-secondary hover:text-primary"
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

            <div className="p-5 rounded-xl bg-violet-50/60 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/60">
              <p className="text-xl md:text-2xl font-bold text-primary leading-relaxed">
                &ldquo;{currentSentence}&rdquo;
              </p>
              {isSpeaking && (
                <div className="flex items-center gap-2 mt-3 text-xs font-medium text-violet-700 dark:text-violet-300">
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
          <div className="p-6 rounded-2xl bg-surface border border-border shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-primary text-base">Kamus Isyarat Cepat (BISINDO)</h3>
                <p className="text-xs text-muted">Sentuh tombol untuk langsung membunyikan suara AI</p>
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
                        ? "bg-red-50 hover:bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-300 border-red-200 dark:border-red-900"
                        : "bg-surface hover:bg-surface-2 text-primary border-border hover:border-border-2"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-xl">{item.iconText}</span>
                      <span className={`text-[0.6875rem] px-1.5 py-0.5 rounded-full ${
                        isSelected ? "bg-white/20 text-white" : "bg-surface-2 text-muted"
                      }`}>
                        {item.category}
                      </span>
                    </div>
                    <span className="font-bold truncate mt-1">{item.meaning}</span>
                    <span className={`text-[0.6875rem] truncate ${isSelected ? "text-white/80" : "text-muted"}`}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Two-Way Conversation: Lawan Bicara (Speech-to-Text) */}
          <div className="p-6 rounded-2xl bg-surface border border-border shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-primary text-base flex items-center gap-2">
                  <MessageSquare size={16} className="text-violet-600" /> Respon Lawan Bicara
                </h3>
                <p className="text-xs text-muted">Ubah ucapan lawan bicara menjadi teks besar</p>
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

            <div className="p-4 rounded-xl bg-surface-2 border border-border min-h-[100px] flex flex-col justify-center">
              {partnerListening ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    Sedang mendengarkan lawan bicara berbicara...
                  </div>
                  <p className="text-base font-semibold text-primary">
                    {partnerTranscript || "Menunggu lawan bicara berbicara..."}
                  </p>
                </div>
              ) : partnerTranscript ? (
                <p className="text-base font-semibold text-primary">{partnerTranscript}</p>
              ) : (
                <p className="text-xs text-muted text-center">
                  Klik tombol <strong>&ldquo;Dengarkan&rdquo;</strong> lalu minta lawan bicara Anda berbicara di dekat mikrofon. Teks percakapan mereka akan tampil di sini.
                </p>
              )}
            </div>
          </div>

          {/* Conversation Log */}
          {history.length > 0 && (
            <div className="p-5 rounded-2xl bg-surface border border-border shadow-sm flex flex-col gap-3">
              <h4 className="font-bold text-primary text-xs uppercase tracking-wider text-muted">
                Riwayat Isyarat Terakhir
              </h4>
              <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto">
                {history.map((h) => (
                  <div
                    key={h.id}
                    onClick={() => speakIndonesian(h.text)}
                    className="p-2.5 rounded-lg bg-surface-2 hover:bg-violet-50 dark:hover:bg-violet-950/30 border border-border text-xs flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <span className="font-medium text-primary truncate pr-2">&ldquo;{h.text}&rdquo;</span>
                    <span className="text-[0.6875rem] text-muted shrink-0 flex items-center gap-1">
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
