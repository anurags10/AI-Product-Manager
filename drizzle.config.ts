import { defineConfig } from "drizzle-kit";

console.log("DATABASE_URL:", process.env.DATABASE_URL);
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./src/db/migration",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  verbose: true,
  strict: true,
});
