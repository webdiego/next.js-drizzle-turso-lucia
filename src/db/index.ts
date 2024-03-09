import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import "dotenv/config";
import dotenv from "dotenv";
import * as schema from "../db/schema/user"; // import schema

dotenv.config({
  path: ".env.local",
});

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_DATABASE_AUTH_TOKEN!,
});
const db = drizzle(client, { schema: schema }); // pass schema to drizzle

export default db;
