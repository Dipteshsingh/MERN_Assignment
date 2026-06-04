import { useState } from "react";
import axios from "axios";

const Upload = () => {
  const baseUrl = "https://mern-assignment-3-ric0.onrender.com"

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      return setMessage("Please select a file");
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setMessage("");

      const res = await axios.post(
        `
        ${baseUrl}/api/tasks/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(
        res.data.message ||
        "File uploaded successfully"
      );

      setFile(null);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Upload Leads File
      </h1>

      <form
        onSubmit={handleUpload}
        className="border rounded-lg p-6"
      >
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Select CSV / XLS / XLSX File
          </label>

          <input
            type="file"
            accept=".csv,.xls,.xlsx"
            onChange={handleFileChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {file && (
          <p className="mb-4 text-sm">
            Selected: {file.name}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-5 py-2 rounded"
        >
          {loading
            ? "Uploading..."
            : "Upload File"}
        </button>
      </form>

      {message && (
        <div className="mt-4 p-3 border rounded">
          {message}
        </div>
      )}
    </div>
  );
};

export default Upload;
