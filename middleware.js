import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

async function middleware(req) {
  const token = await getToken({ req });
  console.log(token);
  const isAuth = !!token;

  //check if user is authenticated and trying to access login page again
  const authRoutes = new RegExp("/login|/signup");
  if (isAuth && authRoutes.test(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  //check if user is not admin and trying to access dashboard page
  const adminRoutes = new RegExp("/dashboard");
  if (adminRoutes.test(req.nextUrl.pathname) && token?.userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // check if user is authenticated before showing rented cars
  if (!isAuth && req.nextUrl.pathname === "/rentedCars") {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export default middleware;
