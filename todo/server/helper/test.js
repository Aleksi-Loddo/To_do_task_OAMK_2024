import fs from 'fs';
import path from 'path';
import {pool} from '../helper/db.js';

const _dirname = import.meta.dirname;

const initializeTestDb = async () => {

const sql = fs.readFileSync(path.resolve(_dirname, "../server/todo.sql"), "utf-8");
    pool.query(sql)
}

export {initializeTestDb}