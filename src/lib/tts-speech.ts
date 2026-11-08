"use client";

/**
 * POLANITAS Inklusif AI — Text-to-Speech (TTS) Engine
 * Memanfaatkan browser Web Speech API native tanpa dependensi eksternal.
 * Ringan, bebas kuota, instan, dan mendukung Bahasa Indonesia (id-ID).
 */

export function speakIndonesian(text: string, onEnd?: () => void) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    console.warn("SpeechSynthesis tidak didukung pada browser ini.");
    onEnd?.();
    return;
  }

  // Hentikan suara yang sedang berbunyi agar tidak bertumpuk
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "id-ID";
  utterance.rate = 1.0;
  utterance.pitch = 1.0;

  // Cari voice Bahasa Indonesia terbaik jika tersedia di sistem OS pengguna
  const voices = window.speechSynthesis.getVoices();
  const indonesianVoice = voices.find(
    (v) => v.lang === "id-ID" || v.lang.startsWith("id")
  );
  if (indonesianVoice) {
    utterance.voice = indonesianVoice;
  }

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = () => onEnd();
  }

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}
