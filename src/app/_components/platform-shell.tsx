"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Users, Package, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [collapsed, setCollapsed] = useState(true);

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
    if (canManage) {
      refreshLeads();
      refreshProducts();
    }
  }, []);

  return (
    <div className="w-full">
      {/* Botão "Menu" para mobile */}
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
        {/* Sidebar mobile com framer-motion */}
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
                <button
                  className="inline-flex items-center justify-center size-8 rounded-md border border-slate-300 dark:border-slate-700"
                  onClick={() => setCollapsed(true)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
              <nav className="space-y-2">
                {canManage && (
                  <button
                    className={cn(
                      "w-full flex items-center gap-2 px-3 py-2 rounded-md transition-colors justify-start text-left",
                      active === "clientes"
                        ? "bg-slate-900 text-white dark:bg-slate-800"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-white"
                    )}
                    onClick={() => {
                      setActive("clientes");
                      setCollapsed(true);
                    }}
                  >
                    <Users className="w-4 h-4" />
                    <span>Clientes</span>
                  </button>
                )}
                <button
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 rounded-md transition-colors justify-start text-left",
                    active === "produtos"
                      ? "bg-slate-900 text-white dark:bg-slate-800"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-white"
                  )}
                  onClick={() => {
                    setActive("produtos");
                    setCollapsed(true);
                  }}
                >
                  <Package className="w-4 h-4" />
                  <span>Produtos</span>
                </button>
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Overlay escuro ao fundo */}
        <AnimatePresence>
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
        </AnimatePresence>

        {/* Sidebar desktop */}
        <aside
          className={cn(
            "hidden md:block shrink-0 rounded-xl border p-3 sticky top-4 h-[88vh] overflow-hidden bg-white border-slate-200 dark:bg-slate-950/90 dark:border-slate-800",
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

        {/* Conteúdo principal */}
        <main className="flex-1">
          {active === "clientes" ? (
            <div className="text-slate-800 dark:text-slate-200">Lista de clientes aqui...</div>
          ) : (
            <div className="text-slate-800 dark:text-slate-200">Lista de produtos aqui...</div>
          )}
        </main>
      </div>
    </div>
  );
}
