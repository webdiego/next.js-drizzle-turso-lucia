import db from "../../db";
import { sessionTable, userTable } from "../../db/schema/user";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";

const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

export default adapter;
