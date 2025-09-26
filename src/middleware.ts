// src/middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "./lib/prisma";

const PUBLIC_PATHS = [
  "/",
  "/login",
  "/cadastro",
  "/verificado",
  "/favicon.ico",
  "/api/auth",
];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Permite acesso a rotas públicas
  if (PUBLIC_PATHS.some((p) => path.startsWith(p))) {
    return NextResponse.next();
  }

  // Obtem cookie diretamente do req (porque middleware precisa ser sync)
  const token = req.cookies.get("session")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const session = await prisma.session.findUnique({
    where: { sessionToken: token },
    include: { user: true },
  });

  const isValid =
    session && session.expires > new Date() && session.user?.email;

  if (!isValid) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/plataforma/:path*", "/api/:path*"],
};
