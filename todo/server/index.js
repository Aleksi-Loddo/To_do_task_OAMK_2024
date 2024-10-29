
import express from 'express';
import cors from 'cors';
import todorouter from './routers/todoRouter.js';
import dotenv from 'dotenv';
import userrouter from './routers/userRouter.js';

const port = process.env.PORT || 3001; // why undefined without or condition?

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', todorouter);
app.use('/user', userrouter);

app.listen(port);

app.use((err,req,res,next) => {
  const status = err.status || 500;
  res.status(status).json({error: err.message});
});


