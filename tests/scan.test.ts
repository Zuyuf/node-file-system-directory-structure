import { scan } from "..";
import { ELEMENT_TYPE } from "../config/file-types.constant";
import { getDbConnection } from "../db";
import { bulkInsert } from "../db-services/insert.db";
import { setupDB } from "../db/db_setup_utils";
import { file_systems_seed } from "../db/seed_data";


const DB_PATH = './tests/scan.test.db';
async function setup() {
    await setupDB('./tests/scan.test.db')
    const DB = await getDbConnection(DB_PATH);
    await bulkInsert(DB, file_systems_seed)
}

beforeAll(async () => {
    await setup();
})



describe('Scan', () => {
    test("Should throw when dirPath=''", async () => {
        try {
            const DB = await getDbConnection(DB_PATH);
            await scan('', DB);
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect((error as Error).message).toEqual('Invalid dirPath');
        }
    });

    test("Should throw when first char of dirPath='a' instead of '/'", async () => {
        try {
            const DB = await getDbConnection(DB_PATH);
            await scan('a', DB);
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect((error as Error).message).toEqual('Invalid dirPath');
        }
    });

    test("Should return when dirPath='/'", async () => {
        const DB = await getDbConnection(DB_PATH);
        const result = await scan('/', DB);

        expect(result).not.toEqual(null);
        expect(result?.length).toBeGreaterThan(0);
    });

    test("Should throw when subDirPath doesnot exist, dirPath='/abcd'", async () => {
        try {
            const DB = await getDbConnection(DB_PATH);
            await scan('/abcd', DB);
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect((error as Error).message).toEqual('Invalid SubDirPath');
        }
    });

    test("Should throw when subDirPath isnot FOLDER type, dirPath='/IN/KA/capital.txt'", async () => {
        try {
            const DB = await getDbConnection(DB_PATH);
            await scan('/IN/KA/capital.txt', DB);
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect((error as Error).message).toEqual('Element is not a folder');
        }
    });

    test("Should return null when dirPath doesnot have any elements, dirPath='/US/TX'", async () => {
        const DB = await getDbConnection(DB_PATH);
        const result = await scan('/US/TX', DB);

        expect(result).toEqual(null);
    });
});

