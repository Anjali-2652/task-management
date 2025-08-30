// src/Components/Home.jsx
import { Link } from "react-router-dom";


export const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-white to-teal-200 flex flex-col">
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-rose-700 leading-tight">
          Organize Your Work, <br /> Boost Your Productivity 🚀
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl">
          Manage tasks seamlessly with our modern task management app. Stay
          focused, collaborate with your team, and get things done beautifully.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex gap-4">
          <Link
            to="/create-task"
            className="px-6 py-3 rounded-xl bg-teal-600 text-white font-semibold shadow-lg hover:bg-teal-900 transition"
          >
            Create a Task
          </Link>
          <Link
            to="/about"
            className="px-6 py-3 rounded-xl border-2 border-teal-600 text-teal-600 font-semibold hover:bg-teal-100 transition"
          >
            Learn More
          </Link>
        </div>
      </section>

    </div>
  );
};
