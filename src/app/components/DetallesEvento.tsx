'use client';

import { type Variants, motion } from 'framer-motion';
import Image from 'next/image';

export default function DetallesEvento() {
  // ✅ Cambia esto cuando lo necesites:
  const SHOW_VESTIMENTA = false; // <- ahora se verá SOLO regalos

  const VP = { once: true, amount: 0.35 };
  const ease = [0.22, 1, 0.36, 1] as const;

  const gold = 'text-[#e7c26a]';
  const shadowGold =
    '[text-shadow:0_0.25rem_1.6rem_rgba(0,0,0,0.95),0_0.1rem_0_rgba(0,0,0,0.9)]';
  const shadowWhite =
    '[text-shadow:0_0.2rem_1.1rem_rgba(0,0,0,0.95),0_0.1rem_0_rgba(0,0,0,0.9)]';

  const wrap: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.16, delayChildren: 0.08 } },
  };

  const titleV: Variants = {
    hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.05, ease } },
  };

  const fromLeft: Variants = {
    hidden: { opacity: 0, x: -40, filter: 'blur(10px)' },
    show: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 1.0, ease } },
  };

  const fromRight: Variants = {
    hidden: { opacity: 0, x: 40, filter: 'blur(10px)' },
    show: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 1.0, ease } },
  };

  return (
    <section className="px-6 sm:px-10 lg:px-16 py-14 sm:py-16 lg:py-20 flex items-center justify-center overflow-x-hidden">
      <div className="w-full max-w-3xl lg:max-w-5xl">
        <motion.div variants={wrap} initial="hidden" whileInView="show" viewport={VP} className="text-center">
          <motion.p
            variants={titleV}
            className={[
              'text-[4.2rem] md:text-[6rem] lg:text-[7.6rem]',
              'leading-[0.95] italic tracking-wide',
              gold,
              shadowGold,
              "font-['Hello']",
            ].join(' ')}
          >
            Detalles del evento
          </motion.p>
        </motion.div>

        <div className="mt-10 sm:mt-12 lg:mt-14 space-y-14 sm:space-y-16 lg:space-y-20">
          {/* ===== VESTIMENTA (OPCIONAL) ===== */}
          {SHOW_VESTIMENTA && (
            <motion.div
              variants={wrap}
              initial="hidden"
              whileInView="show"
              viewport={VP}
              className="grid items-center gap-6 sm:gap-8 md:grid-cols-[minmax(10rem,16rem),1fr]"
            >
              <motion.div variants={fromLeft} className="mx-auto md:mx-0">
                <Image
                  src="/imagenes/Vestimenta.png"
                  alt="Vestimenta"
                  width={520}
                  height={520}
                  className="h-auto w-[12rem] sm:w-[14rem] lg:w-[16rem]"
                  priority={false}
                />
              </motion.div>

              <div className="text-center md:text-left">
                <motion.p
                  variants={titleV}
                  className={[
                    'text-[2.4rem] sm:text-[3rem] lg:text-[3.8rem]',
                    gold,
                    shadowGold,
                    "font-['PlayFair_Italica']",
                  ].join(' ')}
                >
                  Vestimenta formal
                </motion.p>

                <motion.p
                  variants={fromRight}
                  className={[
                    'mt-3 text-[1.55rem] sm:text-[1.85rem] lg:text-[2.2rem]',
                    'text-white/95',
                    shadowWhite,
                    "font-['Lora']",
                  ].join(' ')}
                >
                  Colores rosa palo o melón reservados para la quinceañera
                </motion.p>
              </div>
            </motion.div>
          )}

          {/* ===== LLUVIA DE SOBRES ===== */}
          <motion.div
            variants={wrap}
            initial="hidden"
            whileInView="show"
            viewport={VP}
            className="grid items-center gap-6 sm:gap-8 md:grid-cols-[1fr,minmax(10rem,16rem)]"
          >
            <div className="text-center md:text-left md:order-1 order-2">
              <motion.p
                variants={titleV}
                className={['text-[4.1rem] sm:text-[4.5rem] lg:text-[6.1rem]', gold, shadowGold, "font-['Hello']"].join(' ')}
              >
                Sugerencia de regalos
              </motion.p>

              <motion.p
                variants={titleV}
                className={['mt-2 text-[2.2rem] sm:text-[2.8rem] lg:text-[3.6rem]', 'text-white', shadowWhite, "font-['PlayFair_Italica']"].join(' ')}
              >
                Lluvia de sobres
              </motion.p>

              <motion.p
                variants={fromLeft}
                className={['mt-3 text-[1.45rem] sm:text-[1.75rem] lg:text-[2.05rem]', 'text-white/95', shadowWhite, "font-['Lora']"].join(' ')}
              >
                Quiero ahorrarte tiempo y esfuerzo al elegir el regalo perfecto, si es tu elección obsequiarme algo
                puedes depositarlo en este sobre y entregarlo el día del evento.
              </motion.p>
            </div>

            <motion.div variants={fromRight} className="mx-auto md:mx-0 md:order-2 order-1">
              <Image
                src="/imagenes/Regalos.png"
                alt="Regalos y sobre"
                width={520}
                height={520}
                className="h-auto w-[12rem] sm:w-[14rem] lg:w-[16rem]"
                priority={false}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
