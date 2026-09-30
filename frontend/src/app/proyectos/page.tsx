import Link from 'next/link';

export default function ProyectosPage() {
  const projects = [
    {
      title: 'Observatorio Ultravioleta Lunar',
      period: '2025 - Presente',
      category: 'Misión Espacial & Física',
      description:
        'Proyecto de investigación y misión para realizar la primera reconstrucción 3D de la exósfera terrestre y modelar su interacción con la magnetosfera y el viento solar mediante sensores ópticos de alta precisión.',
      image: 'https://mayday3003.world/assets/images/IMG_0178.JPG',
    },
    {
      title: 'Biochar contra Contaminantes Emergentes (Orquídeas)',
      period: '2026',
      category: 'Ciencia de Materiales & Agua',
      description:
        'Aplicación móvil y estudio científico para caficultores y estudiantes sobre la pirolisis y síntesis de Biochar para eliminar trazas de pesticidas y contaminantes emergentes en cuencas hídricas.',
      image: 'https://mayday3003.world/assets/images/feria.jpeg',
    },
    {
      title: 'Fusión Nuclear & Diagnósticos de Plasma',
      period: '2025 - 2026',
      category: 'Física Teórica & Computacional',
      description:
        'Simulaciones computacionales del confinamiento magnético en reactores Tokamak y análisis de inestabilidades magnetohidrodinámicas en plasmas de alta energía.',
      image: 'https://mayday3003.world/assets/images/IMG_0051.JPG',
    },
  ];

  return (
    <div className="space-y-12 py-6">
      <div className="border-b border-[var(--linea-fuerte)] pb-6">
        <span className="text-xs uppercase tracking-widest font-code text-[var(--acero)]">Investigación & Ciencia</span>
        <h1 className="text-4xl sm:text-5xl font-normal text-[var(--crema-suave)]">Proyectos & Misiones</h1>
      </div>

      <div className="space-y-6">
        {projects.map((proj, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-8 rounded-3xl border border-[var(--linea-fuerte)] bg-[var(--azul-prof)] hover:border-[var(--azul-acento)] transition-all flex flex-col md:flex-row gap-6 items-center shadow-xl"
          >
            <div className="w-full md:w-48 h-48 rounded-2xl overflow-hidden flex-shrink-0 bg-black/40 border border-[var(--linea)]">
              <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] uppercase font-code tracking-wider text-[var(--azul-acento)]">
                  {proj.category}
                </span>
                <span className="text-xs font-code text-[var(--acero)]">{proj.period}</span>
              </div>

              <h2 className="text-2xl font-normal text-[var(--crema-suave)]">{proj.title}</h2>
              <p className="text-sm text-[var(--beige)] leading-relaxed">{proj.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-8 border-t border-[var(--linea-fuerte)]">
        <Link
          href="/muro"
          className="inline-block px-6 py-3 rounded-2xl bg-[var(--azul-acento)] hover:bg-[var(--azul-hover)] text-white text-xs font-semibold uppercase tracking-wider transition-all"
        >
          Explorar Recuerdos Relacionados
        </Link>
      </div>
    </div>
  );
}
