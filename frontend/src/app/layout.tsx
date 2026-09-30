import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/features/auth/hooks/useAuth';
import { Navbar } from '@/features/common/components/Navbar';

export const metadata: Metadata = {
  title: 'Mayday — Bitácora Interactiva & Muro de Recuerdos',
  description: 'Un espacio cósmico y personal donde comparto proyectos de investigación, intereses y memorias colaborativas.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col antialiased selection:bg-[var(--acero)] selection:text-[var(--negro)]">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
            {children}
          </main>
          <footer className="w-full border-t border-[var(--linea-fuerte)] py-6 text-center text-xs text-[var(--acero)] font-code">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span>Mayday © 2026 · Bitácora Full-Stack</span>
              <div className="flex gap-6">
                <a href="https://pin.it/6FbzztlTF" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--crema-suave)] transition-colors">Pinterest</a>
                <a href="https://www.instagram.com/mayday_lopera.tif" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--crema-suave)] transition-colors">Instagram</a>
                <a href="https://boxd.it/fcKcH" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--crema-suave)] transition-colors">Letterboxd</a>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
