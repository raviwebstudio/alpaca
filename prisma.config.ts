import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.runtime.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: "file:./alpaca-db-link/alpaca.db",
  },
});
