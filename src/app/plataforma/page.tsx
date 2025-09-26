import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { PlatformShell } from "@/app/_components/platform-shell";

export default async function PlataformaPage() {
  const session = await getSession();

  const produtos = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  const leads =
    session?.role === "ADMIN"
      ? await prisma.lead.findMany({ orderBy: { createdAt: "desc" } })
      : [];

  return (
    <PlatformShell
      role={session?.role ?? "LEAD"}
      initialProducts={produtos}
      initialLeads={leads}
    />
  );
}
