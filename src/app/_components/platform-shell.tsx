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
  const [active, setActive] = useState<"clientes" | "produtos">(() => (role === 'ADMIN' ? 'clientes' : 'produtos'));
  const [products, setProducts] = useState(initialProducts);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [collapsed, setCollapsed] = useState(true);

  const isAdmin = role === "ADMIN";

  const fetchProducts = async () => {
    const res = await fetch("/api/produtos");
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

    const res = await fetch("/api/produtos", {
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
    await fetch("/api/produtos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchProducts();
  };

  return (
    <div className="w-full">
      <div className="md:hidden flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Plataforma</h1>
        <button
          className="inline-flex items-center px-3 py-2 rounded-md text-slate-900 bg-white border border-slate-300 shadow-sm"
          onClick={() => setCollapsed(false)}
        >
          <span className="mr-2">Menu</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start w-full relative">
        <AnimatePresence>
          {!collapsed && (
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 md:hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold">Menu</p>
                <button className="size-8 border rounded" onClick={() => setCollapsed(true)}>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
              <nav className="space-y-2">
                {isAdmin && <button onClick={() => setActive("clientes")}>Clientes</button>}
                <button onClick={() => setActive("produtos")}>Produtos</button>
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setCollapsed(true)}
          />
        )}

        <aside className={cn("hidden md:block w-64 shrink-0", "p-4 bg-white dark:bg-slate-900 border rounded-lg")}>Sidebar</aside>

        <main className="flex-1">
          {active === "produtos" ? (
            <div>
              {isAdmin && (
                <div className="mb-4">
                  <Button onClick={() => { setEditing(null); setShowForm(true); }} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Novo Produto
                  </Button>
                </div>
              )}

              {showForm && (
                <form onSubmit={handleSave} className="bg-white border p-4 rounded mb-6 space-y-3">
                  <input name="name" defaultValue={editing?.name || ""} placeholder="Nome" className="w-full p-2 border rounded" required />
                  <input name="description" defaultValue={editing?.description || ""} placeholder="Descrição" className="w-full p-2 border rounded" />
                  <input name="price" defaultValue={editing ? (editing.priceCents / 100).toFixed(2) : ""} type="number" step="0.01" placeholder="Preço (R$)" className="w-full p-2 border rounded" required />
                  <input name="imageUrl" defaultValue={editing?.imageUrl || ""} placeholder="URL da imagem" className="w-full p-2 border rounded" required />
                  <input name="checkoutUrl" defaultValue={editing?.checkoutUrl || ""} placeholder="Link do checkout" className="w-full p-2 border rounded" required />
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditing(null); }}>Cancelar</Button>
                    <Button type="submit">Salvar</Button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((p) => (
                  <div key={p.id} className="border rounded p-4 shadow bg-white flex flex-col">
                    <img src={p.imageUrl} alt={p.name} className="w-full h-40 object-cover rounded mb-2" />
                    <h3 className="text-lg font-semibold">{p.name}</h3>
                    <p className="text-sm text-slate-600">{p.description}</p>
                    <p className="text-green-600 font-bold mt-1">R$ {(p.priceCents / 100).toFixed(2)}</p>
                    <a href={p.checkoutUrl} target="_blank" className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm text-center">Comprar</a>

                    {isAdmin && (
                      <div className="flex justify-end gap-2 mt-4">
                        <button onClick={() => { setEditing(p); setShowForm(true); }} className="p-2 border rounded hover:bg-slate-100">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(p.id)} className="p-2 border rounded hover:bg-slate-100">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-slate-800 dark:text-slate-200">Lista de clientes aqui...</div>
          )}
        </main>
      </div>
    </div>
  );
}
