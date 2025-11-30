'use client';

import { type Variants, motion } from 'framer-motion';
import { useMemo, useState } from 'react';

export default function Asistencia() {
  const DATE_LABEL = 'sábado 13 de diciembre';
  const PHONE_INTL = '522283213092'; // 52 + 2285062080

  const [answer, setAnswer] = useState<'si' | 'no'>('si');

  const msg = useMemo(() => {
    const tail = 'Soy _____.';
    return answer === 'si'
      ? `Confirmo mi asistencia el día ${DATE_LABEL}.\n${tail}`
      : `No podré asistir el día ${DATE_LABEL}.\n${tail}`;
  }, [answer, DATE_LABEL]);

  const waHref = useMemo(
    () => `https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(msg)}`,
    [msg]
  );

  const VP = { once: true, amount: 0.35 };

  const wrapV = {
    hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
    },
  } satisfies Variants;

  const popV = {
    hidden: { opacity: 0, scale: 0.985, y: 10, filter: 'blur(8px)' },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1] },
    },
  } satisfies Variants;

  const gold = 'text-[#e7c26a]';
  const shadowGold =
    '[text-shadow:0_0.25rem_1.6rem_rgba(0,0,0,0.95),0_0.1rem_0_rgba(0,0,0,0.9)]';
  const shadowWhite =
    '[text-shadow:0_0.2rem_1.1rem_rgba(0,0,0,0.95),0_0.1rem_0_rgba(0,0,0,0.9)]';

  // ✅ Botón dorado (sin clamp)
  const btnGold = [
    'inline-flex items-center justify-center',
    'px-9 sm:px-11 py-3 sm:py-3.5',
    'rounded-full',
    'text-[1.2rem] sm:text-[1.5rem] md:text-[1.75rem] lg:text-[2.05rem]',
    'tracking-[0.28em] uppercase font-semibold',
    'bg-gradient-to-b from-[#f3de9b] via-[#e7c26a] to-[#b8892f]',
    'text-[#2a1a06]',
    'border border-[#f7e7b7]/70',
    'shadow-[0_1.1rem_2.8rem_rgba(0,0,0,0.55),inset_0_0.12rem_0_rgba(255,255,255,0.55)]',
    'hover:brightness-[1.06] hover:saturate-[1.05]',
    'active:scale-[0.99] active:brightness-[0.98] transition',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7c26a]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/20',
    'select-none whitespace-nowrap',
  ].join(' ');

  // ✅ Choices (sin clamp)
  const choiceBase = [
    'rounded-full border',
    'px-7 sm:px-12 py-2.5 sm:py-4',
    'text-[1.1rem] sm:text-[1.35rem] md:text-[1.6rem] lg:text-[1.8rem]',
    'tracking-wide',
    shadowWhite,
    'transition select-none',
  ].join(' ');

  const choiceOn = 'bg-white/10 border-[#f7e7b7]/55 text-white';
  const choiceOff = 'bg-black/0 border-white/25 text-white/85 hover:bg-white/5';

  return (
    <section className="px-0 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20 flex justify-center overflow-x-hidden">
      <motion.div
        variants={wrapV}
        initial="hidden"
        whileInView="show"
        viewport={VP}
        className={[
          'relative w-[min(100vw,90rem)]',

          // ====== PERILLAS (AJUSTA AQUÍ) ======
          '[--c-top:8%] [--c-left:10%] [--c-right:10%] [--c-bottom:36%]',
          'sm:[--c-bottom:26%]',

          // botón enviar (mobile más abajo para no tapar opciones)
          '[--s-right:6%] [--s-bottom:14%]',
          'sm:[--s-right:15%] sm:[--s-bottom:30%]',
          // ====================================
        ].join(' ')}
      >
        <img
          src="/imagenes/Asistencia.png"
          alt="Marco asistencia"
          loading="lazy"
          decoding="async"
          className="block w-full h-auto"
        />

        {/* Contenido centrado */}
        <div
          className="absolute"
          style={{
            top: 'var(--c-top)',
            left: 'var(--c-left)',
            right: 'var(--c-right)',
            bottom: 'var(--c-bottom)',
          }}
        >
          <motion.div
            variants={popV}
            className="h-full w-full flex flex-col items-center justify-center text-center"
          >
            <p
              className={[
                'text-[3.3rem] mt-[2rem] sm:mt-[0rem] md:text-[4rem] lg:text-[4.8rem]',
                'leading-none italic tracking-wide',
                gold,
                shadowGold,
                "font-['Hello']",
              ].join(' ')}
            >
              Confirmar asistencia
            </p>

            <p
              className={[
                'mt-2',
                'text-[1.3rem] sm:text-[1.25rem] md:text-[1.45rem] lg:text-[1.7rem]',
                'text-white/95',
                shadowWhite,
                "font-['PlayFair_Italica']",
              ].join(' ')}
            >
              ¿Nos acompañas el día {DATE_LABEL}?
            </p>

            <div className="mt-6 flex items-center justify-center gap-3 sm:gap-6">
              <button
                type="button"
                onClick={() => setAnswer('si')}
                aria-pressed={answer === 'si'}
                className={`${choiceBase} ${answer === 'si' ? choiceOn : choiceOff}`}
              >
                Sí
              </button>

              <button
                type="button"
                onClick={() => setAnswer('no')}
                aria-pressed={answer === 'no'}
                className={`${choiceBase} ${answer === 'no' ? choiceOn : choiceOff}`}
              >
                No
              </button>
            </div>
          </motion.div>
        </div>

        {/* Botón ENVIAR (bottom-right) */}
        <div
          className="absolute"
          style={{
            right: 'var(--s-right)',
            bottom: 'var(--s-bottom)',
          }}
        >
          <a href={waHref} target="_blank" rel="noreferrer" className={btnGold}>
            ENVIAR
          </a>
        </div>
      </motion.div>
    </section>
  );
}
