import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";

export const EditTask = () => {
  const { id } = useParams(); // get task ID from URL
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch existing task
  useEffect(() => {
    const fetchTask = async () => {
      const docRef = doc(db, "tasks", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTask(docSnap.data());
      } else {
        setError("Task not found");
      }
      setLoading(false);
    };
    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!task.title || !task.description || !task.dueDate) {
      setError("Please fill all fields");
      return;
    }

    try {
      const docRef = doc(db, "tasks", id);
      await updateDoc(docRef, task);

      navigate("/dashboard"); // redirect after update
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading task...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-rose-800 mb-6 text-center">
          Edit Task
        </h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-lg font-semibold">Title:</label>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-rose-300 rounded-lg focus:ring-1 focus:ring-rose-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold">Description:</label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              rows="4"
              className="w-full mt-1 p-3 border border-rose-300 rounded-lg focus:ring-1 focus:ring-rose-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold">Due Date:</label>
            <input
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-rose-300 rounded-lg focus:ring-1 focus:ring-rose-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold">Priority:</label>
            <select
              name="priority"
              value={task.priority}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-rose-300 rounded-lg focus:ring-1 focus:ring-rose-500 focus:outline-none"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-rose-600 hover:bg-rose-700 cursor-pointer text-white font-semibold py-3 rounded-lg shadow-lg transition duration-200"
          >
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};
