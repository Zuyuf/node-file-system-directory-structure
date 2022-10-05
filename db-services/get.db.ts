import sqlite3 from 'sqlite3';
import { Database } from 'sqlite';
import { IFileSystemDto } from "../types/file-system-dto.type";


export async function getElement(DB: Database<sqlite3.Database, sqlite3.Statement>, eleName: string, parentId: number | null = null) {
    try {
        let query = `SELECT * FROM file_systems WHERE element_name = ?`;
        const queryParams: any[] = [eleName];

        if (parentId === null) {
            query += ` AND parent_id IS NULL`;
        }
        else {
            query += ` AND parent_id = ?`;
            queryParams.push(parentId);
        }

        const res = await DB.get(query, queryParams);
        return res;
    }
    catch (error) {
        console.log('ERROR: getElement  ---  ', error);
        throw error;
    }
}

export async function getChildElementsByParentId(DB: Database<sqlite3.Database, sqlite3.Statement>, parentId: number | null = null) {
    try {
        const ps = await DB.prepare(`SELECT * FROM file_systems WHERE parent_id = ?`)
        ps.bind({ 1: parentId });
    
        return await ps.all<IFileSystemDto[]>();
    }
    catch (error) {
        console.log('ERROR: getChildElementsByParentId  ---  ', error);
        throw error;
    }
}