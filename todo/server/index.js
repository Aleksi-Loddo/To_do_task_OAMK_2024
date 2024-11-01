
import express from 'express';
import cors from 'cors';
import todorouter from './router/todoRouter.js';
import userrouter from './router/userRouter.js';


const port = process.env.PORT || 3001; // why undefined without or condition?

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', todorouter);
app.use('/user', userrouter);


app.listen(port,() => {
    console.log(`Server listening on port ${port}`);
});

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(statusCode).json({ error: err.message });
});


