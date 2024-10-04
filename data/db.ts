import {Pool} from 'pg';

export const pool: Pool = new Pool(
    {
    user: process.env.PGUSER,
    password:process.env.PGPASSWORD,
    host:process.env.PGHOST,
    port:5432,
    database:process.env.PGDATABASE,
})
