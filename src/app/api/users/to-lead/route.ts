import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  userId: z.string().optional(),
  email: z.string().email().optional(),
}).refine(v => v.userId || v.email, { message: 'Informe userId ou email' });

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  // Apenas ADMIN pode realizar
  const roleRows = (await prisma.$queryRaw`SELECT role FROM "User" WHERE id = ${session.userId} LIMIT 1`) as { role: 'ADMIN' | 'LEAD' }[];
  if (!roleRows.length || roleRows[0].role !== 'ADMIN') return NextResponse.json({ error: 'Acesso restrito' }, { status: 403 });

  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Dados inválidos' }, { status: 400 });
  const { userId, email } = parsed.data;

  // Localiza usuário
  let user: { id: string; email: string; name: string | null; phone: string | null } | undefined;
  if (userId) {
    const rows = (await prisma.$queryRaw`SELECT id, email, name, phone FROM "User" WHERE id = ${userId} LIMIT 1`) as any[];
    user = rows[0];
  } else if (email) {
    const rows = (await prisma.$queryRaw`SELECT id, email, name, phone FROM "User" WHERE email = ${email} LIMIT 1`) as any[];
    user = rows[0];
  }
  if (!user) return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });

  await prisma.$transaction(async (tx) => {
    // Seta role para LEAD
    await tx.$executeRaw`UPDATE "User" SET role = 'LEAD'::"UserRole" WHERE id = ${user!.id}`;

    // Insere/atualiza Lead (marketing) com id explícito
    const marketingLeadId = crypto.randomUUID();
    await tx.$executeRaw`INSERT INTO "Lead" (id, email) VALUES (${marketingLeadId}, ${user!.email}) ON CONFLICT (email) DO NOTHING`;
    await tx.$executeRaw`
      UPDATE "Lead"
      SET name = COALESCE(${user!.name ?? null}, name),
          phone = COALESCE(${user!.phone ?? null}, phone),
          "userId" = COALESCE(${user!.id}, "userId"),
          "archivedAt" = NULL
      WHERE email = ${user!.email}
    `;

    // Cria UserLead 1:1
    const newId = crypto.randomUUID();
    await tx.$executeRaw`INSERT INTO "UserLead" (id, "userId") VALUES (${newId}, ${user!.id}) ON CONFLICT ("userId") DO NOTHING`;
  });

  return NextResponse.json({ ok: true });
}

