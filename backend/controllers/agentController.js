import agentModel from "../models/agentModel.js";
import bcrypt from 'bcrypt'

// Creating Agent -------
const addAgent = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    // Validation -
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if any existing agents -
    const existingAgent = await agentModel.findOne({ email });
    if (existingAgent) {
      return res.status(400).json({
        success: false,
        message: "Agent already exists",
      });
    }

    // Hashing Password -
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create agent -
    const agent = await agentModel.create({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Agent created successfully",
      agent: {
        _id: agent._id,
        name: agent.name,
        email: agent.email,
        mobile: agent.mobile,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get all Agents -------

const getAgents = async (req, res) => {
  try {
    const agents = await agentModel.find().select("-password");

    res.status(200).json({
      success: true,
      count: agents.length,
      agents,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

export { addAgent, getAgents };