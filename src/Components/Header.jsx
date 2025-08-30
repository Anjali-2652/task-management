import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaRegNewspaper } from "react-icons/fa6";
import { IoIosCreate } from "react-icons/io";
import { MdOutlineLogin } from "react-icons/md";
import { SiGnuprivacyguard } from "react-icons/si";
import { MdDashboard } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";

import { VscSignIn } from "react-icons/vsc";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export const Header = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  // Track login/logout state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User logged out");
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };

  return (
  <nav className="bg-teal-900 px-20 z-10 py-3 shadow-md flex w-full fixed text-white justify-between items-center">
  <h1 className="text-2xl font-bold">Task Manager</h1>
  <ul className="flex items-center text-center gap-6">
    <li>
      <Link
        to="/"
        className="hover:text-amber-500 hover:font-semibold flex flex-col items-center text-sm"
      >
        <FaHome className="text-2xl mb-1" />
        Home
      </Link>
    </li>
    <li>
      <Link
        to="/about"
        className="hover:text-amber-500 hover:font-semibold flex flex-col items-center text-sm"
      >
        <FaRegNewspaper className="text-2xl mb-1" />
        About
      </Link>
    </li>
    <li>
      <Link
        to="/create-task"
        className="hover:text-amber-500 hover:font-semibold flex flex-col items-center text-sm"
      >
        <IoIosCreate className="text-2xl mb-1" />
        Create Task
      </Link>
    </li>

    {user && (
      <li>
        <Link
          to="/dashboard"
          className="hover:text-amber-500 hover:font-semibold flex flex-col items-center text-sm"
        >
          <MdDashboard className="text-2xl mb-1" />
          Dashboard
        </Link>
      </li>
    )}

    {!user ? (
      <>
        <li>
          <Link
            to="/login"
            className="hover:text-amber-500 hover:font-semibold flex flex-col items-center text-sm"
          >
            <VscSignIn className="text-2xl mb-1" />
            Login
          </Link>
        </li>
        <li>
          <Link
            to="/signup"
            className="hover:text-amber-500 hover:font-semibold flex flex-col items-center text-sm"
          >
            <SiGnuprivacyguard className="text-2xl mb-1" />
            Signup
          </Link>
        </li>
      </>
    ) : (
      <li>
        <button
          onClick={handleLogout}
          className="hover:text-amber-500 hover:font-semibold flex flex-col items-center text-sm"
        >
          <PiSignOutBold className="text-2xl mb-1" />
          Logout
        </button>
      </li>
    )}
  </ul>
</nav>

  );
};
