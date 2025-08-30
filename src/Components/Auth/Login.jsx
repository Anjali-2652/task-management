import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Firebase"; // ✅ import auth instance
import { signInWithEmailAndPassword } from "firebase/auth"; // ✅ Firebase login function

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ Firebase login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in user:", userCredential.user);

      navigate("/dashboard"); // ✅ redirect to dashboard after login
    } catch (err) {
      console.error("Login failed:", err);

      if (err.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else {
        setError("Failed to log in. Please try again.");
      }
    }

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 shadow-teal-800 drop-shadow-2xl shadow-2xl px-10 rounded-4xl pb-10">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-rose-800 tracking-tight">
            Log in to your account
          </h2>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        {/* ✅ now handles real Firebase login */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md">
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
                placeholder="arya@gmail.com"
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
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-rose-800 text-white py-2 cursor-pointer rounded-md hover:bg-rose-500"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </div>
        </form>

        <div className="text-md text-center mt-4">
          Need an account?{" "}
          <Link to="/signup" className="font-medium text-rose-600 hover:text-teal-800">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};
