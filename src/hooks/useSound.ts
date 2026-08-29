import { useCallback, useEffect, useRef } from "react";
import { storage } from "../utils/storage";

interface MusicHandle {
  osc: OscillatorNode;
  gain: GainNode;
}

export function useSound() {
  const ctxRef = useRef<AudioContext | null>(null);
  const musicRef = useRef<MusicHandle | null>(null);

  const ensureCtx = useCallback(() => {
    if (!ctxRef.current) {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
      ctxRef.current = new Ctx();
    }
    if (ctxRef.current.state === "suspended") ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const blip = useCallback(
    (freq: number, dur: number, type: OscillatorType, vol: number) => {
      if (!storage.getAll().soundEnabled) return;
      try {
        const ctx = ensureCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(vol, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
        osc.connect(gain).connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + dur);
      } catch {
        /* audio not available */
      }
    },
    [ensureCtx]
  );

  const click = useCallback(() => blip(520, 0.08, "triangle", 0.15), [blip]);
  const move = useCallback(() => blip(340, 0.18, "sine", 0.18), [blip]);
  const blocked = useCallback(() => blip(140, 0.22, "sawtooth", 0.16), [blip]);
  const coin = useCallback(() => {
    blip(880, 0.12, "square", 0.12);
    setTimeout(() => blip(1320, 0.14, "square", 0.1), 70);
  }, [blip]);
  const complete = useCallback(() => {
    [523, 659, 784, 1047].forEach((f, i) =>
      setTimeout(() => blip(f, 0.3, "triangle", 0.18), i * 90)
    );
  }, [blip]);

  const startMusic = useCallback(() => {
    if (!storage.getAll().musicEnabled) return;
    if (musicRef.current) return;
    try {
      const ctx = ensureCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 110;
      gain.gain.value = 0.015;
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      musicRef.current = { osc, gain };
    } catch {
      /* audio not available */
    }
  }, [ensureCtx]);

  const stopMusic = useCallback(() => {
    if (musicRef.current) {
      try {
        musicRef.current.osc.stop();
      } catch {
        /* already stopped */
      }
      musicRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => stopMusic();
  }, [stopMusic]);

  return { ensureCtx, click, move, blocked, coin, complete, startMusic, stopMusic };
}
