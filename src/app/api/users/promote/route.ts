import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  userId: z.string().optional(),
  email: z.string().email().optional(),
}).refine(v => v.userId || v.email, { message: "Informe userId ou email" });

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  // Verifica se quem está promovendo é ADMIN
  const roleRows = (await prisma.$queryRaw`SELECT role FROM "User" WHERE id = ${session.userId} LIMIT 1`) as { role: 'ADMIN' | 'LEAD' }[];
  if (!roleRows.length || roleRows[0].role !== 'ADMIN') {
    return NextResponse.json({ error: "Acesso restrito" }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Dados inválidos' }, { status: 400 });

  const { userId, email } = parsed.data;

  // Localiza usuário por email ou id (consulta segura em dois caminhos)
  let user: { id: string; email: string } | undefined;
  if (userId) {
    const rows = (await prisma.$queryRaw`SELECT id, email FROM "User" WHERE id = ${userId} LIMIT 1`) as { id: string; email: string }[];
    user = rows[0];
  } else if (email) {
    const rows = (await prisma.$queryRaw`SELECT id, email FROM "User" WHERE email = ${email} LIMIT 1`) as { id: string; email: string }[];
    user = rows[0];
  }
  
  if (!user) return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });

  // Promove para ADMIN e remove de Leads (marketing) e UserLead (1:1)
  await prisma.$transaction(async (tx) => {
    await tx.$executeRaw`update "User" set role = 'ADMIN'::"UserRole" where id = ${user.id}`;
    await tx.$executeRaw`delete from "Lead" where email = ${user.email}`; // marketing lead
    await tx.$executeRaw`delete from "UserLead" where "userId" = ${user.id}`; // 1:1 lead
  });

  return NextResponse.json({ ok: true });
}
