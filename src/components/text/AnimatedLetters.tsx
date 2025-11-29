'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

type DelayMode = 'auto' | 'index' | 'perChar';

type AnimatedLettersProps = {
  text: string;
  effect: string; // "text--scaling", "text--enter", "text--karaoke", etc.
  as?: keyof JSX.IntrinsicElements;
  className?: string;

  // Viewport
  once?: boolean;
  threshold?: number; // 0 a 1
  rootMargin?: string;

  // Timing (segundos)
  delay?: number; // delay base
  step?: number; // retraso por letra (solo si perChar)
  duration?: number; // --char-duration (transitions)
  charStep?: number; // --char-step (keyframes/animaciones)
  delayMode?: DelayMode;

  // Layout
  wrap?: boolean; // permite salto de línea (NO usa &nbsp;)
  keepWords?: boolean; // ✅ evita que una palabra se rompa letra por letra

  // Para evitar que se vea fuera de pantalla (pero sin romper el inicio de transiciones)
  mountOnView?: boolean;
};

type CSSVars = React.CSSProperties & Record<string, string>;

const INDEX_BASED_EFFECTS = [
  'text--random',
  'text--enter',
  'text--fading',
  'text--flipping',
  'text--zipping',
  'text--scaling2',
  'text--blowing',
];

function resolveDelayMode(effect: string, mode: DelayMode) {
  if (mode !== 'auto') return mode;
  return INDEX_BASED_EFFECTS.some((k) => effect.includes(k)) ? 'index' : 'perChar';
}

type WordChar = { ch: string; i: number };

// Tokens para render “por palabra”
type Token =
  | { type: 'word'; chars: WordChar[]; key: string }
  | { type: 'space'; raw: string; key: string }
  | { type: 'br'; key: string };

export default function AnimatedLetters({
  text,
  effect,
  as = 'span',
  className = '',

  once = true,
  threshold = 0.35,
  rootMargin = '0px',

  delay = 0,
  step = 0.06,
  duration = 0.8,
  charStep = 0.5,
  delayMode = 'auto',

  wrap = false,
  keepWords = false,
  mountOnView = true,
}: AnimatedLettersProps) {
  const Tag = as as any;

  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  // Forzar transición: out -> in en 2 frames
  const [scrollState, setScrollState] = useState<'out' | 'in'>('out');
  const rafRef = useRef<number | null>(null);

  // Reiniciar keyframes al entrar (si once=false)
  const [runKey, setRunKey] = useState(0);

  const mode = resolveDelayMode(effect, delayMode);

  // Tokens (por char o por palabra)
  const tokens = useMemo<Token[]>(() => {
    const arr = Array.from(text);
    if (!keepWords) {
      // Modo simple: char por char
      return arr.map((ch, i) => {
        if (ch === '\n') return { type: 'br', key: `br-${i}` };
        if (/\s/.test(ch)) return { type: 'space', raw: ch, key: `sp-${i}` };
        return { type: 'word', chars: [{ ch, i }], key: `ch-${i}` };
      });
    }

    // Modo palabra: agrupa letras para que NO se parta una palabra
    const out: Token[] = [];
    let word: WordChar[] = [];

    const flush = (atIndex: number) => {
      if (word.length) {
        out.push({ type: 'word', chars: word, key: `w-${word[0]!.i}-${word[word.length - 1]!.i}` });
        word = [];
      }
      // atIndex solo para debug mental; no usado
      void atIndex;
    };

    for (let i = 0; i < arr.length; i++) {
      const ch = arr[i]!;
      if (ch === '\n') {
        flush(i);
        out.push({ type: 'br', key: `br-${i}` });
        continue;
      }

      // cualquier whitespace (espacio, tab, etc.)
      if (/\s/.test(ch)) {
        flush(i);
        out.push({ type: 'space', raw: ch, key: `sp-${i}` });
        continue;
      }

      word.push({ ch, i });
    }

    flush(arr.length);
    return out;
  }, [text, keepWords]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        const inside = entry.isIntersecting;
        setInView(inside);
        if (inside) setHasEntered(true);
      },
      { threshold, rootMargin },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);

  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    if (inView) {
      setScrollState('out');
      rafRef.current = requestAnimationFrame(() => setScrollState('in'));

      // Reinicia keyframes: si no es once, o si es la primera entrada real
      if (!once || !hasEntered) setRunKey((k) => k + 1);
      return;
    }

    if (!once) setScrollState('out');
  }, [inView, once, hasEntered]);

  const dataScroll = once ? (hasEntered ? scrollState : 'out') : scrollState;

  const wrapperVars: CSSVars = {
    '--char-duration': `${duration}s`,
    '--char-step': `${charStep}s`,
    '--char-delay': `${delay}s`,
  };

  const hiddenStyle: React.CSSProperties =
    mountOnView && !inView && !(once && hasEntered) ? { opacity: 0, pointerEvents: 'none' } : {};

  const renderChar = (ch: string, i: number) => {
    const isSpace = /\s/.test(ch);
    const vars: CSSVars = { '--char-index': String(i) };

    if (mode === 'perChar') {
      vars['--char-delay'] = `${delay + i * step}s`;
    }

    // OJO: si wrap=true, usamos espacio normal para permitir salto de línea
    const printed = isSpace ? (wrap ? ' ' : '\u00A0') : ch;

    return (
      <span key={`${ch}-${i}`} className="char" aria-hidden="true" data-char={ch} style={vars}>
        {printed}
      </span>
    );
  };

  return (
    <Tag
      ref={ref}
      key={runKey}
      className={`${effect} ${className}`}
      data-scroll={dataScroll}
      style={{ ...wrapperVars, ...hiddenStyle }}
      aria-label={text}
    >
      {tokens.map((t) => {
        if (t.type === 'br') return <br key={t.key} />;

        if (t.type === 'space') {
          // Si wrap=true, espacio normal para que el navegador rompa por palabra.
          // Si wrap=false, nbsp para mantener todo pegado.
          return (
            <span key={t.key} aria-hidden="true">
              {wrap ? ' ' : '\u00A0'}
            </span>
          );
        }

        // ✅ palabra completa como “bloque”: ya no se rompe letra por letra
        const isSingleChar = t.chars.length === 1 && !keepWords;
        if (isSingleChar) {
          const c = t.chars[0]!;
          return renderChar(c.ch, c.i);
        }

        return (
          <span key={t.key} className="inline-block align-baseline">
            {t.chars.map((c) => renderChar(c.ch, c.i))}
          </span>
        );
      })}
    </Tag>
  );
}
