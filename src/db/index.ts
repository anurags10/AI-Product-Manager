import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@/db/schema';
import dotenv from 'dotenv';
dotenv.config();

const client = postgres(process.env.DATABASE_URL as string, { prepare: false });
console.log('DATABASE_URL:', process.env.DATABASE_URL);

export const db = drizzle(client, { schema, logger: true });
