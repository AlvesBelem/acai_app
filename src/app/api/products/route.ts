import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function GET() {
  const rows = (await prisma.$queryRaw`SELECT id, name, description, "priceCents", "createdAt" FROM "Product" ORDER BY "createdAt" DESC LIMIT 200`) as any[];
  return NextResponse.json({ items: rows });
}

const createSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  priceCents: z.coerce.number().int().min(0),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    const { name, description, priceCents } = parsed.data;
    await prisma.$executeRawUnsafe(
      `INSERT INTO "Product" (name, description, "priceCents") VALUES ($1, $2, $3)`,
      name,
      description ?? null,
      priceCents
    );
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "Erro ao criar produto" }, { status: 400 });
  }
}

