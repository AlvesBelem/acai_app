import { NextResponse } from "next/server";
import { verifyEmail } from "@/lib/auth";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  if (!email || !token) {
    return NextResponse.redirect(new URL("/verificado?status=error", req.url));
  }

  try {
    await verifyEmail({ email, token });
    return NextResponse.redirect(new URL("/verificado?status=ok", req.url));
  } catch (e: any) {
    return NextResponse.redirect(new URL("/verificado?status=error", req.url));
  }
}
