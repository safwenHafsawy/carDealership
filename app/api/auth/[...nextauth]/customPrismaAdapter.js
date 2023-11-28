import { PrismaAdapter } from "@next-auth/prisma-adapter";

export default function customPrismaAdapter(prisma) {
  return {
    ...PrismaAdapter(prisma),
    createUser: (data) => {
      const { emailVerified, ...newData } = data;
      return prisma.user.create({ data: newData });
    },
  };
}
