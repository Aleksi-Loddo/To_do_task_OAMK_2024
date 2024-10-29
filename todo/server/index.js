
import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import dotenv from 'dotenv';
const enviorment = process.env.NODE_ENV;
dotenv.config();








const { Pool } = pkg;
const port = process.env.PORT || 3001;






const openDb = () => {
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.NODE_ENV === 'development' ?  process.env.DB_NAME : process.env.TEST_DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    });
    return pool;
};

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// getting all the tasks
app.get('/', (req,res) => {
    const pool = openDb();
  pool.query('select * from task', (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json(result.rows);
    });
});

//  posting a new task
app.post('/create', (req, res) => {
     const pool = openDb();
    pool.query('insert into task (description) values ($1) returning *', 
        [req.body.description], (error,result) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(201).json({id: result.rows[0].id});
    });
}); 

// deleting a task
app.delete('/delete/:id', (req, res) => {
            const pool = openDb();
            const id = parseInt(req.params.id);
            pool.query('delete from task where id = $1', 
                [id],
                 (error, result) => {
                if (error) {
                    return res.status(500).json({ error: error.message });
                }
                return res.status(200).json({id: id });
            });
        });


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
