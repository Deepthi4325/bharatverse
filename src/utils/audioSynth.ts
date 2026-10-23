// Audio Narrator helper and optional subtle chime

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a resonant temple bell chime tone (Ghungroo / Ghanta)
 */
export function playTempleBellChime(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 1.8);

    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 2.1);
  } catch (_) {}
}

/**
 * Text-to-Speech voice narrator helper for audio stories, monuments, and cultural legends
 */
export function speakNarrative(
  text: string,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: () => void
): { stop: () => void; isSpeaking: () => boolean } {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    onError?.();
    return { stop: () => {}, isSpeaking: () => false };
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.88; // Gentle, storytelling pace
  utterance.pitch = 1.0;

  const selectVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice =
      voices.find((v) => v.lang.includes("en-IN") || v.name.toLowerCase().includes("india")) ||
      voices.find((v) => v.lang.includes("en-GB")) ||
      voices[0];

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
  };

  if (window.speechSynthesis.getVoices().length > 0) {
    selectVoice();
  } else {
    window.speechSynthesis.onvoiceschanged = selectVoice;
  }

  utterance.onstart = () => onStart?.();
  utterance.onend = () => onEnd?.();
  utterance.onerror = () => {
    onEnd?.();
    onError?.();
  };

  window.speechSynthesis.speak(utterance);

  return {
    stop: () => {
      window.speechSynthesis.cancel();
      onEnd?.();
    },
    isSpeaking: () => window.speechSynthesis.speaking,
  };
}
