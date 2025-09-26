"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function PerfilForm({ user }: { user: any }) {
    const searchParams = useSearchParams();

    useEffect(() => {
        const ok = searchParams.get("ok");
        if (ok === "1") {
            toast.success("Perfil salvo com sucesso!");
        }
    }, [searchParams]);

    return (
        <main className="max-w-xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6">Meu Perfil</h1>

            <form
                action="/api/users/me"
                method="post"
                className="space-y-4"
            >
                <div>
                    <label className="block text-sm font-medium">Nome</label>
                    <input
                        type="text"
                        name="name"
                        defaultValue={user?.name ?? ""}
                        className="border w-full p-2 rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Telefone</label>
                    <input
                        type="text"
                        name="phone"
                        defaultValue={user?.phone ?? ""}
                        className="border w-full p-2 rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        value={user?.email ?? ""}
                        disabled
                        className="border w-full p-2 rounded bg-neutral-800 text-white opacity-70 cursor-not-allowed"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition"
                >
                    Salvar
                </button>
            </form>
        </main>
    );
}
