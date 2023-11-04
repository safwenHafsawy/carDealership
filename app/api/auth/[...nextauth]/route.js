import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/prisma/prisma";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",

      async authorize(credentials) {
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
      },
    }),
  ],

  callbacks: {
    session: async ({ session }) => {
      if (!session) return;

      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });

      session.user = {
        ...session.user,
        image: user.image,
        role: user.Role,
      };

      return session;
    },
  },
});

export { handler as GET, handler as POST };
