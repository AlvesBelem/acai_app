// app/plataforma/page.tsx
import { PlatformShell } from "../_components/platform-shell";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function PlataformaPage() {
  const session = await getSession();
  const cookieStore = await cookies();
  const leadCookie = cookieStore.get("lead_id")?.value ?? null;

  if (!session && !leadCookie) {
    redirect("/login");
  }

  let role: "ADMIN" | "LEAD" = "LEAD";
  if (session) {
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { role: true },
    });
    if (user?.role === "ADMIN") role = "ADMIN";
  }

  const leads =
    role === "ADMIN"
      ? await prisma.lead.findMany({
        take: 200,
        orderBy: { createdAt: "desc" },
      })
      : [];

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <div className="max-w-7xl mx-auto p-6">
        <PlatformShell role={role} initialLeads={leads} initialProducts={products} />
      </div>
    </div>
  );
}