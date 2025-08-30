import React from 'react'

export const About = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Why Choose Our Task Manager?
        </h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-6 rounded-xl shadow-md bg-teal-50 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-teal-700">📌 Easy Task Creation</h3>
            <p className="mt-3 text-gray-600">
              Create and manage your tasks effortlessly with a simple and
              intuitive interface.
            </p>
          </div>
          <div className="p-6 rounded-xl shadow-md bg-teal-50 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-teal-700">📊 Track Progress</h3>
            <p className="mt-3 text-gray-600">
              Stay updated with progress charts and analytics powered by React
              Charts.
            </p>
          </div>
          <div className="p-6 rounded-xl shadow-md bg-teal-50 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-teal-700">🤝 Team Collaboration</h3>
            <p className="mt-3 text-gray-600">
              Work together with your team and keep everyone on the same page.
            </p>
          </div>
        </div>
      </section>
  )
}
