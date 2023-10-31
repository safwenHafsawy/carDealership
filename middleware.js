import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const protectedRoutes = ["/login"];

async function middleware(req) {
  const token = await getToken({ req });

  const isAuth = !!token;

  if (isAuth && protectedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export default middleware;
