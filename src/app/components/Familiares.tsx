'use client';

import { type Variants, motion } from 'framer-motion';

export default function Familiares() {
  const VP = { once: true, amount: 0.35 };
  const ease = [0.22, 1, 0.36, 1] as const;

  const titleV: Variants = {
    hidden: { opacity: 0, y: 18, filter: 'blur(8px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.1, ease },
    },
  };

  const fromRight: Variants = {
    hidden: { opacity: 0, x: 70, filter: 'blur(10px)' },
    show: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.15, ease },
    },
  };

  const fromLeft: Variants = {
    hidden: { opacity: 0, x: -70, filter: 'blur(10px)' },
    show: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.15, ease },
    },
  };

  const pop: Variants = {
    hidden: { opacity: 1, scale: 0 },
    show: {
      opacity: 1,
      scale: [0, 1.35, 1] as number[],
      transition: {
        duration: 0.55,
        times: [0, 0.7, 1],
        ease: [0.25, 1.5, 0.5, 1] as const,
      },
    },
  };

  const block: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.18, delayChildren: 0.12 } },
  };

  // ✅ Dorado más intenso (más brillante/saturado) sin romper el estilo
  const accent = 'text-[#FFBF2F]';
  const shadowAccent =
    '[text-shadow:0_0.28rem_1.7rem_rgba(0,0,0,0.95),0_0.12rem_0_rgba(0,0,0,0.92),0_0_1.35rem_rgba(255,191,47,0.18)]';

  const shadowWhite =
    '[text-shadow:0_0.2rem_1.1rem_rgba(0,0,0,0.95),0_0.1rem_0_rgba(0,0,0,0.9)]';

  return (
    <main className="relative overflow-x-hidden px-6 sm:px-10 lg:px-16 py-12 sm:py-14 lg:py-16 flex items-center justify-center">
      <section className="relative w-full max-w-3xl lg:max-w-5xl text-center [clip-path:inset(0)]">
        {/* ===== PADRES ===== */}
        <motion.div variants={block} initial="hidden" whileInView="show" viewport={VP}>
          <motion.p
            variants={titleV}
            className={[
              'text-[4.2rem] md:text-[6.2rem] lg:text-[8.2rem]',
              'leading-[0.95] italic tracking-wide',
              accent,
              shadowAccent,
              "font-['Hello']",
              'transform-gpu',
            ].join(' ')}
          >
            En compañía de mi madre
          </motion.p>

          <div className="mt-7 sm:mt-8 lg:mt-10 space-y-3 sm:space-y-4 lg:space-y-5">
            <motion.p
              variants={fromRight}
              className={[
                'text-[3rem] md:text-[3.8rem] lg:text-[4.35rem]',
                'text-white',
                shadowWhite,
                "font-['PlayFair_Italica']",
                'transform-gpu',
              ].join(' ')}
            >
              Elssa Patricia Domínguez Polanco
            </motion.p>

            {/* (Tu bloque comentado se queda igual) */}
          </div>
        </motion.div>

        {/* Separador */}
        <div className="my-10 sm:my-12 lg:my-14 flex items-center justify-center">
          <span className="h-px w-[84%] sm:w-3/4 bg-white/30 [box-shadow:0_0.7rem_1.6rem_rgba(0,0,0,0.55)]" />
        </div>

        {/* ===== PADRINOS ===== */}
        <motion.div variants={block} initial="hidden" whileInView="show" viewport={VP}>
          <motion.p
            variants={titleV}
            className={[
              'text-[4.2rem] md:text-[6.2rem] lg:text-[8.2rem]',
              'leading-[0.95] italic tracking-wide',
              accent,
              shadowAccent,
              "font-['Hello']",
              'transform-gpu',
            ].join(' ')}
          >
            Mis padrinos
          </motion.p>

          <div className="mt-7 sm:mt-8 lg:mt-10 space-y-3 sm:space-y-4 lg:space-y-5">
            <motion.p
              variants={fromRight}
              className={[
                'text-[3rem] md:text-[3.8rem] lg:text-[4.35rem]',
                'text-white',
                shadowWhite,
                "font-['PlayFair_Italica']",
                'transform-gpu',
              ].join(' ')}
            >
              Irving Flores Polanco
            </motion.p>

            <motion.p
              variants={pop}
              className={[
                'text-[3.25rem] md:text-[3.55rem] lg:text-[4.05rem]',
                'italic text-white/95',
                shadowWhite,
                "font-['PlayFair_Italica']",
                'inline-block transform-gpu',
              ].join(' ')}
            >
              y
            </motion.p>

            <motion.p
              variants={fromLeft}
              className={[
                'text-[3rem] md:text-[3.8rem] lg:text-[4.35rem]',
                'text-white',
                shadowWhite,
                "font-['PlayFair_Italica']",
                'transform-gpu',
              ].join(' ')}
            >
              Nancy Aidee Domínguez Sánchez
            </motion.p>
          </div>
        </motion.div>

        {/* Cierre */}
        <motion.p
          initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { duration: 1.1, ease, delay: 0.15 },
          }}
          viewport={VP}
          className={[
            'mt-12 sm:mt-14 lg:mt-16',
            'text-[1.7rem] md:text-[2.4rem] lg:text-[3.05rem]',
            'text-white/95',
            shadowWhite,
            "font-['Lora']",
            'transform-gpu',
          ].join(' ')}
        >
          Los esperamos para celebrar juntos
        </motion.p>

        <picture>
          <source srcSet="/imagenes/Separador.avif" type="image/avif" />
          <source srcSet="/imagenes/Separador.webp" type="image/webp" />
          <img src="/imagenes/Separador.png" alt="Separador" loading="lazy" decoding="async" />
        </picture>
      </section>
    </main>
  );
}
