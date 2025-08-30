import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <section className="bg-teal-600 py-16 text-center  text-white">
      <h2 className="text-3xl md:text-4xl font-bold">
        Ready to Boost Your Productivity?
      </h2>
      <p className="mt-4 text-lg">
        Join us today and manage your tasks smartly.
      </p>
      <div className="mt-6">
        <Link
          to="/signup"
          className="px-6 py-3 rounded-xl bg-white text-teal-700 font-semibold shadow hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
};
