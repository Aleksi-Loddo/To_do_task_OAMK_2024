import { pool } from "../helper/db.js";
import { Router } from "express";
import { empty0rRows } from "../helper/util.js";

const router = Router();


// getting all the tasks
router.get('/', (req,res,next) => {
    
    pool.query('select * from task', (error, result) => {
      if (error) {
        return next(error);
      }
      return res.status(200).json(empty0rRows(result));
      });
  });
  
  //  posting a new task
  router.post('/create', (req, res) => {
       
      pool.query('insert into task (description) values ($1) returning *', 
          [req.body.description], (error,result) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }
        return res.status(201).json({id: result.rows[0].id});
      });
  }); 
  
  // deleting a task
  router.delete('/delete/:id', (req, res) => {
             
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
  
export default router;