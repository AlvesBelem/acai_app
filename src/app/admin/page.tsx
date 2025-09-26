import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PromoteButton } from "@/app/admin/promote-button";
import { DeleteButton } from "@/app/admin/delete-button";


export default async function AdminPage() {
    const session = await getSession();

    if (!session || session.role !== "ADMIN") {
        return redirect("/login");
    }

    const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });

    const leads = await prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
    });

    const produtos = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
    });

    return (
        <main className="max-w-5xl mx-auto py-10 px-4 space-y-10">
            <h1 className="text-3xl font-bold">Painel Admin</h1>

            {/* Usuários */}
            <section>
                <h2 className="text-xl font-semibold mb-2">Usuários</h2>
                <div className="border rounded overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-neutral-800 text-left">
                                <th className="p-2">Nome</th>
                                <th className="p-2">Email</th>
                                <th className="p-2">Função</th>
                                <th className="p-2">Criado em</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u.id} className="border-t border-neutral-700">
                                    <td className="p-2">{u.name ?? "-"}</td>
                                    <td className="p-2">{u.email}</td>
                                    
                                    <td className="p-2">
                                        {new Date(u.createdAt).toLocaleDateString("pt-BR")}
                                    </td>
                                    <td className="p-2">
                                        {u.role}
                                        {u.role?.toUpperCase?.() === "LEAD" && (
                                            <div className="inline-flex space-x-2 ml-2">
                                                <PromoteButton userId={u.id} name={u.name ?? u.email} />
                                                <DeleteButton userId={u.id} name={u.name ?? u.email} />
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Leads */}
            <section>
                <h2 className="text-xl font-semibold mb-2">Últimos Leads</h2>
                <ul className="space-y-2">
                    {leads.map((lead) => (
                        <li key={lead.id} className="border p-2 rounded">
                            {lead.source ?? "Sem origem"} – {lead.status ?? "Novo"}
                        </li>
                    ))}
                </ul>
            </section>

            {/* Produtos */}
            <section>
                <h2 className="text-xl font-semibold mb-2">Produtos</h2>
                <ul className="space-y-2">
                    {produtos.map((p) => (
                        <li key={p.id} className="border p-2 rounded">
                            {p.name} – R$ {(p.priceCents / 100).toFixed(2)}
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}
