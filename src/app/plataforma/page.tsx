import { Container } from "../_components/container";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function PlataformaPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const HOTMART_URL = "https://app.hotmart.com";

  return (
    <section className="py-16">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-3">Plataforma</h1>
          <p className="text-gray-700 mb-8">Cadastre leads e acesse ofertas de listas de fornecedores hospedadas na Hotmart.</p>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border bg-white p-6">
              <h2 className="font-semibold text-lg mb-2">Registrar Leads</h2>
              <p className="text-gray-600 mb-4">Recurso em implementação. Em breve você poderá criar e gerenciar seus leads.</p>
              <div className="flex gap-2">
                <Button asChild>
                  <a href="/cadastro">Criar conta</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="/login">Entrar</a>
                </Button>
              </div>
            </div>

            <div className="rounded-xl border bg-white p-6">
              <h2 className="font-semibold text-lg mb-2">Listas na Hotmart</h2>
              <p className="text-gray-600 mb-4">Acesse as ofertas e realize a compra diretamente na Hotmart com segurança.</p>
              <Button asChild className="bg-[#620F83] hover:bg-[#620F83]/90">
                <a href={HOTMART_URL} target="_blank" rel="noopener noreferrer">Ver ofertas na Hotmart</a>
              </Button>
            </div>
          </div>
          <form action="/api/auth/logout" method="post" className="mt-8">
            <Button type="submit" variant="outline">Sair</Button>
          </form>
        </div>
      </Container>
    </section>
  );
}
