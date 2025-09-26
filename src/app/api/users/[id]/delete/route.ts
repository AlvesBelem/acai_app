import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, context: { params: { id: string } }) {
  const { params } = context;
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const userId = params.id;

  try {
    await prisma.$transaction(async (tx) => {
      // Apaga qualquer vínculo de Lead e UserLead antes
      await tx.marketingLead.deleteMany({ where: { userId } });
      await tx.lead.deleteMany({ where: { userId } });

      // Agora pode apagar o usuário
      await tx.user.delete({ where: { id: userId } });
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Erro ao deletar:", e);
    return NextResponse.json({ error: "Erro ao deletar usuário" }, { status: 500 });
  }
}
