"use client";

import { toast } from "sonner";

export function DeleteButton({ userId, name }: { userId: string; name: string }) {
  async function remove() {
    const confirmed = confirm(`Tem certeza que deseja remover ${name}?`);
    if (!confirmed) return;

    const res = await fetch(`/api/users/${userId}/delete`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(`Usuário ${name} removido com sucesso`);
      setTimeout(() => location.reload(), 1000);
    } else {
      toast.error(`Erro ao remover: ${data.error || "erro desconhecido"}`);
    }
  }

  return (
    <button
      onClick={remove}
      className="ml-2 text-xs bg-red-700 text-white px-2 py-1 rounded hover:bg-red-800"
    >
      Remover
    </button>
  );
}
