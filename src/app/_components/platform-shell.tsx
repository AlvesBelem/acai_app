"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Users, Package, ChevronLeft, ChevronRight, Plus, Pencil, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function PlatformShell({
  role,
  initialLeads,
  initialProducts,
}: {
  role: "ADMIN" | "LEAD";
  initialLeads: any[];
  initialProducts: any[];
}) {
  const [active, setActive] = useState<"clientes" | "produtos">("produtos");
  const [products, setProducts] = useState(initialProducts);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const isAdmin = role === "ADMIN";

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data.items);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSave = async (e: any) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const body: any = {
      name: form.get("name"),
      description: form.get("description"),
      priceCents: Math.round(parseFloat(form.get("price") as string) * 100),
      imageUrl: form.get("imageUrl"),
      checkoutUrl: form.get("checkoutUrl"),
    };
    if (editing) body["id"] = editing.id;

    const res = await fetch("/api/products", {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      setShowForm(false);
      setEditing(null);
      fetchProducts();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este produto?")) return;
    await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchProducts();
  };

  return (
    <div className="w-full flex min-h-screen">
      {isAdmin && sidebarOpen && (
        <aside className="w-56 p-4 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col gap-2 h-screen sticky top-0">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-slate-700">Menu</span>
            <button onClick={() => setSidebarOpen(false)} className="text-sm text-slate-500 hover:text-slate-800">✕</button>
          </div>
          <button onClick={() => setActive("clientes")} className={cn("text-left", active === "clientes" && "font-bold text-blue-600")}>Clientes</button>
          <button onClick={() => setActive("produtos")} className={cn("text-left", active === "produtos" && "font-bold text-blue-600")}>Produtos</button>
        </aside>
      )}

      {!sidebarOpen && isAdmin && (
        <button
          className="fixed top-4 left-4 z-50 bg-white border rounded px-2 py-1 text-sm shadow"
          onClick={() => setSidebarOpen(true)}
        >
          Abrir menu
        </button>
      )}

      <main className="flex-1 p-4">
        {active === "produtos" && (
          <div>
            {isAdmin && (
              <div className="mb-4">
                <Button onClick={() => { setEditing(null); setShowForm(true); }} className="flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Novo Produto
                </Button>
              </div>
            )}

            <AnimatePresence>
              {showForm && isAdmin && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
                >
                  <div className="bg-white dark:bg-slate-900 border rounded-lg p-6 w-full max-w-lg relative">
                    <button onClick={() => { setShowForm(false); setEditing(null); }} className="absolute top-2 right-2 text-slate-400 hover:text-slate-600">✕</button>
                    <form onSubmit={handleSave} className="space-y-4">
                      <div>
                        <label className="block mb-1 text-sm text-slate-700">Nome</label>
                        <input name="name" defaultValue={editing?.name || ""} placeholder="Nome" className="w-full p-2 border rounded" required />
                      </div>
                      <div>
                        <label className="block mb-1 text-sm text-slate-700">Descrição</label>
                        <input name="description" defaultValue={editing?.description || ""} placeholder="Descrição" className="w-full p-2 border rounded" />
                      </div>
                      <div>
                        <label className="block mb-1 text-sm text-slate-700">Preço (R$)</label>
                        <input name="price" defaultValue={editing ? (editing.priceCents / 100).toFixed(2) : ""} type="number" step="0.01" placeholder="Preço" className="w-full p-2 border rounded" required />
                      </div>
                      <div>
                        <label className="block mb-1 text-sm text-slate-700">URL da imagem</label>
                        <input name="imageUrl" defaultValue={editing?.imageUrl || ""} placeholder="URL da imagem" className="w-full p-2 border rounded" required />
                      </div>
                      <div>
                        <label className="block mb-1 text-sm text-slate-700">Link do checkout</label>
                        <input name="checkoutUrl" defaultValue={editing?.checkoutUrl || ""} placeholder="Link do checkout" className="w-full p-2 border rounded" required />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditing(null); }}>Cancelar</Button>
                        <Button type="submit">Salvar</Button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((p) => (
                <div key={p.id} className="border rounded p-4 shadow bg-white flex flex-col">
                  <img src={p.imageUrl} alt={p.name} className="w-full h-40 object-cover rounded mb-2" onError={(e) => (e.currentTarget.style.display = 'none')} />
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <p className="text-sm text-slate-600">{p.description}</p>
                  <p className="text-green-600 font-bold mt-1">R$ {(p.priceCents / 100).toFixed(2)}</p>
                  <a href={p.checkoutUrl} target="_blank" rel="noopener noreferrer" className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm text-center block w-full">Comprar</a>

                  {isAdmin && (
                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        onClick={() => {
                          setEditing(p);
                          setShowForm(true);
                        }}
                        className="p-2 border rounded hover:bg-slate-100"
                      >
                        <Pencil className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm('Deseja realmente excluir este produto?')) {
                            const res = await fetch('/api/products', {
                              method: 'DELETE',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ id: p.id }),
                            });
                            if (res.ok) fetchProducts();
                            else alert('Erro ao excluir o produto');
                          }
                        }}
                        className="p-2 border rounded hover:bg-slate-100"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {active === "clientes" && isAdmin && (
          <div className="text-slate-800 dark:text-slate-200">Lista de clientes aqui...</div>
        )}
      </main>
    </div>
  );
}
