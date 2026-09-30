import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-20 py-8">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[70vh]">
        <div className="lg:col-span-7 space-y-6">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[var(--acero)]">
            Bitácora de expedición & física
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] text-[var(--crema-suave)]">
            Lo que amo <em className="font-serif-italic font-normal text-[var(--acero)]">(con los que amo)</em>
          </h1>
          <p className="text-lg text-[var(--beige)] max-w-xl leading-relaxed">
            Un espacio cósmico donde documento mis intereses en astrofísica, proyectos de investigación universitaria y memorias compartidas con personas importantes.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/muro"
              className="px-6 py-3.5 rounded-2xl bg-[var(--azul-acento)] hover:bg-[var(--azul-hover)] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-lg hover:shadow-[var(--azul-glow)]"
            >
              Explorar Recuerdos
            </Link>
            <Link
              href="/proyectos"
              className="px-6 py-3.5 rounded-2xl border border-[var(--linea-fuerte)] hover:border-[var(--azul-acento)] text-[var(--crema-suave)] text-xs font-semibold uppercase tracking-wider transition-all hover:bg-white/5"
            >
              Ver Proyectos
            </Link>
          </div>
        </div>

        {/* Tarjeta Visual de Hero */}
        <div className="lg:col-span-5 relative group">
          <div className="p-3 border border-[var(--linea-fuerte)] rounded-3xl bg-[var(--azul-prof)] shadow-2xl relative overflow-hidden">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden relative">
              <img
                src="https://mayday3003.world/assets/images/IMG_0204.JPG"
                alt="Capurganá 2025"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--negro)]/80 via-transparent to-transparent flex items-end p-6">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-code text-[var(--acero)]">Destacado</span>
                  <h3 className="text-2xl text-[var(--crema-suave)] font-normal">Capurganá 2025</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Intereses Nucleares */}
      <section className="space-y-8 pt-8 border-t border-[var(--linea-fuerte)]">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest font-code text-[var(--acero)]">Coordenadas</p>
            <h2 className="text-3xl sm:text-4xl text-[var(--crema-suave)] font-normal">Lo que de verdad me mueve</h2>
          </div>
          <span className="font-code text-sm text-[var(--acero)]">01</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-2xl border border-[var(--linea-fuerte)] bg-[var(--azul-prof)] hover:border-[var(--azul-acento)] transition-all space-y-4">
            <span className="text-xs uppercase tracking-widest font-code text-[var(--acero)]">Ciencia</span>
            <h3 className="text-2xl text-[var(--crema-suave)] font-normal">Física de Plasmas</h3>
            <p className="text-sm text-[var(--beige)] leading-relaxed">
              Fusión nuclear, astrofísica computacional y observación del viento solar.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-[var(--linea-fuerte)] bg-[var(--azul-prof)] hover:border-[var(--azul-acento)] transition-all space-y-4">
            <span className="text-xs uppercase tracking-widest font-code text-[var(--acero)]">Mar</span>
            <h3 className="text-2xl text-[var(--crema-suave)] font-normal">Tiburones & Buceo</h3>
            <p className="text-sm text-[var(--beige)] leading-relaxed">
              Inmersión en arrecifes de coral, exploración subacuática y vida marina.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-[var(--linea-fuerte)] bg-[var(--azul-prof)] hover:border-[var(--azul-acento)] transition-all space-y-4">
            <span className="text-xs uppercase tracking-widest font-code text-[var(--acero)]">Siempre</span>
            <h3 className="text-2xl text-[var(--crema-suave)] font-normal">Amor & Momentos</h3>
            <p className="text-sm text-[var(--beige)] leading-relaxed">
              En todas partes. Personas especiales y recuerdos colaborativos grabados para siempre.
            </p>
          </div>
        </div>
      </section>

      {/* Sección Canciones conectadas a Spotify */}
      <section className="space-y-6 pt-8 border-t border-[var(--linea-fuerte)]">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest font-code text-[var(--acero)]">Banda sonora</p>
            <h2 className="text-3xl text-[var(--crema-suave)] font-normal">Canciones on repeat</h2>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {[
            { name: 'Still Loving You - Scorpions', url: 'https://open.spotify.com/search/Still%20Loving%20You%20Scorpions' },
            { name: 'Dull Knives - The Warning', url: 'https://open.spotify.com/search/Dull%20Knives%20The%20Warning' },
            { name: 'Nightmare - Halsey', url: 'https://open.spotify.com/search/Nightmare%20Halsey' },
            { name: 'Hey You - Pink Floyd', url: 'https://open.spotify.com/search/Hey%20You%20Pink%20Floyd' },
            { name: 'Ahora nada es imposible - Margarita Siempre Viva', url: 'https://open.spotify.com/search/Ahora%20nada%20es%20imposible%20Margarita%20Siempre%20Viva' },
          ].map((song, idx) => (
            <a
              key={idx}
              href={song.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[var(--linea-fuerte)] bg-[var(--azul-prof)] hover:border-[var(--azul-acento)] hover:shadow-md hover:shadow-[var(--azul-glow)] transition-all text-xs font-medium text-[var(--crema-suave)] group"
            >
              <svg className="w-3.5 h-3.5 text-[var(--acero)] group-hover:text-[var(--azul-acento)] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.435-5.308-1.76-8.793-.963-.335.077-.67-.133-.746-.468-.077-.334.132-.67.467-.746 3.808-.87 7.076-.506 9.722 1.113.294.18.386.563.207.857zm1.225-2.723c-.226.368-.71.485-1.078.26-2.69-1.653-6.79-2.133-9.97-1.168-.413.125-.85-.11-.975-.523-.125-.413.11-.85.523-.975 3.633-1.102 8.147-.568 11.24 1.328.368.226.485.71.26 1.078zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71c-.494.15-1.018-.13-1.168-.624-.15-.494.13-1.017.624-1.167 3.532-1.072 9.404-.866 13.115 1.337.445.264.59.838.327 1.282-.264.444-.838.59-1.28.328z"/>
              </svg>
              <span>{song.name}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
