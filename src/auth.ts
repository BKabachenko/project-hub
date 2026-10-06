import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

import { PrismaAdapter } from '@auth/prisma-adapter';

import prisma from '@/lib/prisma';

const publicRoutes = new Set(['/', '/feed', '/projects', '/impact']);
const guestOnlyRoutes = new Set(['/login']);

const restrictedProjectSubroutes = new Set(['create']);

const PROJECT_DETAILS_ROUTE_REGEX = /^\/projects\/(?<slug>[^/]+)\/?$/;

const isPublicRoute = (pathname: string): boolean => {
  const normalizedPath = decodeURIComponent(pathname).toLowerCase();

  if (publicRoutes.has(normalizedPath)) return true;

  const slug = normalizedPath.match(PROJECT_DETAILS_ROUTE_REGEX)?.groups?.slug;
  if (!slug) return false;

  return !restrictedProjectSubroutes.has(slug);
};

const isGuestOnlyRoute = (pathname: string): boolean => {
  const normalizedPath = decodeURIComponent(pathname).toLowerCase();
  return guestOnlyRoutes.has(normalizedPath);
};

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        if (profile?.email_verified !== true) {
          return false;
        }
      }

      if (account?.provider === 'github') {
        if (!user.email) {
          return false;
        }
      }

      return true;
    },
    authorized: ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      if (isPublicRoute(pathname)) {
        return true;
      }

      if (isGuestOnlyRoute(pathname)) {
        return isLoggedIn ? Response.redirect(new URL('/dashboard', nextUrl)) : true;
      }

      return isLoggedIn;
    },
  },
});
