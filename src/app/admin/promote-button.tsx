"use client";
import { toast } from "sonner";

export function PromoteButton({ userId, name }: { userId: string; name: string }) {
  async function promote() {
    const res = await fetch("/api/users/promote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(`Usuário ${name} promovido com sucesso`);
      setTimeout(() => location.reload(), 1500); // reload com delay suave
    } else {
      toast.error(`Erro ao promover: ${data.error}`);
    }
  }

  return (
    <button
      onClick={promote}
      className="text-xs bg-green-700 text-white px-2 py-1 rounded hover:bg-green-800"
    >
      Promover
    </button>
  );
}
