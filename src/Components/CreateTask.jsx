import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../Firebase";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

export const CreateTask = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [user, loadingUser] = useAuthState(auth);
  const navigate = useNavigate();

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!user) {
      setError("You must be logged in to create a task.");
      setLoading(false);
      return;
    }

    if (!task.title || !task.description || !task.dueDate) {
      setError("Please fill all fields.");
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, "tasks"), {
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate,
        completed: false,
        createdBy: user.uid,
        createdAt: serverTimestamp(),
      });

      // ✅ Show success message immediately
      setSuccess("Your task has been created successfully!");
      setLoading(false);
      setTask({
        title: "",
        description: "",
        priority: "Medium",
        dueDate: "",
      });

      // ✅ Optional: redirect after 3 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-rose-800 mb-6 text-center">
          Create a New Task
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label className="block text-lg font-semibold">Title:</label>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-rose-300 rounded-lg focus:ring-1 focus:ring-rose-500 focus:outline-none"
              placeholder="Enter task title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-lg font-semibold">Description:</label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              rows="4"
              className="w-full mt-1 p-3 border border-rose-300 rounded-lg focus:ring-1 focus:ring-rose-500 focus:outline-none"
              placeholder="Enter task description"
            ></textarea>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-lg font-semibold">Due Date:</label>
            <input
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-rose-300 rounded-lg focus:ring-1 focus:ring-rose-500 focus:outline-none"
            />
          </div>

          {/* Priority */}
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-600 cursor-pointer hover:bg-rose-700 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-200"
          >
            {loading ? "Creating..." : "Create Task"}
          </button>

          {/* Success & Error Messages */}
          {success && (
            <p className="text-green-600 mt-2 text-center font-medium">
              {success}
            </p>
          )}
          {error && (
            <p className="text-red-600 mt-2 text-center font-medium">
              {error}{" "}
              {!user && (
                <Link to="/login">
                  <span className="italic font-bold text-teal-800 underline">
                    Login here
                  </span>
                </Link>
              )}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};
