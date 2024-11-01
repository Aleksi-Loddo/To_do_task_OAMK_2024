
import pkg from 'pg';
import dotenv from 'dotenv';

const enviroment = process.env.NODE_ENV;
dotenv.config();

const { Pool } = pkg;

const openDb = () => {
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.NODE_ENV === 'development' ? process.env.DB_NAME : process.env.TEST_DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  //debuging lines for database connection
  console.log('Database connection details:', {
     enviroment,
    process: process.env.NODE_ENV,
    process1: process.env.DB_TEST_NAME,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.NODE_ENV === 'development' ? process.env.DB_NAME : process.env.DB_TEST_NAME,
    password: process.env.DB_PASSWORD, // Check if this is a string
    port: process.env.DB_PORT,
  });

  return pool;
};

const pool = openDb();

export  {pool};