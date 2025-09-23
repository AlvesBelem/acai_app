import { ThemeToggle } from "./theme-toggle";

export function PlatformHeader({ user }:{ user?: { name?: string|null, email?: string|null } }){
  return (
    <header className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-semibold">Plataforma</h1>
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex flex-col items-end text-sm">
          <span className="font-medium">{user?.name ?? 'Usuário'}</span>
          <span className="text-slate-500 dark:text-slate-400">{user?.email ?? ''}</span>
        </div>
        <ThemeToggle />
        <form action="/api/auth/logout" method="post">
          <button className="rounded-md border px-3 py-1.5 text-sm dark:border-slate-700 border-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">Sair</button>
        </form>
      </div>
    </header>
  );
}

