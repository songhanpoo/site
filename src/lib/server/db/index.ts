import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { building } from '$app/environment';

import * as schema from './schema';
import { DATABASE_URL } from '$env/static/private';

if (!building && !DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

const connectionString = building || !DATABASE_URL
  ? 'postgres://postgres:postgres@localhost:5432/db'
  : DATABASE_URL;

const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });
