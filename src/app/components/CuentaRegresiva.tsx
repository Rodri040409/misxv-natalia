'use client';

import { type Variants,motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

type Parts = { days: number; hours: number; minutes: number; seconds: number; done: boolean };

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

function diffParts(targetMs: number): Parts {
  const now = Date.now();
  const d = targetMs - now;
  if (d <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };

  const sec = Math.floor(d / 1000);
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = sec % 60;

  return { days, hours, minutes, seconds, done: false };
}

export default function CuentaRegresiva() {
  // ✅ Pon tu fecha real
  const EVENT_DATE_ISO = '2025-12-13T13:00:00-06:00';

  const targetMs = useMemo(() => new Date(EVENT_DATE_ISO).getTime(), [EVENT_DATE_ISO]);

  // ✅ Importante: estado inicial fijo para SSR (placeholder)
  const [mounted, setMounted] = useState(false);
  const [t, setT] = useState<Parts>({ days: 0, hours: 0, minutes: 0, seconds: 0, done: false });

  useEffect(() => {
    setMounted(true);
    setT(diffParts(targetMs));

    const id = setInterval(() => setT(diffParts(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  const VP = { once: true, amount: 0.35 };

  const wrapV = {
    hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] },
    },
  } satisfies Variants;

  const boxV = {
    hidden: { opacity: 0, scale: 0.98, y: 8 },
    show: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.12 + i * 0.06 },
    }),
  } satisfies Variants;

  const CFG = {
    width: 'w-[min(92vw,46rem)] sm:w-[min(78vw,54rem)] lg:w-[min(70vw,62rem)]',
    inset:
      'top-[5.2rem] right-[3.2rem] bottom-[5.2rem] left-[3.2rem] ' +
      'sm:top-[6.2rem] sm:right-[4.2rem] sm:bottom-[6.2rem] sm:left-[4.2rem] ' +
      'lg:top-[7.2rem] lg:right-[5.2rem] lg:bottom-[7.2rem] lg:left-[5.2rem]',
    gold: 'text-[#e7c26a]',
    shadowGold:
      '[text-shadow:0_0.25rem_1.6rem_rgba(0,0,0,0.95),0_0.1rem_0_rgba(0,0,0,0.9)]',
    shadowWhite:
      '[text-shadow:0_0.2rem_1.1rem_rgba(0,0,0,0.95),0_0.1rem_0_rgba(0,0,0,0.9)]',
  };

  // ✅ Mientras NO esté montado, mostramos placeholders estables (SSR-safe)
  const items = [
    { label: 'DÍAS', value: mounted ? String(t.days) : '—' },
    { label: 'HRS', value: mounted ? pad2(t.hours) : '—' },
    { label: 'MIN', value: mounted ? pad2(t.minutes) : '—' },
    { label: 'SEG', value: mounted ? pad2(t.seconds) : '—' },
  ];

  return (
    <section className="px-6 sm:px-10 lg:px-16 py-14 sm:py-16 lg:py-20 flex items-center justify-center">
      <motion.div
        variants={wrapV}
        initial="hidden"
        whileInView="show"
        viewport={VP}
        className="relative w-full flex justify-center"
      >
        <Image
          src="/imagenes/Contador.png"
          alt="Marco contador"
          width={900}
          height={1600}
          className={`h-auto ${CFG.width}`}
        />

        <div className={`absolute ${CFG.inset} flex items-center justify-center`}>
          <div className="w-full max-w-[24rem] sm:max-w-[37rem] text-center">
            <p
              className={[
                'text-[3.2rem] sm:text-[4rem] lg:text-[5rem]',
                'leading-none italic tracking-wide',
                CFG.gold,
                CFG.shadowGold,
                "font-['Hello']",
              ].join(' ')}
            >
              Cuenta regresiva
            </p>

            <div className="mt-8 sm:mt-10 grid grid-cols-4 gap-3 sm:gap-4">
              {items.map((it, i) => (
                <motion.div
                  key={it.label}
                  custom={i}
                  variants={boxV}
                  initial="hidden"
                  animate="show"
                  className={[
                    'rounded-[1.2rem]',
                    'border border-[#f7e7b7]/35',
                    'bg-black/25 backdrop-blur-sm',
                    'px-3 py-4 sm:px-4 sm:py-5',
                    'shadow-[0_1.2rem_3.2rem_rgba(0,0,0,0.55)]',
                  ].join(' ')}
                >
                  <p
                    suppressHydrationWarning
                    className={[
                      'text-[2.4rem] sm:text-[3rem] lg:text-[3.6rem]',
                      'text-white',
                      CFG.shadowWhite,
                      "font-['PlayFair_Italica']",
                    ].join(' ')}
                  >
                    {it.value}
                  </p>

                  <p
                    className={[
                      'mt-1 text-[1.05rem] sm:text-[1.15rem] lg:text-[1.25rem]',
                      'tracking-[0.22em] uppercase',
                      CFG.gold,
                      CFG.shadowGold,
                    ].join(' ')}
                  >
                    {it.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {mounted && t.done && (
              <p className={['mt-8 text-[1.6rem] sm:text-[2rem] lg:text-[2.3rem]', 'text-white', CFG.shadowWhite, "font-['PlayFair_Italica']"].join(' ')}>
                ¡Ya comenzó!
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
