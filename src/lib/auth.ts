import { prisma } from "./prisma";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

const SESSION_COOKIE = "session";
const SESSION_TTL_DAYS = 7;

// ==============================
// LOGIN
// ==============================
export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.passwordHash) {
    throw new Error("Credenciais inválidas");
  }

  const disableVerification =
    process.env.DISABLE_EMAIL_VERIFICATION === "true" ||
    process.env.NODE_ENV !== "production";

  if (!disableVerification && !user.emailVerified) {
    throw new Error("Verifique seu e-mail antes de entrar");
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) throw new Error("Credenciais inválidas");

  const sessionToken = crypto.randomUUID();
  const expires = new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);

  await prisma.session.create({
    data: {
      sessionToken,
      userId: user.id,
      expires,
    },
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires,
  });

  return { userId: user.id };
}

// ==============================
// LOGOUT
// ==============================
export async function logoutUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) return;

  await prisma.session.deleteMany({
    where: { sessionToken: token },
  });

  cookieStore.set(SESSION_COOKIE, "", {
    path: "/",
    expires: new Date(0),
  });
}

// ==============================
// GET SESSION
// ==============================
export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) return null;

  const session = await prisma.session.findUnique({
    where: { sessionToken: token },
    include: { user: true },
  });

  if (!session || session.expires < new Date()) return null;

  return {
    userId: session.user.id,
    email: session.user.email,
    role: session.user.role,
    name: session.user.name,
    phone: session.user.phone,
  };
}
