import XLSX from 'xlsx'
import agentModel from '../models/agentModel.js';
import taskModel from '../models/taskModel.js';

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const workbook = XLSX.read(req.file.buffer, {
      type: "buffer",
    });

    const sheetName = workbook.SheetNames[0];

    const data = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheetName]
    );

    console.log(data);
    if (!data.length) {
      return res.status(400).json({
        message: "File is empty",
      });
    }

    const agents = await agentModel.find();
    if (agents.length < 5) {
      return res.status(400).json({
        message: "Minimum 5 agents required",
      });
    }

    const tasks = [];
    for (let i = 0; i < data.length; i++) {
      const row = data[i]
      tasks.push({
        firstName: row.FirstName,
        phone: row.Phone,
        notes: row.Notes || "",
        assignedAgent:
          agents[i % agents.length]._id,
      })
    }

    await taskModel.insertMany(tasks);
    res.status(201).json({
      message: "Tasks distributed successfully",
      totalTasks: tasks.length,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

const getDistributedTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find()
      .populate("assignedAgent", "name email")
      .sort({ createdAt: -1 })

    return res.status(200).json(tasks);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

const getTasksByAgent = async (req, res) => {
  try {
    const agents = await agentModel.find();
    const result = []

    for (let agent of agents) {
      const tasks = await taskModel.find({
        assignedAgent: agent._id
      })
      result.push({
        agent,
        tasks,
      });
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export { uploadFile, getDistributedTasks, getTasksByAgent }