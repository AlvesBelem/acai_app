// app/verificado/[status]/page.tsx

export default function VerificadoPage({ params }: any) {
  const { status } = params;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-lg text-center">
        {status === "ok" ? (
          <>
            <h1 className="text-2xl font-bold mb-2 text-green-600">
              ✅ E-mail verificado!
            </h1>
            <p className="text-gray-700">
              Seu e-mail foi confirmado com sucesso. Agora você já pode fazer login.
            </p>
            <div className="mt-6">
              <a
                href="/login"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Ir para login
              </a>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-2 text-red-600">
              ❌ Erro na verificação
            </h1>
            <p className="text-gray-700">
              O link é inválido ou expirou. Solicite um novo cadastro.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
