"use client";

import { Button } from "@/components/ui/button";
import { Container } from "../_components/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export default function LoginPage() {
  const params = useSearchParams();
  const initialTab = useMemo(() => (params.get("tab") === "cadastro" ? "cadastro" : "login"), [params]);

  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingCadastro, setLoadingCadastro] = useState(false);
  const router = useRouter();

  async function onLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoadingLogin(true);
    const form = e.currentTarget as HTMLFormElement;
    const email = (form.querySelector('#lemail') as HTMLInputElement).value;
    const password = (form.querySelector('#lsenha') as HTMLInputElement).value;
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    setLoadingLogin(false);
    if (res.ok) {
      router.push('/plataforma');
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.error ?? 'Não foi possível entrar');
    }
  }

  async function onCadastro(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoadingCadastro(true);
    const form = e.currentTarget as HTMLFormElement;
    const name = (form.querySelector('#cnome') as HTMLInputElement).value;
    const email = (form.querySelector('#cemail') as HTMLInputElement).value;
    const phone = (form.querySelector('#ctelefone') as HTMLInputElement).value;
    const password = (form.querySelector('#cpass') as HTMLInputElement)?.value || Math.random().toString(36).slice(2,10);
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, password })
    });
    setLoadingCadastro(false);
    if (res.ok) {
      alert('Cadastro criado! Faça login.');
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.error ?? 'Não foi possível cadastrar');
    }
  }

  return (
    <section className="py-16">
      <Container>
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-1">Acessar plataforma</h1>
          <p className="text-gray-600 mb-6">Faça login ou crie sua conta.</p>

          <Tabs defaultValue={initialTab}>
            <TabsList className="mb-2">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="cadastro">Criar conta</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={onLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="lemail">Email</label>
                  <input id="lemail" type="email" required className="w-full rounded-md border px-3 py-2" placeholder="voce@exemplo.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="lsenha">Senha</label>
                  <input id="lsenha" type="password" required className="w-full rounded-md border px-3 py-2" placeholder="Sua senha" />
                </div>
                <Button type="submit" disabled={loadingLogin} className="w-full">{loadingLogin ? "Entrando..." : "Entrar"}</Button>
              </form>
            </TabsContent>

            <TabsContent value="cadastro">
              <form onSubmit={onCadastro} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="cnome">Nome</label>
                  <input id="cnome" type="text" required className="w-full rounded-md border px-3 py-2" placeholder="Seu nome" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="cemail">Email</label>
                  <input id="cemail" type="email" required className="w-full rounded-md border px-3 py-2" placeholder="voce@exemplo.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="ctelefone">WhatsApp</label>
                  <input id="ctelefone" type="tel" required className="w-full rounded-md border px-3 py-2" placeholder="(91) 9 9999-9999" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="cpass">Senha</label>
                  <input id="cpass" type="password" required className="w-full rounded-md border px-3 py-2" placeholder="Crie uma senha" />
                </div>
                <Button type="submit" disabled={loadingCadastro} className="w-full">{loadingCadastro ? "Enviando..." : "Criar conta"}</Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </section>
  );
}
