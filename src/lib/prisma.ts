import { PrismaClient } from "@prisma/client";
import { createClient } from "@libsql/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  let remoteUrl = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  console.log("Prisma Client: Checking environment for Turso...");
  console.log("Remote URL present:", !!remoteUrl);
  console.log("Auth Token present:", !!authToken);

  // Use the libsql adapter when BOTH TURSO_DATABASE_URL and TURSO_AUTH_TOKEN are present
  if (remoteUrl && authToken) {
    console.log("Prisma Client: Initializing LibSQL adapter for remote Turso DB...");
    
    // In some environments, the libsql client likes libsql:// or https://. 
    // Usually libsql:// is fine for the client, but let's ensure it's correct.
    
    const libsql = createClient({ url: remoteUrl, authToken });
    const adapter = new PrismaLibSQL(libsql);
    return new PrismaClient({
      adapter,
      log: ["error", "warn"],
    } as any);
  }

  console.log("Prisma Client: Falling back to local SQLite...");
  // Fallback to regular local SQLite for local development
  return new PrismaClient({
    log: ["error", "warn"],
  });
}

let prismaClientInstance: PrismaClient | undefined;

export const prisma = new Proxy({} as PrismaClient, {
  get(target, prop) {
    if (!prismaClientInstance) {
      prismaClientInstance = globalForPrisma.prisma ?? createPrismaClient();
      if (process.env.NODE_ENV !== "production") {
        globalForPrisma.prisma = prismaClientInstance;
      }
    }
    return (prismaClientInstance as any)[prop];
  }
});
