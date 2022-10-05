import sqlite3 from 'sqlite3';
import { Database } from 'sqlite';


export async function transaction(DB: Database<sqlite3.Database, sqlite3.Statement>, cb: () => {}) {
    try {
        DB.exec('BEGIN');
        const result = cb();
        DB.exec('COMMIT');
        return result;
    }
    catch (error) {
        DB.exec('ROLLBACK');
        throw error;
    }
}