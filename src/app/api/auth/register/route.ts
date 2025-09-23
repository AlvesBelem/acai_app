import { NextResponse } from "next/server";
import { registerUser } from "@/lib/auth";
import { sendVerificationEmail } from "@/lib/mailer";
import { headers } from "next/headers";
import { z } from "zod";

const schema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }
    const { user, verificationToken } = await registerUser(parsed.data);

    // Se a verificação estiver desativada (dev), não enviar email nem montar link
    if (!verificationToken) {
      return NextResponse.json({ ok: true }, { status: 201 });
    }

    const hdrs = await headers();
    const host = hdrs.get("x-forwarded-host") ?? hdrs.get("host") ?? "localhost:3000";
    const proto = hdrs.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? `${proto}://${host}`;
    const verificationUrl = `${base}/api/auth/verify?email=${encodeURIComponent(user.email)}&token=${encodeURIComponent(verificationToken)}`;

    // Envia email de verificação (se SMTP configurado). Em dev, também retornamos o link.
    try {
      await sendVerificationEmail({ to: user.email, verificationUrl });
    } catch (err) {
      // Não falhar cadastro se email não enviou; retornamos o link para teste
      console.error("Falha ao enviar email:", err);
    }
    return NextResponse.json({ ok: true, verificationUrl }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "Erro ao cadastrar" }, { status: 400 });
  }
}
