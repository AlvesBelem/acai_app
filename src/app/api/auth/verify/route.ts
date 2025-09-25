import { NextResponse } from "next/server";
import { verifyEmail, loginUserByEmail } from "@/lib/auth";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  if (!email || !token) {
    return NextResponse.redirect(new URL("/login?verified=error", req.url));
  }

  try {
    await verifyEmail({ email, token });
    await loginUserByEmail(email);

    return NextResponse.redirect(new URL("/plataforma", req.url));
  } catch (e: any) {
    return NextResponse.redirect(new URL("/login?verified=error", req.url));
  }
}
