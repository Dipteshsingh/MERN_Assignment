import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import axios from "axios";

const Agents = () => {
  const baseUrl = "https://mern-assignment-7.onrender.com"
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchAgents = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/agent/allagents`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      setAgents(res.data.agents);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchAgents();
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`
        ${baseUrl}/api/agent/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAgents((prev) => [...prev, res.data.agent]);
      setFormData({
        name: "",
        email: "",
        mobile: "",
        password: "",
      });

    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
        "Failed to create agent"
      );
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Agent Management
      </h1>


      <form
        onSubmit={handleSubmit}
        className="border rounded-lg p-4 mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">
          Add Agent
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            name="mobile"
            placeholder="+91XXXXXXXXXX"
            value={formData.mobile}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-black text-white px-4 py-2 rounded"
        >
          {loading
            ? "Creating..."
            : "Add Agent"}
        </button>
      </form>


      <div>
        <h2 className="text-xl font-semibold mb-4">
          Agents
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent) => (
            <div
              key={agent._id}
              className="border rounded-lg p-4 shadow-sm"
            >
              <h3 className="font-bold text-lg">
                {agent.name}
              </h3>

              <p>{agent.email}</p>

              <p>{agent.mobile}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default Agents
