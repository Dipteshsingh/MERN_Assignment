import express from 'express'
import { addAgent, getAgents } from '../controllers/agentController.js';
import isAuthenticated from '../middleware/auth.js';
const agentRouter = express.Router()

agentRouter.post('/create', isAuthenticated, addAgent);
agentRouter.get('/allagents', isAuthenticated, getAgents);

export default agentRouter;