import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./Components/Layout";
import { Home } from "./Components/Home";
import { Hero } from "./Components/Hero";
import { Login } from "./Components/Auth/Login";
import { Logout } from "./Components/Auth/Logout";
import { About } from "./Components/About";
import { CreateTask } from "./Components/CreateTask";
import { Signup } from "./Components/Auth/SignUp";
import { Dashboard } from "./Components/Dashboard"; 
import { auth } from "./Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { EditTask } from "./Components/EditTask";
import { Profile } from "./Components/Profile";

function App() {
  const [user, loading] = useAuthState(auth); 

  if (loading) return <p>Loading...</p>; 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Hero />} />
          <Route path="/hero" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/create-task" element={<CreateTask />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/login" />}
          />
          <Route path="/logout" element={<Logout />} />

          {/* Protected Route */}
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />

          <Route
            path="/edit-task/:id"
            element={user ? <EditTask /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
