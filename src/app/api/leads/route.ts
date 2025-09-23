import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { cookies } from "next/headers";

const schema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }
    const { name, email, phone } = parsed.data;
    const id = crypto.randomUUID();
    await prisma.$executeRaw`INSERT INTO "Lead" (id, email) VALUES (${id}, ${email}) ON CONFLICT (email) DO NOTHING`;
    const rows = (await prisma.$queryRaw`
      UPDATE "Lead"
      SET name = COALESCE(${name ?? null}, name),
          phone = COALESCE(${phone ?? null}, phone)
      WHERE email = ${email}
      RETURNING id
    `) as { id: string }[];
    const retId = rows[0]?.id ?? id;
    const cookieStore = await cookies();
    if (retId) {
      cookieStore.set("lead_id", retId, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30,
      });
    }
    return NextResponse.json({ ok: true, id: retId });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "Erro ao registrar lead" }, { status: 400 });
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const includeArchived = url.searchParams.get('includeArchived') === '1';
  const rows = includeArchived
    ? ((await prisma.$queryRaw`SELECT id, name, phone, email, "createdAt", "archivedAt" FROM "Lead" ORDER BY "createdAt" DESC LIMIT 200`) as any[])
    : ((await prisma.$queryRaw`SELECT id, name, phone, email, "createdAt" FROM "Lead" WHERE "archivedAt" IS NULL ORDER BY "createdAt" DESC LIMIT 200`) as any[]);
  return NextResponse.json({ items: rows });
}

export async function PUT(req: Request) {
  try {
    const { id, name, phone } = await req.json();
    if (!id) return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 });
    // garante coluna archivedAt
    await prisma.$executeRaw`ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "archivedAt" timestamp NULL`;
    await prisma.$executeRaw`
      UPDATE "Lead"
      SET name = COALESCE(${name ?? null}, name),
          phone = COALESCE(${phone ?? null}, phone)
      WHERE id = ${id}
    `;
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Erro ao atualizar lead' }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 });
    // soft-delete: inativar
    await prisma.$executeRaw`ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "archivedAt" timestamp NULL`;
    await prisma.$executeRaw`UPDATE "Lead" SET "archivedAt" = now() WHERE id = ${id}`;
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Erro ao excluir lead' }, { status: 400 });
  }
}
