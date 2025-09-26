"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function ChangePasswordPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
      toast.error("Nova senha e confirmação não coincidem.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/users/change-password", {
      method: "POST",
      body: JSON.stringify({ currentPassword, newPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setLoading(false);

    if (res.ok) {
      toast.success("Senha atualizada com sucesso!");
      form.reset();
    } else {
      const data = await res.json();
      toast.error(data?.error || "Erro ao trocar senha.");
    }
  }

  return (
    <main className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Alterar Senha</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Senha atual</label>
          <input
            type="password"
            name="currentPassword"
            required
            className="border w-full p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Nova senha</label>
          <input
            type="password"
            name="newPassword"
            required
            className="border w-full p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Confirmar nova senha</label>
          <input
            type="password"
            name="confirmPassword"
            required
            className="border w-full p-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition"
        >
          {loading ? "Salvando..." : "Salvar nova senha"}
        </button>
      </form>
    </main>
  );
}
