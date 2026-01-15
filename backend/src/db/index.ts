import { drizzle } from 'drizzle-orm/postgres-js'
// @ts-expect-error - postgres types work at runtime
import postgres from 'postgres'
import * as schema from './schema.js'

const connectionString = process.env.DATABASE_URL!
const client = postgres(connectionString)
export const db = drizzle(client, { schema })
