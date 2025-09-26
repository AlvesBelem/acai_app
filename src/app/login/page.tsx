"use client";

export const dynamic = "force-dynamic";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "../_components/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function LoginContent() {
  const params = useSearchParams();
  const router = useRouter();

  const [tab, setTab] = useState("login");
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingCadastro, setLoadingCadastro] = useState(false);

  useEffect(() => {
    if (params.get("tab") === "cadastro") {
      setTab("cadastro");
    } else {
      setTab("login");
    }
  }, [params]);

  async function onLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoadingLogin(true);

    const form = e.currentTarget as HTMLFormElement;
    const email = (form.querySelector("#lemail") as HTMLInputElement).value;
    const password = (form.querySelector("#lsenha") as HTMLInputElement).value;

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoadingLogin(false);

    if (res.ok) {
      router.push("/plataforma");
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.error ?? "Não foi possível entrar");
    }
  }

  async function onCadastro(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoadingCadastro(true);

    const form = e.currentTarget as HTMLFormElement;
    const name = (form.querySelector("#cnome") as HTMLInputElement).value;
    const email = (form.querySelector("#cemail") as HTMLInputElement).value;
    const phone = (form.querySelector("#ctelefone") as HTMLInputElement).value;
    const password =
      (form.querySelector("#cpass") as HTMLInputElement)?.value || "";

    if (!password || password.length < 6) {
      setLoadingCadastro(false);
      alert("Informe uma senha com no mínimo 6 caracteres.");
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, password }),
    });

    setLoadingCadastro(false);

    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      if (data.verificationUrl) {
        alert("Cadastro criado! Verifique seu email.");
      } else {
        const loginRes = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        if (loginRes.ok) router.push("/plataforma");
        else
          alert(
            (await loginRes.json().catch(() => ({}))).error ??
              "Conta criada, mas não foi possível entrar."
          );
      }
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.error ?? "Não foi possível cadastrar");
    }
  }

  return (
    <section className="z-1100 py-16 bg-gray-100 min-h-screen flex items-center">
      <Container>
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-6 text-gray-900">
          <h1 className="text-2xl font-bold mb-1">Acessar plataforma</h1>
          <p className="text-gray-600 mb-6">Faça login ou crie sua conta.</p>

          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="mb-2">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="cadastro">Criar conta</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={onLogin} className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="lemail"
                  >
                    Email
                  </label>
                  <input
                    id="lemail"
                    type="email"
                    required
                    className="w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-400"
                    placeholder="voce@exemplo.com"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="lsenha"
                  >
                    Senha
                  </label>
                  <input
                    id="lsenha"
                    type="password"
                    required
                    className="w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-400"
                    placeholder="Sua senha"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loadingLogin}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {loadingLogin ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="cadastro">
              <form onSubmit={onCadastro} className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="cnome"
                  >
                    Nome
                  </label>
                  <input
                    id="cnome"
                    type="text"
                    required
                    className="w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-400"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="cemail"
                  >
                    Email
                  </label>
                  <input
                    id="cemail"
                    type="email"
                    required
                    className="w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-400"
                    placeholder="voce@exemplo.com"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="ctelefone"
                  >
                    WhatsApp
                  </label>
                  <input
                    id="ctelefone"
                    type="tel"
                    required
                    className="w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-400"
                    placeholder="(91) 9 9999-9999"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="cpass"
                  >
                    Senha
                  </label>
                  <input
                    id="cpass"
                    type="password"
                    required
                    className="w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-400"
                    placeholder="Mínimo 6 caracteres"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Sua conta será criada e você poderá acessar a plataforma.
                  </p>
                </div>
                <Button
                  type="submit"
                  disabled={loadingCadastro}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  {loadingCadastro ? "Enviando..." : "Criar conta"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <LoginContent />
    </Suspense>
  );
}
