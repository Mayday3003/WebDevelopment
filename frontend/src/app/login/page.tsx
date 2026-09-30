import { Suspense } from 'react';
import { LoginForm } from '@/features/auth/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex-1 flex items-center justify-center py-12">
      <Suspense fallback={<div className="text-center font-code text-xs text-[var(--acero)] animate-pulse">Cargando acceso...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
