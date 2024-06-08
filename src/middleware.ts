import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const { isAuthenticated } = getKindeServerSession();
  const loggedIn = await isAuthenticated();
  const isApiAuthRoute = req.nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);
  const isSignInRoute = signInRoutes.includes(req.nextUrl.pathname);

  if (isApiAuthRoute) return;
  if (!loggedIn && !isPublicRoute)
    return NextResponse.redirect(new URL("/", req.nextUrl));
  if (loggedIn && isSignInRoute)
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  return;
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

const apiAuthPrefix = "/api/auth";
const publicRoutes = ["/", "/welcome"];
const signInRoutes = ["/", "/welcome"];
