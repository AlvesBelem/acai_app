import { Button } from "@/components/ui/button";
import { PlatformHeader } from "../_components/platform-header";
import { PlatformShell } from "../_components/platform-shell";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function PlataformaPage() {
  const session = await getSession();
  const cookieStore = await cookies();
  const leadCookie = cookieStore.get('lead_id')?.value ?? null;
  if (!session && !leadCookie) redirect("/login");
  const HOTMART_URL = "https://app.hotmart.com";

  let role: 'ADMIN' | 'LEAD' = 'LEAD';
  let user: { name?: string|null, email?: string|null } | undefined = undefined;
  if (session) {
    const rows = (await prisma.$queryRaw`SELECT name, email, role FROM "User" WHERE id = ${session.userId} LIMIT 1`) as { name: string|null, email: string, role: 'ADMIN' | 'LEAD' }[];
    const row = rows[0];
    if (row) {
      user = { name: row.name, email: row.email };
      role = row.role;
    }
  }
  type LeadRow = { id: string; name: string | null; phone: string | null; email: string; createdAt: string };
  // Garante coluna archivedAt para bancos antigos
  if (role === 'ADMIN') {
    await prisma.$executeRaw`ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "archivedAt" timestamp NULL`;
  }
  const leads = role === 'ADMIN'
    ? ((await prisma.$queryRaw`SELECT id, name, phone, email, "createdAt" FROM "Lead" WHERE "archivedAt" IS NULL ORDER BY "createdAt" DESC LIMIT 200`) as LeadRow[])
    : [];

  type ProductRow = { id: string; name: string; description: string | null; priceCents: number; createdAt: string };
  const products = (await prisma.$queryRaw`SELECT id, name, description, "priceCents", "createdAt" FROM "Product" ORDER BY "createdAt" DESC LIMIT 200`) as ProductRow[];

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <div className="max-w-7xl mx-auto p-6">
        <PlatformHeader user={user} />
        <PlatformShell role={role} initialLeads={leads} initialProducts={products} />
      </div>
    </div>
  );
}
