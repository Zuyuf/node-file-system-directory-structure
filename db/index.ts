import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// you would have to import / invoke this in another file
export async function getDbConnection (filename: string) {
    return open({
        filename: filename,
        driver: sqlite3.verbose().Database
    })
}