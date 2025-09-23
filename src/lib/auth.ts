import { cookies } from "next/headers";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

const SESSION_COOKIE = "session";
const SESSION_TTL_DAYS = 30;

export async function registerUser({
  name,
  email,
  phone,
  password,
}: { name?: string; email: string; phone?: string; password: string }) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("Email já cadastrado");
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, phone, passwordHash: hash },
  });
  return user;
}

export async function loginUser({ email, password }: { email: string; password: string }) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Credenciais inválidas");
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error("Credenciais inválidas");

  const token = crypto.randomUUID();
  const expires = new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);
  await prisma.session.create({
    data: { sessionToken: token, userId: user.id, expires },
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    expires,
    secure: true,
  });

  return { userId: user.id };
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

