import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { authConfig } from "./auth.config";

async function getUser(email: string) {
  try {
    console.log(`Auth Debug: Attempting to fetch user with email: ${email}`);
    const user = await prisma.user.findUnique({ where: { email } });
    console.log(`Auth Debug: User found: ${!!user}`);
    return user;
  } catch (error) {
    console.error("Auth Debug: Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log("Auth Debug: Authorize callback triggered");
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(3) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          let { email, password } = parsedCredentials.data;
          email = email.toLowerCase().trim();
 
          const user = await getUser(email);
          if (!user) {
            console.log(`Auth Debug: No user found for ${email}`);
            return null;
          }
 
          console.log(`Auth Debug: Comparing password for ${email}...`);
          const passwordsMatch = await bcrypt.compare(password, user.password);
          console.log(`Auth Debug: Password match result for ${email}: ${passwordsMatch}`);
          if (passwordsMatch) return user;
        } else {
          console.log("Auth Debug: Zod validation failed", parsedCredentials.error);
        }
 
        return null;
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.role = user.role;
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
  },
});
