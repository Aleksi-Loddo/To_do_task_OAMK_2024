import { pool } from "../helper/db.js";
import { Router } from "express";
import { hash,compare } from "bcrypt";
import jwt from "jsonwebtoken";
const {sign} = jwt;

const userrouter = Router();

userrouter.post('/register', async (req,res,next) => {
    hash(req.body.password, 10, async (error, hashedpasssword) => {
        if (error) next(error) //hash error
        try{
            pool.query('insert into account (email, password) values ($1, $2) returning *',
                [req.body.email, hashedpasssword], 
                (error,result) => {
                    if (error) return next(error); //database error
                    return res.status(201).json({id: result.rows[0].id, email: result.rows[0].email})
            
                } 
            )
        }
          catch (error) {
            return next(error); //try error
        }
    })
})
export default userrouter;