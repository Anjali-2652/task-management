import React, { useState, useEffect } from "react";
import { auth, db } from "../Firebase";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Load current user info
  useEffect(() => {
    if (auth.currentUser) {
      setName(auth.currentUser.displayName || "");
      setEmail(auth.currentUser.email);
    }
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await updateProfile(auth.currentUser, { displayName: name });
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-rose-800 mb-6 text-center">
          Profile
        </h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}

        <form className="space-y-4" onSubmit={handleUpdate}>
          <div>
            <label className="block text-lg font-semibold">Full Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 p-3 border border-rose-300 rounded-lg focus:ring-1 focus:ring-rose-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold">Email:</label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-600 hover:bg-rose-700 cursor-pointer text-white font-semibold py-3 rounded-lg shadow-lg transition duration-200"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>

        <button
          onClick={handleLogout}
          className="w-full mt-4 bg-gray-600 hover:bg-gray-700 cursor-pointer text-white font-semibold py-3 rounded-lg shadow-lg transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
