import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import userRouter from './routes/userRoute.js';
import authRouter from './routes/authRoute.js';
import agentRouter from './routes/agentRoute.js';
import taskRouter from './routes/taskRoute.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.get('/', (req, res) => {
  res.send("Api working");
})

app.use('/api/user', userRouter);
app.use('/api/agent', agentRouter);
app.use('/api/tasks', taskRouter);

connectDB();
app.listen(port, ()=>{
  console.log(`Server is running on port ${port}`);
  
})
