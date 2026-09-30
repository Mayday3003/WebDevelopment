import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 py-24">
      <span className="text-xs uppercase tracking-widest font-code text-[var(--acero)]">Error 404</span>
      <h1 className="text-6xl sm:text-7xl font-normal text-[var(--crema-suave)]">Coordenada Perdida</h1>
      <p className="text-sm text-[var(--beige)] max-w-md leading-relaxed">
        El recuerdo o la página que buscas no existe en este sector de la galaxia.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-2xl bg-[var(--azul-acento)] hover:bg-[var(--azul-hover)] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-lg hover:shadow-[var(--azul-glow)]"
      >
        Regresar al Inicio
      </Link>
    </div>
  );
}
