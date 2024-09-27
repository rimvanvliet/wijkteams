import {Pool} from 'pg';

export const pool: Pool = new Pool({
    user:'wt',
    password:'wt',
    host:'127.0.0.1',
    port:5432,
    database: 'wt',
})
