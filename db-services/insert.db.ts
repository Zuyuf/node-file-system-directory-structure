import sqlite3 from 'sqlite3';
import { Database } from 'sqlite';
import { IFileSystemDto } from '../types/file-system-dto.type';
import { transaction } from './index.db';


export async function bulkInsert(DB: Database<sqlite3.Database, sqlite3.Statement>, eles: IFileSystemDto[]) {
    try {
        if (!eles.length) return true;
        
        const cols = Object.keys(eles[0]);
        const valPlaceHolder = `(${Array(cols.length).fill('?').join(',')})`;

        let insertQuery = `INSERT INTO file_systems (${cols.join(',')}) VALUES ${valPlaceHolder}`;
        let insertParams = Object.values(eles[0]);

        for (let i = 1; i < eles.length; i++) {
            insertQuery += `, ${valPlaceHolder}`;
            insertParams.push(...Object.values(eles[i]))
        }

        await transaction(DB, () => DB.run(insertQuery, insertParams));
        return true
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
