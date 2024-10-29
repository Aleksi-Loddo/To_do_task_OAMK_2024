
import express from 'express';
import cors from 'cors';
import router from './router/todoRouter.js';


const port = process.env.PORT || 3001; // why undefined without or condition?

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', router);

app.listen(port);

app.use((err,req,res,next) => {
  const status = err.status || 500;
  res.status(status).json({error: err.message});
});


