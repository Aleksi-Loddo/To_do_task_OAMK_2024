import fs from 'fs';
import path from 'path';
import {pool} from './db.js';
import {hash} from 'bcrypt';
import sign from 'jsonwebtoken';

const __dirname = import.meta.dirname

const initializeTestDb = () => {
  /*  const sql = fs.readFileSync(path.resolve(__dirname,"../todo.sql"), 'utf-8');
    pool.query(sql)
    */
    try {
        const sqlPath = path.resolve(__dirname, "../todo.sql");
        const sql = fs.readFileSync(sqlPath, 'utf-8');
        pool.query(sql);
        console.log(sql)
    } catch (error) {
        console.error("Error initializing the test database:", error);
        throw error; // Rethrow the error after logging
    }
    
};

const getToken = (email) => {
    return sign({user: email}, process.env.JWT_SECRET_KEY);
}

const insertTestUser = (email, password) => {
    hash(password, 10, (error, hashedpassword) => {
        pool.query('insert into account(email, password) values ($1, $2)', 
            [email,hashedpassword])
        })    

};  

   

export {initializeTestDb, insertTestUser, getToken};