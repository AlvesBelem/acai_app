import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  const email = "lead2@example.com";
  const password = "123456";
  const name = "Lead de Teste";
  const phone = "91999999999";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log("⚠️ Usuário já existe. Abortando seed.");
    return;
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      phone,
      passwordHash: hash,
      emailVerified: new Date(),
      role: "LEAD",
    },
  });

  await prisma.marketingLead.create({
    data: {
      id: crypto.randomUUID(),
      email,
      name,
      phone,
      userId: user.id,
    },
  });

  await prisma.lead.create({
    data: {
      id: crypto.randomUUID(),
      userId: user.id,
      source: "Seed Script",
      status: "Novo",
      notes: "Lead gerado para testes",
    },
  });

  console.log(`✅ Usuário LEAD criado com sucesso: ${email}`);
}

main()
  .catch((e) => {
    console.error("❌ Erro ao executar seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
