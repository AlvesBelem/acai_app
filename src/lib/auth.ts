import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

const SESSION_COOKIE = "session";
const SESSION_TTL_DAYS = 30;

export async function registerUser({
  name,
  email,
  phone,
  password,
  role,
}: { name?: string; email: string; phone?: string; password: string; role?: "ADMIN" | "LEAD" }) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("Email já cadastrado");

  const hash = await bcrypt.hash(password, 10);
  const disableVerification =
    process.env.DISABLE_EMAIL_VERIFICATION === "true" || process.env.NODE_ENV !== "production";
  const verificationToken = disableVerification ? null : crypto.randomUUID();
  const verificationExpires = disableVerification
    ? null
    : new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

  const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const user = await tx.user.create({
      data: {
        name,
        email,
        phone,
        passwordHash: hash,
        emailVerified: disableVerification ? new Date() : null,
        verificationToken,
        verificationExpires,
      },
    });

    if (role === "ADMIN") {
      await tx.$executeRaw`update "User" set role = 'ADMIN'::"UserRole" where id = ${user.id}`;
    }

    const marketingLeadId = crypto.randomUUID();
    await tx.$executeRaw`insert into "Lead" (id, email) values (${marketingLeadId}, ${email}) on conflict (email) do nothing`;
    await tx.$executeRaw`
      update "Lead"
      set name = coalesce(${name ?? null}, name),
          phone = coalesce(${phone ?? null}, phone),
          "userId" = coalesce(${user.id}, "userId")
      where email = ${email}
    `;

    let leadId: string | null = null;
    if ((role ?? "LEAD") === "LEAD") {
      const newId = crypto.randomUUID();
      await tx.$executeRaw`insert into "UserLead" (id, "userId") values (${newId}, ${user.id}) on conflict ("userId") do nothing`;
      const row = (await tx.$queryRaw`select id from "UserLead" where "userId" = ${user.id} limit 1`) as { id: string }[];
      leadId = row[0]?.id ?? newId;
    }

    return { user, leadId };
  });

  return {
    user: result.user,
    lead: result.leadId ? { id: result.leadId } : null,
    verificationToken,
    verificationUrl: verificationToken
      ? `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify?email=${encodeURIComponent(
          email
        )}&token=${verificationToken}`
      : null,
  };
}

export async function loginUser({ email, password }: { email: string; password: string }) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Credenciais inválidas");

  const disableVerification =
    process.env.DISABLE_EMAIL_VERIFICATION === "true" || process.env.NODE_ENV !== "production";
  if (!disableVerification && !user.emailVerified)
    throw new Error("Verifique seu email antes de entrar");

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error("Credenciais inválidas");

  return await createSession(user.id, email, user.name, user.phone);
}

export async function loginUserByEmail(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Usuário não encontrado");

  return await createSession(user.id, email, user.name, user.phone);
}

async function createSession(userId: string, email: string, name?: string | null, phone?: string | null) {
  const token = crypto.randomUUID();
  const expires = new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);

  await prisma.session.create({
    data: { sessionToken: token, userId, expires },
  });

  const marketingLeadId = crypto.randomUUID();
  await prisma.$executeRaw`insert into "Lead" (id, email) values (${marketingLeadId}, ${email}) on conflict (email) do nothing`;
  await prisma.$executeRaw`
    update "Lead"
    set name = coalesce(${name ?? null}, name),
        phone = coalesce(${phone ?? null}, phone),
        "userId" = coalesce(${userId}, "userId")
    where email = ${email}
  `;

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    expires,
    secure: process.env.NODE_ENV === "production",
  });

  return { userId };
}

export async function logoutUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    await prisma.session.deleteMany({ where: { sessionToken: token } });
    cookieStore.set(SESSION_COOKIE, "", { path: "/", expires: new Date(0) });
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const session = await prisma.session.findUnique({ where: { sessionToken: token } });
  if (!session || session.expires < new Date()) return null;
  return session;
}

export async function verifyEmail({ email, token }: { email: string; token: string }) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Usuário não encontrado");
  if (user.emailVerified) return true;
  if (!user.verificationToken || user.verificationToken !== token) throw new Error("Token inválido");
  if (!user.verificationExpires || user.verificationExpires < new Date()) throw new Error("Token expirado");

  await prisma.user.update({
    where: { id: user.id },
    data: { emailVerified: new Date(), verificationToken: null, verificationExpires: null },
  });

  return true;
}
