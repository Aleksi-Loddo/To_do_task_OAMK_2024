import { pool } from "../helper/db.js";
import { Router } from "express";
import { empty0rRows } from "../helper/util.js";
import {auth} from '../helper/auth.js';

const todorouter = Router();


// getting all the tasks
todorouter.get('/', (req,res,next) => {
    
    pool.query('select * from task', (error, result) => {
      if (error) {
        return next(error);
      } 
      console.log(result)

      return res.status(200).json(empty0rRows(result));
      });

     

  });
  
  //  posting a new task
  todorouter.post('/create', auth, (req, res) => {
       
      pool.query('insert into task (description) values ($1) returning *', 
          [req.body.description], (error,result) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }
        return res.status(201).json({id: result.rows[0].id});
      });
  }); 
  
  // deleting a task
  todorouter.delete('/delete/:id', (req, res) => {
             
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
  
export default todorouter;