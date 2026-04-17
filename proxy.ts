import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/checkout(.*)",
  "/dashboard(.*)",
  "/admin(.*)",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isProtectedRoute(req)) return;

  const { userId, sessionClaims, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn({ returnBackUrl: req.url });

  const metadata = (sessionClaims?.metadata ?? {}) as {
    age_verified?: boolean;
    role?: string;
  };

  if (!metadata.age_verified) {
    return NextResponse.redirect(new URL("/sign-up?reason=age", req.url));
  }

  if (isAdminRoute(req) && metadata.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
