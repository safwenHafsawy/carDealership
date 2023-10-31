import prisma from "@/prisma/prisma";
import bcrypt from "bcrypt";

export const POST = async (request) => {
  try {
    const data = await request.json();

    //checking the user existence
    const user = await prisma.user.findUnique({
      where: {
        email: data.username,
      },
    });

    if (user)
      return new Response("Username or email are already used !", {
        status: 401,
      });

    return new Response("Hello", { status: 200 });
  } catch (error) {
    return new Response("Bad request", { status: 400 });
  }
};
