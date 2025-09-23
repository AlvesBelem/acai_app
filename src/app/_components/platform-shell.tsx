"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Users, Package, ChevronLeft, ChevronRight, Pencil, Trash2, ShieldCheck } from "lucide-react";

type Lead = { id: string; name: string | null; phone: string | null; email: string; createdAt: string };
type Product = { id: string; name: string; description?: string | null; priceCents: number; createdAt: string };

export function PlatformShell({
  role,
  initialLeads,
  initialProducts,
}: {
  role: "ADMIN" | "LEAD";
  initialLeads: Lead[];
  initialProducts: Product[];
}) {
  const [active, setActive] = useState<"clientes" | "produtos">(() => (role === 'ADMIN' ? 'clientes' : 'produtos'));
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [collapsed, setCollapsed] = useState(false);

  const canManage = role === "ADMIN";

  async function refreshLeads() {
    const res = await fetch("/api/leads");
    const data = await res.json().catch(() => ({ items: [] }));
    setLeads(data.items ?? []);
  }

  async function refreshProducts() {
    const res = await fetch("/api/products");
    const data = await res.json().catch(() => ({ items: [] }));
    setProducts(data.items ?? []);
  }

  useEffect(() => {
    // ensure lists are fresh on client hydration
    if (canManage) {
      refreshLeads();
      refreshProducts();
    }
  }, []);

  return (
    <div className="flex gap-6 items-start">
      <aside
        className={cn(
          "shrink-0 rounded-xl border p-3 sticky top-4 h-[88vh] overflow-hidden bg-white border-slate-200 dark:bg-slate-950/90 dark:border-slate-800",
          collapsed ? "w-16" : "w-60"
        )}
      >
        <div className={cn("flex items-center justify-between mb-3", collapsed && "justify-center")}
        >
          {!collapsed && (
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Menu</p>
          )}
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            title={collapsed ? "Abrir sidebar" : "Fechar sidebar"}
            className="inline-flex items-center justify-center size-8 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
        <nav className="space-y-2">
          {canManage && (
            <button
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
                collapsed ? "justify-center" : "justify-start text-left",
                active === "clientes"
                  ? "bg-slate-900 text-white dark:bg-slate-800"
                  : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-white"
              )}
              onClick={() => setActive("clientes")}
              aria-label="Clientes"
              title="Clientes"
            >
              <Users className="w-4 h-4" />
              {!collapsed && <span>Clientes</span>}
            </button>
          )}
          <button
            className={cn(
              "w-full flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
              collapsed ? "justify-center" : "justify-start text-left",
              active === "produtos"
                ? "bg-slate-900 text-white dark:bg-slate-800"
                : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-white"
            )}
            onClick={() => setActive("produtos")}
            aria-label="Produtos"
            title="Produtos"
          >
            <Package className="w-4 h-4" />
            {!collapsed && <span>Produtos</span>}
          </button>
        </nav>
      </aside>

      <main className="flex-1">
        {active === "clientes" ? (
          <ClientesTab items={leads} canManage={canManage} onCreated={refreshLeads} />
        ) : (
          <ProdutosTab items={products} canManage={canManage} onCreated={refreshProducts} />
        )}
      </main>
    </div>
  );
}

function ClientesTab({ items, canManage, onCreated }: { items: Lead[]; canManage: boolean; onCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<Lead | null>(null);
  const [promotingId, setPromotingId] = useState<string | null>(null);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const name = (form.querySelector('#lead_name') as HTMLInputElement).value;
    const email = (form.querySelector('#lead_email') as HTMLInputElement).value;
    const phone = (form.querySelector('#lead_phone') as HTMLInputElement).value;
    const res = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, phone }) });
    if (res.ok) { setOpen(false); onCreated(); }
    else alert((await res.json().catch(() => ({}))).error ?? 'Erro ao criar lead');
  }
  return (
    <section>
      <header className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Clientes</h2>
        {canManage && <Button onClick={() => setOpen(true)}>Novo cliente</Button>}
      </header>
      <div className="overflow-x-auto rounded-xl border bg-white border-slate-200 dark:border-slate-800 dark:bg-slate-900">
        <table className="min-w-full text-sm text-slate-800 dark:text-slate-200">
          <thead>
            <tr className="bg-slate-100 text-left dark:bg-slate-800">
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2">WhatsApp</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Criado em</th>
              <th className="px-4 py-2 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {items.map((l) => (
              <tr key={l.id} className="border-t border-slate-200 dark:border-slate-800">
                <td className="px-4 py-2">{l.name ?? '—'}</td>
                <td className="px-4 py-2">{l.phone ?? '—'}</td>
                <td className="px-4 py-2">{l.email}</td>
                <td className="px-4 py-2">{new Date(l.createdAt as any).toLocaleString()}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2 justify-end">
                    <button
                      className="inline-flex items-center justify-center size-8 rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                      title="Promover a Admin"
                      disabled={promotingId === l.id}
                      onClick={async () => {
                        if (!confirm(`Promover ${l.email} a Admin?`)) return;
                        setPromotingId(l.id);
                        const res = await fetch('/api/users/promote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: l.email }) });
                        setPromotingId(null);
                        if (res.ok) {
                          onCreated(); // atualiza lista — lead some ao virar admin
                        } else {
                          alert((await res.json().catch(()=>({}))).error ?? 'Falha ao promover');
                        }
                      }}
                    >
                      <ShieldCheck className="w-4 h-4" />
                    </button>
                    <button
                      className="inline-flex items-center justify-center size-8 rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                      title="Editar"
                      onClick={() => { setEditing(l); setEditOpen(true); }}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      className="inline-flex items-center justify-center size-8 rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                      title="Excluir"
                      onClick={async () => {
                        if (!confirm('Excluir este cliente?')) return;
                        const res = await fetch('/api/leads', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: l.id }) });
                        if (res.ok) onCreated(); else alert((await res.json().catch(()=>({}))).error ?? 'Falha ao excluir');
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-slate-500 dark:text-slate-400" colSpan={4}>Nenhum cliente por enquanto.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {open && (
        <Modal onClose={() => setOpen(false)} title="Novo cliente">
          <form onSubmit={onSubmit} className="space-y-3">
            <div>
              <label className="block text-sm mb-1" htmlFor="lead_name">Nome</label>
              <input id="lead_name" className="w-full rounded-md border px-3 py-2 border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200" />
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="lead_email">Email</label>
              <input id="lead_email" type="email" required className="w-full rounded-md border px-3 py-2 border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200" />
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="lead_phone">WhatsApp</label>
              <input id="lead_phone" className="w-full rounded-md border px-3 py-2 border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </Modal>
      )}

      {editOpen && editing && (
        <Modal onClose={() => { setEditOpen(false); setEditing(null); }} title="Editar cliente">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget as HTMLFormElement;
              const name = (form.querySelector('#lead_name_edit') as HTMLInputElement).value;
              const phone = (form.querySelector('#lead_phone_edit') as HTMLInputElement).value;
              const res = await fetch('/api/leads', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing.id, name, phone }) });
              if (res.ok) { setEditOpen(false); setEditing(null); onCreated(); } else { alert((await res.json().catch(()=>({}))).error ?? 'Falha ao editar'); }
            }}
            className="space-y-3"
          >
            <div>
              <label className="block text-sm mb-1" htmlFor="lead_name_edit">Nome</label>
              <input id="lead_name_edit" defaultValue={editing.name ?? ''} className="w-full rounded-md border px-3 py-2 border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200" />
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="lead_phone_edit">WhatsApp</label>
              <input id="lead_phone_edit" defaultValue={editing.phone ?? ''} className="w-full rounded-md border px-3 py-2 border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => { setEditOpen(false); setEditing(null); }}>Cancelar</Button>
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </Modal>
      )}
    </section>
  );
}



function ProdutosTab({ items, canManage, onCreated }: { items: Product[]; canManage: boolean; onCreated: () => void }) {
  const [open, setOpen] = useState(false);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const name = (form.querySelector('#prod_name') as HTMLInputElement).value;
    const description = (form.querySelector('#prod_desc') as HTMLInputElement).value;
    const price = Number((form.querySelector('#prod_price') as HTMLInputElement).value || '0');
    const priceCents = Math.round(price * 100);
    const res = await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, description, priceCents }) });
    if (res.ok) { setOpen(false); onCreated(); }
    else alert((await res.json().catch(() => ({}))).error ?? 'Erro ao criar produto');
  }
  return (
    <section>
      <header className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Produtos</h2>
        {canManage && <Button onClick={() => setOpen(true)}>Novo produto</Button>}
      </header>
      <div className="overflow-x-auto rounded-xl border bg-white border-slate-200 dark:border-slate-800 dark:bg-slate-900">
        <table className="min-w-full text-sm text-slate-800 dark:text-slate-200">
          <thead>
            <tr className="bg-slate-100 text-left dark:bg-slate-800">
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2">Descrição</th>
              <th className="px-4 py-2">Preço</th>
              <th className="px-4 py-2">Criado em</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id} className="border-t border-slate-200 dark:border-slate-800">
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">{p.description ?? '—'}</td>
                <td className="px-4 py-2">R$ {(p.priceCents / 100).toFixed(2)}</td>
                <td className="px-4 py-2">{new Date(p.createdAt as any).toLocaleString()}</td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-slate-500 dark:text-slate-400" colSpan={4}>Nenhum produto por enquanto.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {open && (
        <Modal onClose={() => setOpen(false)} title="Novo produto">
          <form onSubmit={onSubmit} className="space-y-3">
            <div>
              <label className="block text-sm mb-1" htmlFor="prod_name">Nome</label>
              <input id="prod_name" required className="w-full rounded-md border px-3 py-2 border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200" />
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="prod_desc">Descrição</label>
              <input id="prod_desc" className="w-full rounded-md border px-3 py-2 border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200" />
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="prod_price">Preço (R$)</label>
              <input id="prod_price" type="number" step="0.01" min="0" required className="w-full rounded-md border px-3 py-2 border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </Modal>
      )}
    </section>
  );
}

function Modal({ onClose, title, children }: { onClose: () => void; title: string; children: React.ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative rounded-xl shadow-lg w-[92vw] max-w-md p-5 bg-white text-slate-900 border border-slate-200 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}
