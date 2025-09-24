"use client";

import { useSearchParams } from "next/navigation";

export default function VerificadoPage() {
  const params = useSearchParams();
  const status = params.get("status");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-md">
        {status === "ok" ? (
          <>
            <h1 className="text-2xl font-bold mb-2 text-green-600">✅ E-mail verificado!</h1>
            <p className="text-gray-700">
              Seu e-mail foi confirmado com sucesso. Agora acesse a plataforma no seu computador e faça login.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-2 text-red-600">❌ Erro na verificação</h1>
            <p className="text-gray-700">
              O link é inválido ou expirou. Solicite um novo cadastro para continuar.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
