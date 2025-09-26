import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const data = await req.formData();
  const name = data.get("name")?.toString().trim() || null;
  const phone = data.get("phone")?.toString().trim() || null;

  await prisma.user.update({
    where: { id: session.userId },
    data: {
      name,
      phone,
    },
  });

  return NextResponse.redirect(new URL("/perfil?ok=1", req.url));
}
