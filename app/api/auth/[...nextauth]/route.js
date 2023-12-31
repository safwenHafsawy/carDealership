import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/prisma/prisma";
import { checkUserCred } from "@/utils/userOperations";
import customPrismaAdapter from "./customPrismaAdapter";

export const authOptions = {
  adapter: customPrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      id: "google",
      name: "Google",
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          username: profile.given_name + "_" + profile.family_name,
          email: profile.email,
          image: profile.picture,
          phoneNumber: 0,
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",

      async authorize(credentials) {
        return await checkUserCred(credentials);
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session }) {
      //  console.log("JWT token");
      // console.log("user in jwt: ", user);
      //  console.log("token: ", token, "user: ", user, "Session: ", session);
      // console.log("--------------------------------");

      if (user) {
        console.log(user);
        return {
          ...token,
          userId: user.id,
          userRole: user.Role,
          userPicture: user.image,
        };
      }

      return token;
    },
    async session({ session, token, user }) {
      if (!session) return;

      session.user = {
        ...session.user,
        id: token.userId,
        image: token.userPicture,
        role: token.userRole,
      };
      // console.log("session: ", session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },

  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
