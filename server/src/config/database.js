import { PrismaClient } from "@prisma/client";

const prisma =
  process.env.NODE_ENV === "test"
    ? new PrismaClient({
        log: ["error"]
    })
    : new PrismaClient({
        log: ["query", "info", "warn", "error"],
      });

export default prisma;
