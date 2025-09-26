import { prisma } from "@/lib/prisma";

export default async function ProdutosPage() {
  const produtos = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Nossos Produtos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {produtos.map((p) => (
          <div
            key={p.id}
            className="bg-white dark:bg-neutral-900 rounded-lg shadow-md overflow-hidden"
          >
            {p.imageUrl && (
              <img src={p.imageUrl} alt={p.name} className="w-full h-48 object-cover" />
            )}
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold">{p.name}</h2>
              <p className="text-sm text-neutral-500">{p.description}</p>
              <p className="font-bold text-lg">
                R$ {(p.priceCents / 100).toFixed(2).replace(".", ",")}
              </p>

              {p.checkoutUrl && (
                <a
                  href={p.checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Comprar agora
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
