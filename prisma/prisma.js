import { PrismaClient } from "@prisma/client";

let prisma;

//check if we are running in production mode
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  //check if there is already a connection to the database
  if (!globalThis.db) {
    globalThis.prisma = new PrismaClient();
  }
  prisma = globalThis.prisma;
}

export default prisma;
