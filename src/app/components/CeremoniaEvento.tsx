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

  // ✅ Mismos colores que el dorado más intenso
  const gold = 'text-[#FFBF2F]';
  const shadowGold =
    '[text-shadow:0_0.28rem_1.7rem_rgba(0,0,0,0.95),0_0.12rem_0_rgba(0,0,0,0.92),0_0_1.35rem_rgba(255,191,47,0.18)]';
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
    // ✅ mismo dorado intenso aplicado al botón
    'bg-gradient-to-b from-[#FFE39B] via-[#FFBF2F] to-[#C98C10]',
    'text-[#2a1a06]',
    'border border-[#FFE7B7]/70',
    'shadow-[0_1.1rem_2.8rem_rgba(0,0,0,0.55),inset_0_0.12rem_0_rgba(255,255,255,0.55)]',
    'hover:brightness-[1.06] hover:saturate-[1.05]',
    'active:scale-[0.99] active:brightness-[0.98] transition',
    // ✅ ring con el dorado intenso
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFBF2F]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/20',
    'transform-gpu',
  ].join(' ');

  // ✅ Links reales (Google Maps)
  const CEREMONIA_MAP = 'https://maps.app.goo.gl/To1GQnkJ3MnUU8h77';
  const EVENTO_MAP = 'https://maps.app.goo.gl/PjdQZWG3meXHzmZj7?g_st=iw';

  return (
    <section className="overflow-x-hidden px-6 sm:px-10 lg:px-16 pb-14 sm:pb-16 lg:pb-20 flex items-center justify-center">
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

        {/* EVENTO / RECEPCIÓN */}
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
            Recepción
          </motion.p>

          <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
            <motion.p
              variants={fromRight}
              className={`transform-gpu text-[2.4rem] md:text-[3.2rem] lg:text-[4.1rem] text-white ${shadowWhite} font-['PlayFair_Italica']`}
            >
              Salón Victoria, Coatepec
            </motion.p>

            <motion.p
              variants={fromLeft}
              className={`transform-gpu text-[2.2rem] md:text-[2.7rem] lg:text-[3.4rem] text-white/95 ${shadowWhite} font-['PlayFair_Italica']`}
            >
              2:00pm
            </motion.p>

            <motion.p
              variants={fromRight}
              className={`transform-gpu text-[2.0rem] md:text-[2.4rem] lg:text-[3.0rem] text-white/90 ${shadowWhite} font-['PlayFair_Italica']`}
            >
              Pedro Moreno #8
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
