'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import AnimatedLetters from '@/components/text/AnimatedLetters';

export default function Hero() {
  const CFG = {
    viewportAmount: 0.35,
    once: true,

    fadeDuration: 2,
    itemDuration: 2,
    stagger: 0.18,

    yIn: 22,
    scaleIn: 0.985,

    ease: [0.22, 1, 0.36, 1] as const,

    ringWidth: 'w-[min(86vw,52rem)] sm:w-[min(75vw,64rem)]',
    sepWidth: 'w-[min(92vw,76rem)]',

    misSize: 'text-[6.2rem] sm:text-[6.8rem] md:text-[10.4rem] lg:text-[15.8rem]',
    xvSize: 'text-[11.4rem] sm:text-[12.6rem] md:text-[15.8rem] lg:text-[20.6rem]',
    misXvScale: 'scale-[1.18] sm:scale-[1.12] md:scale-[1.06] lg:scale-[1]',
    misXvLift: '-translate-y-[6%]',

    nameSize: 'text-[7.2rem] sm:text-[7.8rem] md:text-[10.4rem] lg:text-[15rem]',

    padX: 'px-[0.4rem]',
    pt: 'pt-[1rem] sm:pt-[1.4rem]',
    pb: 'pb-[0.6rem] sm:pb-[1rem]',
    mtBlock: 'mt-[0.5rem] sm:mt-[0.6rem]',
    gap: 'gap-[0.15rem] sm:gap-[0.2rem]',

    ringBorder: 'border-[0.2rem] border-white/95',
    textShadow: 'drop-shadow-[0_0.4rem_1.8rem_rgba(0,0,0,0.60)]',

    sep2Lift: '-mt-[3rem]',

    // ✅ Mis / XV (scaling)
    charStagger: 0.06,
    charDuration: 0.8, // --char-step
    misDelay: 1.0,
    xvDelay: 1.22,

    // ✅ Natalia (otro efecto)
    nameText: 'Natalia',
    nameFont: "font-['PlayFair_Italica']",
    nameEffect: 'text--turning',
    nameDelayMode: 'perChar' as const,
    nameDelay: 1.85,
    nameStep: 0.06,
    nameCharStep: 0.7,

    // ✅ Recuadro (imagen + zona segura + karaoke)
    recuadroWidth: 'w-[min(96vw,88rem)]',
    recuadroMt: 'mt-[1.2rem] sm:mt-[1.6rem]',

    // ⚠️ AJUSTA AQUÍ: zona segura EXACTA (márgenes dentro del marco)
    // Sube estos valores si el texto se acerca al borde.
    recuadroInset:
      'top-[2.8rem] right-[3.2rem] bottom-[2.8rem] left-[3.2rem] ' +
      'sm:top-[3.3rem] sm:right-[4.2rem] sm:bottom-[3.3rem] sm:left-[4.2rem] ' +
      'md:top-[3.8rem] md:right-[5.2rem] md:bottom-[3.8rem] md:left-[5.2rem] ' +
      'lg:top-[4.2rem] lg:right-[6.0rem] lg:bottom-[4.2rem] lg:left-[6.0rem]',

    recuadroTextSize: 'text-[1.8rem] sm:text-[1.8rem] md:text-[2.8rem] lg:text-[2.7rem]',
    recuadroTextColor: 'text-white/95',
    recuadroFont: "font-['PlayFair_Italica']",

    // ✅ Le da contraste premium (se lee MUY bien en rojo)
    recuadroTextShadow:
      '[text-shadow:0_0.25rem_1.2rem_rgba(0,0,0,0.95),0_0.12rem_0_rgba(0,0,0,0.85)]',

    // Karaoke settings
    recuadroEffect: 'text--karaoke',
    recuadroDelay: 0.55,     // arranca después de Mis/XV y Natalia (ajusta a gusto)
    recuadroStep: 0.012,     // separación entre letras
    recuadroCharStep: 0.08,  // velocidad del “relleno karaoke”
    recuadroMaxW: 'max-w-[70rem]',

    recuadroText:
      'Gracias a Dios tengo una madre a la que amo por darme la vida, y con orgullo de ser su hija hoy dejo de ser su niñita consentida, y paso a ser su princesa querida.',
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: CFG.fadeDuration,
        ease: CFG.ease,
        staggerChildren: CFG.stagger,
        delayChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: CFG.yIn, scale: CFG.scaleIn, filter: 'blur(6px)' },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: CFG.itemDuration, ease: CFG.ease },
    },
  };

  const heroRing = {
    hidden: { opacity: 0, y: CFG.yIn + 6, scale: 0.975, rotate: -0.6, filter: 'blur(8px)' },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      filter: 'blur(0px)',
      transition: { duration: CFG.itemDuration + 0.15, ease: CFG.ease },
    },
  };

  const innerText = {
    hidden: { opacity: 0, y: 10, scale: 0.98, filter: 'blur(8px)' },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: CFG.itemDuration, ease: CFG.ease, delay: 0.08 },
    },
  };

  return (
    <header className={`relative ${CFG.padX} ${CFG.pt} ${CFG.pb} text-white`}>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: CFG.once, amount: CFG.viewportAmount }}
        className="mx-auto max-w-5xl flex flex-col items-center text-center"
      >
        <motion.div variants={heroRing} className="relative w-full flex justify-center">
          <Image
            src="/imagenes/MisXV.png"
            alt="Marco circular"
            width={1400}
            height={1400}
            priority
            className={`h-auto ${CFG.ringWidth} rounded-[2rem] ${CFG.ringBorder}`}
          />

          <motion.div variants={innerText} className="absolute inset-0 flex items-center justify-center overflow-visible">
            <div className={`${CFG.misXvLift} ${CFG.misXvScale} text-center font-serif ${CFG.textShadow}`}>
              <AnimatedLetters
                as="div"
                text="Mis"
                effect="text--scaling"
                className={`!overflow-visible leading-none ${CFG.misSize}`}
                once={CFG.once}
                threshold={CFG.viewportAmount}
                charStep={CFG.charDuration}
                delay={CFG.misDelay}
                step={CFG.charStagger}
                delayMode="perChar"
              />

              <AnimatedLetters
                as="div"
                text="XV"
                effect="text--scaling"
                className={`!overflow-visible leading-[0.86] tracking-[0.12em] ${CFG.xvSize}`}
                once={CFG.once}
                threshold={CFG.viewportAmount}
                charStep={CFG.charDuration}
                delay={CFG.xvDelay}
                step={CFG.charStagger}
                delayMode="perChar"
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={item} className={`${CFG.mtBlock} w-full flex flex-col items-center ${CFG.gap}`}>
          {/* Separador 1 volteado */}
          <motion.div variants={item} className="w-full flex justify-center">
            <Image
              src="/imagenes/Separador.png"
              alt=""
              width={1600}
              height={260}
              className={`h-auto ${CFG.sepWidth} mx-auto scale-y-[-1]`}
            />
          </motion.div>

          {/* Natalia con efecto por letras */}
          <AnimatedLetters
            as="h1"
            text={CFG.nameText}
            effect={CFG.nameEffect}
            className={`leading-none font-bold tracking-wide ${CFG.nameSize} ${CFG.textShadow} ${CFG.nameFont} !overflow-visible`}
            once={CFG.once}
            threshold={CFG.viewportAmount}
            delay={CFG.nameDelay}
            step={CFG.nameStep}
            charStep={CFG.nameCharStep}
            delayMode={CFG.nameDelayMode}
          />

          {/* Separador 2 */}
          <motion.div variants={item} className={`${CFG.sep2Lift} w-full flex justify-center`}>
            <Image
              src="/imagenes/Separador.png"
              alt=""
              width={1600}
              height={260}
              className={`h-auto ${CFG.sepWidth} mx-auto`}
            />
          </motion.div>

          {/* ✅ Recuadro con karaoke + márgenes precisos */}
          <motion.div variants={item} className={`${CFG.recuadroMt} w-full flex justify-center`}>
            <div className="relative w-full flex justify-center">
              <Image
                src="/imagenes/Recuadro.png"
                alt="Recuadro"
                width={1800}
                height={520}
                className={`h-auto ${CFG.recuadroWidth} mx-auto`}
              />

              {/* Zona segura exacta (modificable en CFG.recuadroInset) */}
              <div className={`absolute ${CFG.recuadroInset} flex items-center justify-center`}>
                <AnimatedLetters
                  as="p"
                  text={CFG.recuadroText}
                  effect={CFG.recuadroEffect}
                  className={[
                    CFG.recuadroFont,
                    CFG.recuadroTextColor,
                    CFG.recuadroTextSize,
                    CFG.recuadroTextShadow,
                    CFG.recuadroMaxW,
                    'text-center leading-tight',
                    'w-full',
                    '!overflow-visible !whitespace-normal !break-words',
                  ].join(' ')}
                  once={CFG.once}
                  threshold={CFG.viewportAmount}
                  delay={CFG.recuadroDelay}
                  step={CFG.recuadroStep}
                  charStep={CFG.recuadroCharStep}
                  delayMode="perChar"
                  wrap
                  keepWords
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </header>
  );
}
