import pg from "pg";

const pool = new pg.Pool({
    user: "postgres",
    host: "localhost",
    database: "jwttutorial",
    password: "2Punit&ive",
    port: 5433
})

export default pool;