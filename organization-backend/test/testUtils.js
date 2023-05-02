const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config({ path: '.env.test' });

const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true
};

async function setupTestDB() {
    const sqlScript = fs.readFileSync(path.join(__dirname, 'test-database.sql'), 'utf8');
    const connection = await mysql.createConnection(dbConfig);
    await connection.query(`CREATE DATABASE ${process.env.DB_NAME}`);
    await connection.end();
    const dbOptions = Object.assign({}, dbConfig, { database: process.env.DB_NAME });
    const db = await mysql.createConnection(dbOptions);
    await db.query(sqlScript);
    await db.end();
}

async function teardownTestDB() {
    const connection = await mysql.createConnection(dbConfig);
    await connection.query(`DROP DATABASE IF EXISTS ${process.env.DB_NAME}`);
    await connection.end();
}

module.exports = {
    setupTestDB,
    teardownTestDB,
};
