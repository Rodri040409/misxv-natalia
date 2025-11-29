'use client';

import { type Variants, motion } from 'framer-motion';

export default function CeremoniaEvento() {
  const VP = { once: true, amount: 0.35 };

  const block = {
    hidden: {},
    show: { transition: { staggerChildren: 0.18, delayChildren: 0.08 } },
  } satisfies Variants;

  const titleV = {
    hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] },
    },
  } satisfies Variants;

  const fromRight = {
    hidden: { opacity: 0, x: 60, filter: 'blur(10px)' },
    show: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] },
    },
  } satisfies Variants;

  const fromLeft = {
    hidden: { opacity: 0, x: -60, filter: 'blur(10px)' },
    show: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] },
    },
  } satisfies Variants;

  const popBtn = {
    hidden: { opacity: 0, scale: 0.9, y: 10, filter: 'blur(8px)' },
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

  const btnClass = [
    'relative z-10',
    'inline-flex items-center justify-center',
    'mx-auto w-fit',
    'mt-2',
    'px-10 sm:px-12 py-4 sm:py-5',
    'rounded-full',
    'text-[2.0rem] sm:text-[2.3rem] lg:text-[2.8rem]',
    'tracking-[0.2em] uppercase',
    'font-semibold',
    'bg-gradient-to-b from-[#f3de9b] via-[#e7c26a] to-[#b8892f]',
    'text-[#2a1a06]',
    'border border-[#f7e7b7]/70',
    'shadow-[0_1.1rem_2.8rem_rgba(0,0,0,0.55),inset_0_0.12rem_0_rgba(255,255,255,0.55)]',
    'hover:brightness-[1.06] hover:saturate-[1.05]',
    'active:scale-[0.99] active:brightness-[0.98] transition',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7c26a]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/20',
    'transform-gpu', // ✅ evita glitches por transform
  ].join(' ');

  const CEREMONIA_MAP = '#';
  const EVENTO_MAP = '#';

  return (
    <section className="overflow-x-hidden px-6 sm:px-10 lg:px-16 pb-14 sm:pb-16 lg:pb-20 flex items-center justify-center">
      {/* ✅ clip para evitar overflow temporal por animaciones */}
      <div className="w-full max-w-3xl lg:max-w-5xl text-center [clip-path:inset(0)]">
        {/* FECHA */}
        <motion.div variants={block} initial="hidden" whileInView="show" viewport={VP} className="mt-10">
          <motion.p
            variants={titleV}
            className={[
              'text-[2.6rem] md:text-[3.4rem] lg:text-[4.2rem]',
              'leading-none italic tracking-wide',
              gold,
              shadowGold,
              "font-['PlayFair_Italica']",
              'transform-gpu',
            ].join(' ')}
          >
            Sábado 13 de diciembre
          </motion.p>
        </motion.div>

        {/* CEREMONIA */}
        <motion.div variants={block} initial="hidden" whileInView="show" viewport={VP} className="mt-10">
          <motion.p
            variants={titleV}
            className={[
              'text-[4.2rem] md:text-[6.2rem] lg:text-[8rem]',
              'leading-[0.95] italic tracking-wide',
              gold,
              shadowGold,
              "font-['Hello']",
              'transform-gpu',
            ].join(' ')}
          >
            Ceremonia
          </motion.p>

          <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
            <motion.p
              variants={fromRight}
              className={`transform-gpu text-[2.4rem] md:text-[3.2rem] lg:text-[4.1rem] text-white ${shadowWhite} font-['PlayFair_Italica']`}
            >
              Parroquia de San Jerónimo
            </motion.p>

            <motion.p
              variants={fromLeft}
              className={`transform-gpu text-[2.2rem] md:text-[2.7rem] lg:text-[3.4rem] text-white/95 ${shadowWhite} font-['PlayFair_Italica']`}
            >
              1:00pm
            </motion.p>

            <motion.a variants={popBtn} href={CEREMONIA_MAP} target="_blank" rel="noreferrer" className={btnClass}>
              UBICACIÓN
            </motion.a>
          </div>
        </motion.div>

        {/* Separador */}
        <div className="my-12 sm:my-14 lg:my-16 flex items-center justify-center">
          <span className="h-px w-[84%] sm:w-3/4 bg-white/30 [box-shadow:0_0.7rem_1.6rem_rgba(0,0,0,0.55)]" />
        </div>

        {/* EVENTO */}
        <motion.div variants={block} initial="hidden" whileInView="show" viewport={VP}>
          <motion.p
            variants={titleV}
            className={[
              'text-[4.2rem] md:text-[6.2rem] lg:text-[8rem]',
              'leading-[0.95] italic tracking-wide',
              gold,
              shadowGold,
              "font-['Hello']",
              'transform-gpu',
            ].join(' ')}
          >
            Evento
          </motion.p>

          <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
            <motion.p
              variants={fromRight}
              className={`transform-gpu text-[2.4rem] md:text-[3.2rem] lg:text-[4.1rem] text-white ${shadowWhite} font-['PlayFair_Italica']`}
            >
              Salón Victoria
            </motion.p>

            <motion.p
              variants={fromLeft}
              className={`transform-gpu text-[2.2rem] md:text-[2.7rem] lg:text-[3.4rem] text-white/95 ${shadowWhite} font-['PlayFair_Italica']`}
            >
              3:00pm
            </motion.p>

            <motion.a variants={popBtn} href={EVENTO_MAP} target="_blank" rel="noreferrer" className={btnClass}>
              UBICACIÓN
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
