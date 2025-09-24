"use client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Button } from "@/components/ui/button";
import { Container } from "../_components/container";
import { useState } from "react";

export default function CadastroPage() {
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Cadastro recebido! Em breve você poderá acessar a plataforma.");
    }, 600);
  }

  return (
    <section className="py-16">
      <Container>
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-1">Criar conta</h1>
          <p className="text-gray-600 mb-6">
            Cadastre-se para registrar leads e acessar ofertas.
          </p>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="nome">
                Nome
              </label>
              <input
                id="nome"
                type="text"
                required
                className="w-full rounded-md border px-3 py-2"
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full rounded-md border px-3 py-2"
                placeholder="voce@exemplo.com"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="telefone"
              >
                WhatsApp
              </label>
              <input
                id="telefone"
                type="tel"
                required
                className="w-full rounded-md border px-3 py-2"
                placeholder="(91) 9 9999-9999"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? "Enviando..." : "Criar conta"}
            </Button>
          </form>
          <p className="text-sm text-gray-600 mt-4">
            Já tem conta?{" "}
            <a className="underline" href="/login">
              Entrar
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
