import { getDbConnection } from ".";
import { ENV } from "../config";
import { bulkInsert } from "../db-services/insert.db";
import { setupDB } from "./db_setup_utils";
import { file_systems_seed } from "./seed_data";


async function setup() {
    await setupDB(ENV.DB_PATH)

    const DB = await getDbConnection(ENV.DB_PATH);
    await bulkInsert(DB, file_systems_seed)
}

setup();
