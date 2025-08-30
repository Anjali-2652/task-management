// src/Components/Auth/Logout.jsx
import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    signOut(auth)
      .then(() => navigate("/login"))
      .catch((err) => console.error(err));
  }, [navigate]);

  return <p>Logging out...</p>;
};
