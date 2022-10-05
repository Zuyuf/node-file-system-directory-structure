import fs from 'fs';
import sqlite3 from 'sqlite3';
import { Database } from 'sqlite';
import { getDbConnection } from './index';



export async function createDbTables(DB: Database<sqlite3.Database, sqlite3.Statement>) {
    try {
        await DB.exec(`CREATE TABLE file_systems (
            id              INTEGER     PRIMARY KEY AUTOINCREMENT,
            parent_id       INTEGER,
            element_name    VARCHAR(255)    NOT NULL,
            element_type    VARCHAR(25)     NOT NULL,
            content         TEXT    NOT NULL,
            created_at      INTEGER    NOT NULL,
            updated_at      INTEGER    NOT NULL,

            FOREIGN KEY (parent_id) REFERENCES file_systems(id)
        )`);
    }
    catch (error) {
        console.error(error);
    }
}


export async function setupDB(dbpath: string, _DB?: Database<sqlite3.Database, sqlite3.Statement>) {
    try {
        if (fs.existsSync(dbpath)) fs.unlinkSync(dbpath);

        const DB = _DB ?? await getDbConnection(dbpath);
        await createDbTables(DB);
    }
    catch (error) {
        console.error(error);
    }
}
