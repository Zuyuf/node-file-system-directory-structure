import { getDbConnection } from './index';

(
    
    async () => {
        try {
            const DB = await getDbConnection();

            await DB.exec(`CREATE TABLE file_systems (
                id              INTEGER     PRIMARY KEY AUTOINCREMENT,
                element_name    VARCHAR(255)    NOT NULL,
                element_type    INT     NOT NULL,
                content         TEXT    NOT NULL,
                created_at      TEXT    NOT NULL,
                updated_at      TEXT    NOT NULL
            )`);
        }
        catch (error) {
            console.error(error);
        }
    }

)();