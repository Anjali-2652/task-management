import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaBars, FaTimes } from "react-icons/fa";
import { FaRegNewspaper } from "react-icons/fa6";
import { IoIosCreate } from "react-icons/io";
import { VscSignIn } from "react-icons/vsc";
import { MdOutlineLogin, MdDashboard } from "react-icons/md";
import { SiGnuprivacyguard } from "react-icons/si";
import { PiSignOutBold } from "react-icons/pi";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export const Header = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // toggle menu
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = () => {
    signOut(auth).catch((error) => console.error("Logout Error:", error));
  };

  return (
    <nav className="bg-teal-900 text-white fixed w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 flex justify-between items-center h-16">
        <h1 className="text-2xl font-bold">Task Manager</h1>

        {/* Hamburger for mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>

        {/* Menu */}
        <ul className={`md:flex md:items-center md:gap-6 absolute md:static top-16 left-0 w-full md:w-auto bg-teal-900 md:bg-transparent transition-all duration-300 ${menuOpen ? "block" : "hidden"}`}>
          <li>
            <Link to="/" className="hover:text-amber-500 flex flex-col items-center text-sm py-2 md:py-0">
              <FaHome className="text-2xl mb-1" /> Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-amber-500 flex flex-col items-center text-sm py-2 md:py-0">
              <FaRegNewspaper className="text-2xl mb-1" /> About
            </Link>
          </li>
          <li>
            <Link to="/create-task" className="hover:text-amber-500 flex flex-col items-center text-sm py-2 md:py-0">
              <IoIosCreate className="text-2xl mb-1" /> Create Task
            </Link>
          </li>
          {user && (
            <li>
              <Link to="/dashboard" className="hover:text-amber-500 flex flex-col items-center text-sm py-2 md:py-0">
                <MdDashboard className="text-2xl mb-1" /> Dashboard
              </Link>
            </li>
          )}
          {!user ? (
            <>
              <li>
                <Link to="/login" className="hover:text-amber-500 flex flex-col items-center text-sm py-2 md:py-0">
                  <VscSignIn className="text-2xl mb-1" /> Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-amber-500 flex flex-col items-center text-sm py-2 md:py-0">
                  <SiGnuprivacyguard className="text-2xl mb-1" /> Signup
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button onClick={handleLogout} className="hover:text-amber-500 flex flex-col items-center text-sm py-2 md:py-0">
                <PiSignOutBold className="text-2xl mb-1" /> Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
