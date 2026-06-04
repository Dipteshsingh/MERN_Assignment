import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const baseUrl = "https://mern-assignment-7.onrender.com"

  const [tasks, setTasks] = useState([]);
  const [groupedTasks, setGroupedTasks] = useState({});

  const { token } = useAuth();

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/api/tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(res.data);

      const grouped = res.data.reduce((acc, task) => {
        const agentName =
          task.assignedAgent?.name || "Unknown Agent";

        if (!acc[agentName]) {
          acc[agentName] = [];
        }

        acc[agentName].push(task);

        return acc;
      }, {});

      setGroupedTasks(grouped);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

return (
  <div className="min-h-screen bg-neutral-50">
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-12">
        <p className="text-sm text-neutral-500 tracking-wide uppercase">
          Lead Management
        </p>

        <h1 className="text-4xl font-semibold text-neutral-900 mt-2">
          Dashboard
        </h1>
      </div>

      {/* Stats */}
      <div className="mb-10">
        <div className="bg-white border border-neutral-400 rounded-2xl p-6">
          <p className="text-sm text-neutral-500">
            Total Distributed Tasks
          </p>

          <h2 className="text-5xl font-semibold text-neutral-900 mt-3">
            {tasks.length}
          </h2>
        </div>
      </div>

      {/* Agents */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {Object.entries(groupedTasks).map(
          ([agentName, agentTasks]) => (
            <div
              key={agentName}
              className="bg-white border border-neutral-400 rounded-2xl"
            >
              {/* Agent Header */}
              <div className="p-6 border-b border-neutral-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-medium text-neutral-900">
                    {agentName}
                  </h2>

                  <span className="text-sm text-neutral-500">
                    {agentTasks.length} tasks
                  </span>
                </div>
              </div>

              {/* Tasks */}
              <div className="p-4">
                {agentTasks.map((task) => (
                  <div
                    key={task._id}
                    className="p-4 rounded-xl hover:bg-neutral-50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-neutral-900">
                          {task.firstName}
                        </h3>

                        <p className="text-sm text-neutral-500 mt-1">
                          {task.phone}
                        </p>
                      </div>
                    </div>

                    {task.notes && (
                      <p className="text-sm text-neutral-600 mt-3 leading-relaxed">
                        {task.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  </div>
);
};

export default Dashboard;
