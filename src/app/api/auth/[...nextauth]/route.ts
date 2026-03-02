/**
 * NextAuth Configuration with Custom Credentials Provider
 *
 * This implements secure custom authentication with:
 * - Email/password credentials authentication
 * - Role-based access control (ADMIN/USER)
 * - JWT-based session management
 * - Secure password hashing with bcrypt
 *
 * Extend this by adding more providers or modifying callbacks
 */

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../lib/prisma";
import { verifyPassword, isValidEmail } from "../../../../lib/auth";
import type { NextAuthOptions } from "next-auth";

/**
 * NextAuth configuration with custom credentials provider
 * Configure environment variables:
 * - NEXTAUTH_SECRET: Random string for JWT encryption
 * - NEXTAUTH_URL: Application URL (e.g., http://localhost:3000)
 */
export const authOptions: NextAuthOptions = {
  // Use JWT strategy for stateless session management
  session: {
    strategy: "jwt" as const,
    maxAge: 24 * 60 * 60, // 24 hours
  },

  // Custom credentials provider for email/password authentication
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "user@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      /**
       * Authorize user with email and password
       * @param credentials - User provided email and password
       * @returns User object if valid, null if invalid
       */
      async authorize(credentials) {
        // Validate input
        if (
          !credentials?.email ||
          !credentials?.password ||
          !isValidEmail(credentials.email)
        ) {
          throw new Error("Invalid email or password format");
        }

        try {
          // Find user by email
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            throw new Error("No user found with this email");
          }

          // Verify password
          if (!user.password) {
            throw new Error("User account not properly configured");
          }

          const isPasswordValid = await verifyPassword(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          // Return user object for session
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth error:", error);
          throw error;
        }
      },
    }),
  ],

  /**
   * JWT callback - customize token contents
   * Add user role and id to JWT for authorization checks
   */
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.email = user.email;
      }
      return token;
    },

    /**
     * Session callback - customize session object
     * Make role available in session for frontend authorization
     */
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },

  // Configure sign-in and error pages
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
