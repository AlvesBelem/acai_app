import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// VERIFICAÇÃO ROBUSTA DA DATABASE_URL
if (!process.env.DATABASE_URL || process.env.DATABASE_URL.trim() === "") {
  throw new Error("A variável de ambiente DATABASE_URL está vazia ou não foi definida.");
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["warn", "error"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
