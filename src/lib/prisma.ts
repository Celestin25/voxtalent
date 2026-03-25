import { PrismaClient } from "@prisma/client";
import { createClient } from "@libsql/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const tursoUrl = process.env.TURSO_DATABASE_URL;
  const tursoToken = process.env.TURSO_AUTH_TOKEN;

  if (tursoUrl && tursoToken) {
    console.log("Prisma Client: ☁️ Using REMOTE Turso (LibSQL Adapter)...");
    const libsql = createClient({
      url: tursoUrl,
      authToken: tursoToken,
    });
    const adapter = new PrismaLibSQL(libsql);
    return new PrismaClient({ adapter } as any);
  }

  console.log("Prisma Client: 🏠 Using LOCAL SQLite (prisma/dev.db)...");
  return new PrismaClient({
    log: ["error", "warn"],
  });
}

let prismaClientInstance: PrismaClient | undefined;

export const prisma = new Proxy({} as PrismaClient, {
  get(target, prop) {
    if (!prismaClientInstance) {
      if (typeof window === "undefined") {
        prismaClientInstance = globalForPrisma.prisma ?? createPrismaClient();
        if (process.env.NODE_ENV !== "production") {
          globalForPrisma.prisma = prismaClientInstance;
        }
      }
    }
    return (prismaClientInstance as any)[prop];
  }
});
