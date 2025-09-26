"use client";

import { useState } from "react";
import { toast } from "sonner";

export function LeadEditor({
    id,
    initialStatus,
    initialNotes,
}: {
    id: string;
    initialStatus: string | null;
    initialNotes: string | null;
}) {
    const [status, setStatus] = useState(initialStatus ?? "");
    const [notes, setNotes] = useState(initialNotes ?? "");
    const [loading, setLoading] = useState(false);

    async function save() {
        setLoading(true);
        const res = await fetch(`/api/leads/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status, notes }),
        });

        if (res.ok) {
            toast.success("Lead atualizado");
        } else {
            const data = await res.json();
            toast.error(`Erro: ${data.error}`);
        }

        setLoading(false);
    }

    return (
        <div className="space-y-1 text-sm">
            <input
                type="text"
                placeholder="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-2 py-1 rounded border border-gray-300 text-white"
            />
            <textarea
                placeholder="Anotações"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full px-2 py-1 rounded border border-gray-300 text-white"
            />
            <button
                onClick={save}
                disabled={loading}
                className="mt-1 text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? "Salvando..." : "Salvar"}
            </button>
        </div>
    );
}
