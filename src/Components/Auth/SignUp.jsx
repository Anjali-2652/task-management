import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // creating user with email and password 
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {

      // create user 
      const userData = await createUserWithEmailAndPassword(auth, email, password);

      // update profile with full name
      await updateProfile(userData.user, { displayName: name });

      console.log("User created:", userData.user);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 shadow-teal-800 drop-shadow-2xl shadow-2xl px-10 rounded-4xl pb-10">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-rose-800 tracking-tight">
            Create your account
          </h2>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        {/* ✅ attach handleSignup to form */}
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="space-y-4 rounded-md">
            <div>
              <label htmlFor="name" className="text-black font-semibold text-lg">
                Full Name:
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-2 border px-3 py-2 rounded-md"
                placeholder="Arya Gupta"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-black font-semibold text-lg">
                Email:
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 border px-3 py-2 rounded-md"
                placeholder="aarya@gmail.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-black font-semibold text-lg">
                Password:
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 border px-3 py-2 rounded-md"
                placeholder="********"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="text-black font-semibold text-lg">
                Confirm Password:
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full mt-2 border px-3 py-2 rounded-md"
                placeholder="********"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-rose-800 text-white py-2  cursor-pointer rounded-md hover:bg-rose-500"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </div>
        </form>

        <div className="text-md text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-rose-600 hover:text-teal-800">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};
