import { NextResponse } from "next/server";
import { verifyEmail } from "@/lib/auth";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  if (!email || !token) {
    return NextResponse.json({ error: "Parâmetros ausentes" }, { status: 400 });
  }
  try {
    await verifyEmail({ email, token });
    // Redirect to login with a flag so UI can show success
    const url = new URL("/login", req.url);
    url.searchParams.set("verified", "1");
    return NextResponse.redirect(url);
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "Falha na verificação" }, { status: 400 });
  }
}

