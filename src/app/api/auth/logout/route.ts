import { NextResponse } from "next/server";
import { logoutUser } from "@/lib/auth";

export async function POST(req: Request) {
  await logoutUser();

  // Redireciona direto para /login
  return NextResponse.redirect(new URL("/login", req.url));
}
