import sqlite3 from 'sqlite3';
import { Database } from 'sqlite';

import { ENV } from './config';
import { ELEMENT_TYPE } from './config/file-types.constant';

import { getDbConnection } from './db';
import { getChildElementsByParentId, getElement } from './db-services/get.db';

import { getPathObj } from './services';
import { IFileSystemDto } from './types/file-system-dto.type';

//

export async function scan(dirPath: string, _DB?: Database<sqlite3.Database, sqlite3.Statement>) {
    if (!dirPath.length || dirPath[0] !== '/') {
        throw new Error('Invalid dirPath');
    }

    const DB = _DB ?? await getDbConnection(ENV.DB_PATH);
    const path = getPathObj(dirPath);

    if (['', '.', '/'].includes(path.path[0])) path.path[0] = '/';
    else throw new Error('Invalid dirPath');

    //
    let pervEle = await getElement(DB, path.path[0]);
    if (!pervEle) throw new Error('Invalid root path');

    // Check if Sub Folders/File exists
    let curEle: IFileSystemDto | undefined = pervEle;
    for (let i = 1; i < path.path.length; i++) {
        curEle = await getElement(DB, path.path[i], pervEle.id);
        
        if (!curEle) throw new Error('Invalid SubDirPath');
        pervEle = curEle;
    }

    // for Scan last Element must be FOLDER type
    if (!curEle) throw new Error('Invalid dirPath');
    if (curEle.element_type !== ELEMENT_TYPE.FOLDER) throw new Error('Element is not a folder');

    // get Elements in dirPath
    const childEles = await getChildElementsByParentId(DB, curEle.id);

    // return Elements if exists else null
    return childEles && childEles.length ? childEles : null;
}
