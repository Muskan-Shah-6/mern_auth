import React, { useEffect } from "react";
import "./App.css";
import Register from "./pages/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // important for styling
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { isTokenExpired, logoutUser } from "./utils/auth";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      // console.log("Token is:", token)
      if (!token) {
        clearInterval(interval); // stop checking after logout
        return;
      } 
      if (isTokenExpired()) {
        logoutUser();
        toast.error("Session expired, please login again");
        navigate("/login");
        clearInterval(interval); // stop further checks
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [navigate]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      {/* Toast notification container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />
    </>
  );
}

export default App;
