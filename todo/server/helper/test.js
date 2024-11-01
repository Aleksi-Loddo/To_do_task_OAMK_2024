import fs from 'fs';
import path from 'path';
import {pool} from '../helper/db.js';
//import {sign} from 'crypto';
import { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

const _dirname = import.meta.dirname;

const initializeTestDb = async () => {

const sql = fs.readFileSync(path.resolve(_dirname, "../todo.sql"), "utf-8");
    pool.query(sql)
}

const insertTestUser = (email, password) => {
    hash(password, 10,  (error, hashedpassword) => {
        pool.query('INSERT INTO account (email, password) values ($1, $2) returning *',
            [email, hashedpassword])
    })
}      
const getToken = async (email) => {
    return jwt.sign({user: email}, process.env.JWT_SECRET_KEY);
}

export {initializeTestDb, insertTestUser, getToken};