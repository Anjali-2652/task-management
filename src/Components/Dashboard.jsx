import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../Firebase";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "tasks"),
      where("createdBy", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskList = [];
      snapshot.forEach((doc) => {
        taskList.push({ id: doc.id, ...doc.data() });
      });
      setTasks(taskList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await deleteDoc(doc(db, "tasks", id));
    }
  };

  const handleToggleComplete = async (task) => {
    await updateDoc(doc(db, "tasks", task.id), { completed: !task.completed });
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());

    const matchesPriority =
      priorityFilter === "All" || task.priority === priorityFilter;

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Completed" && task.completed) ||
      (statusFilter === "Pending" && !task.completed);

    return matchesSearch && matchesPriority && matchesStatus;
  });

  if (loading) return <p className="text-center mt-10">Loading tasks...</p>;

  return (
    <div className=" bg-amber-50  text-center mb-10 pt-[50px] mt-10">
      <h2 className="text-4xl  text-rose-800 font-bold text-center mb-6">
        Your Tasks
      </h2>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3  w-full outline-rose-400 border-rose-400 rounded-full md:w-1/3"
        />

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="border border-rose-500 outline-rose-500  focus:ring-rose-300 cursor-pointer p-2 rounded"
        >
          <option value="All cursor-pointer">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded border-rose-500 cursor-pointer outline-rose-500 "
        >
          <option value="All">All Status</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <p className="text-center text-gray-500">
          No tasks match your criteria.
        </p>
      ) : (
        <div className=" px-20">
          <div
            className="space-y-4 justify-center w-full  gap-x-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
  mt-10 rounded-2xl"
          >
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className=" items-center p-4 bg-white shadow-xl rounded-2xl py-5 shadow-rose-300"
              >
                <div className="">
                  <h3
                    className={`font-semibold text-rose-500 text-xl mb-1 ${
                      task.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {task.title} ({task.priority})
                  </h3>
                  <p
                    className={` text-sm ${
                      task.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {task.description}
                  </p>
                  <p className="text-sm mb-3 text-gray-500">
                    Due: {task.dueDate}
                  </p>
                </div>
                <div className="grid  grid-cols-1 space-y-2 space-x-2">
                  <button
                    onClick={() => handleToggleComplete(task)}
                    className={`px-3 py-1 rounded text-white ${
                      task.completed
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-green-500 hover:bg-green-700"
                    }`}
                  >
                    {task.completed ? "Undo" : "Complete"}
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-700 text-white rounded"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/edit-task/${task.id}`}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
