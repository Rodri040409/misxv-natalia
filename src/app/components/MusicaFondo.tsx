'use client';

import { useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'misxv_music_on';

export default function MusicaFondo() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Carga preferencia (si ya le dieron play antes)
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    const shouldPlay = saved === '1';
    setReady(true);

    if (shouldPlay) {
      // Intentar reproducir (puede fallar por políticas del navegador)
      setTimeout(() => {
        audioRef.current?.play()
          .then(() => setPlaying(true))
          .catch(() => {
            // Si lo bloquea, solo dejamos el botón para que el usuario lo active
            setPlaying(false);
            localStorage.setItem(STORAGE_KEY, '0');
          });
      }, 0);
    }
  }, []);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;

    try {
      if (a.paused) {
        await a.play();
        setPlaying(true);
        localStorage.setItem(STORAGE_KEY, '1');
      } else {
        a.pause();
        setPlaying(false);
        localStorage.setItem(STORAGE_KEY, '0');
      }
    } catch {
      // Si aún lo bloquea, no hacemos nada extra (el usuario tendrá que interactuar de nuevo)
      setPlaying(false);
      localStorage.setItem(STORAGE_KEY, '0');
    }
  };

  // Opcional: pausa si cambian de pestaña
  useEffect(() => {
    const onVis = () => {
      const a = audioRef.current;
      if (!a) return;
      if (document.hidden && !a.paused) {
        a.pause();
        setPlaying(false);
        localStorage.setItem(STORAGE_KEY, '0');
      }
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  if (!ready) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src="/audios/ariana.mp3"
        loop
        preload="auto"
      />

      {/* Botón flotante */}
      <button
        type="button"
        onClick={toggle}
        className={[
          'fixed z-[999] bottom-6 right-6',
          'rounded-full px-5 py-3',
          'border border-[#f7e7b7]/60',
          'bg-black/35 backdrop-blur-md',
          'shadow-[0_1.1rem_2.8rem_rgba(0,0,0,0.55)]',
          'text-[#e7c26a] tracking-[0.18em] uppercase font-semibold',
          'hover:brightness-110 active:scale-[0.99] transition',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7c26a]/70',
        ].join(' ')}
        aria-label={playing ? 'Pausar música' : 'Reproducir música'}
      >
        {playing ? 'PAUSAR ♪' : 'MÚSICA ♪'}
      </button>
    </>
  );
}
