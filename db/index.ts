import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// you would have to import / invoke this in another file
export async function getDbConnection () {
    return open({
        filename: './db/fileSystem.db',
        driver: sqlite3.verbose().Database
    })
}