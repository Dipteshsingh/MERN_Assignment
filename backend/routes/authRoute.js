import express from 'express'
import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt'
const authRouter = express.Router();
authRouter.post("/create-admin", async (req, res) => {
  const hashedPassword = await bcrypt.hash("12345", 10);

  const user = await userModel.create({
    email: "123@gmail.com",
    password: hashedPassword,
  });

  res.json(user);
});

export default authRouter;