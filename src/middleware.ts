import { NextResponse, type NextRequest } from 'next/server';
import { getUserFromSession } from './auth/core/session';
import createMiddleware from "next-intl/middleware";
import { routing } from './i18n/routing.public';

const privateRoutes = ["/private"];
const adminRoutes = ["/admin"];

const intlMiddleware = createMiddleware(routing);

export async function middleware(req: NextRequest) {
  const response = await middlewareAuth(req);
  if (response) {
    return response;
  }

  return intlMiddleware(req);
}

async function middlewareAuth(req: NextRequest) {
  if (privateRoutes.includes(req.nextUrl.pathname)) {
    const user = await getUserFromSession(req.cookies);
    if (user == null) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  if (adminRoutes.includes(req.nextUrl.pathname)) {
    const user = await getUserFromSession(req.cookies);
    if (user == null) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
    if (!user.role.includes("admin")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}
 
export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!dashboard|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};