import express from 'express'
import isAuthenticated from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import { getDistributedTasks, getTasksByAgent, uploadFile } from '../controllers/taskController.js';

const taskRouter = express.Router()

taskRouter.post('/upload', isAuthenticated, upload.single("file"), uploadFile);
taskRouter.get('/', isAuthenticated, getDistributedTasks);
taskRouter.get('/byagent', isAuthenticated, getTasksByAgent);

export default taskRouter;