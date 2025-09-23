import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const role = url.searchParams.get('role');
  if (role && role !== 'ADMIN' && role !== 'LEAD') {
    return NextResponse.json({ error: 'role inválido' }, { status: 400 });
  }
  const rows = role
    ? ((await prisma.$queryRaw`SELECT id, name, email, role, "createdAt" FROM "User" WHERE role = ${role} ORDER BY "createdAt" DESC LIMIT 200`) as any[])
    : ((await prisma.$queryRaw`SELECT id, name, email, role, "createdAt" FROM "User" ORDER BY "createdAt" DESC LIMIT 200`) as any[]);
  return NextResponse.json({ items: rows });
}

