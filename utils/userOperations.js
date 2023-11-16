import prisma from "@/prisma/prisma";
import bcrypt from "bcrypt";

export const checkUserCred = async (credentials) => {
  try {
    const creds = await JSON.parse(credentials.data);

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: creds.username }, { username: creds.username }],
      },
    });

    if (!user) return null;

    //checking password match
    const passMatch = await bcrypt.compare(creds.password, user.password);

    if (!passMatch) return null;

    return user;
  } catch (e) {
    console.log(e);
    return null;
  }
};
