'use client';

import Asistencia from './components/Asistencia';
import CeremoniaEvento from './components/CeremoniaEvento';
import CuentaRegresiva from './components/CuentaRegresiva';
import DetallesEvento from './components/DetallesEvento';
import Familiares from './components/Familiares';
import Hero from './components/Hero';

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col">
      {/* Fondo repetido (debajo de TODO) */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 pointer-events-none bg-repeat bg-left-top [background-size:320px] bg-[url('/imagenes/Patron_verde.jpg')]"
      />

      {/* ✅ Oscurecido global sutil (arriba del patrón, abajo del contenido) */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 pointer-events-none bg-black/25"
      />

      {/* (Opcional) viñeta suave para mejorar lectura sin “cajas” */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_35%,rgba(0,0,0,0.35)_100%)]"
      />

      <Hero />
      <Familiares />
      <CeremoniaEvento />
      <CuentaRegresiva />
      <DetallesEvento />
      <Asistencia />
    </main>
  );
}
