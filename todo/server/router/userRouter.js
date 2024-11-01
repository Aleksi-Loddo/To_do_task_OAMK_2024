import { pool } from "../helper/db.js";
import { Router } from "express";
import { hash,compare } from "bcrypt";
import jwt from "jsonwebtoken";
const {sign} = jwt;

const userrouter = Router();

userrouter.post('/register', async (req,res,next) => {
    hash(req.body.password, 10, (error, hashedpasssword) => {
        if (error)
            return next(error) //hash error
        try{
            pool.query('INSERT INTO account (email, password) VALUES ($1, $2) RETURNING *',
                [req.body.email, hashedpasssword], 
                (error,result) => {
                    if (error) {
                        return next(error) //database error
                    }
                    return res.status(201).json({id: result.rows[0].id, email: result.rows[0].email})
            
                } 
            )
        }
          catch (error) {
            return next(error); //try error
        }
    })
})

    userrouter.post('/login',(req,res,next) => {
        //console.log('Login attempt:', req.body); // debuging the login attempt

        const invalid_message = 'Invalid credentials'
        
        try {
            pool.query("SELECT * FROM account WHERE email = $1",
                [req.body.email],
                 (error, result) => {
                    if (error) {
                        return next(error); // database error
                    } 

                    if (result.rowCount === 0) return next(new Error(invalid_message)) 
                    
                    const user = result.rows[0];

                    compare(req.body.password, user.password, (error, match) => {
                        if (error) {
                            return next(error);
                        }

                        if (!match) return next(new Error(invalid_message));

                        const token = sign({user: req.body.email}, process.env.JWT_SECRET_KEY);
                        //const user = result.rows[0];
                        return res.status(200).json(
                        {
                            'id': user.id,
                            'email': user.email,
                           'token': token
                        }
                    );
                });
            }
        );
    } catch (error) {
        return next(error);
    }
});


export default userrouter;