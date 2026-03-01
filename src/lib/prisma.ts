import { PrismaClient } from "@/generated/prisma";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma =
  global.prisma ||
  new PrismaClient({
    adapter: new PrismaBetterSqlite3({
      url: "file:./dev.db",
    }),
  });

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;
