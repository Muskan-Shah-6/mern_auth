import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {jwtDecode} from "jwt-decode";

const Login = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: "", password: "" });

  // Handle change in form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // On submiting form

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // Call api
    try {
      const res = await axios.post(
        "http://localhost:1568/api/auth/login",
        form
      );
      const token = res.data.token;
      const decoded = jwtDecode(token);
      // Set token
      localStorage.setItem("token", token);
      localStorage.setItem("tokenExpiry", decoded.exp * 1000);
      localStorage.setItem("userID", res.data.isValid.id);
      toast.success(res.data.msg || "Success");
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.msg || "Login Fail");
    }
  };
  return (
    <>
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <form
          onSubmit={handleOnSubmit}
          className="bg-transparent  p-6 rounded-xl shadow-lg shadow-blue-500/50 space-y-4 max-w-sm"
        >
          <h2 className="text-2xl text-gray-300 font-bold">Login form</h2>

          <input
            className="border-b border-blue-400 text-white p-4 w-full"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            className="border-b border-blue-400 text-white p-4 w-full"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          {/* ✅ explicitly set type="submit" */}
          <button
            type="submit"
            className="bg-blue-300 text-black hover:bg-blue-500 hover:text-white px-4 py-2 rounded w-full transition-all duration-300 ease-in-out"
          >
            Login
          </button>
          <p className="text-sm text-blue-500">
            New to register?{" "}
            <Link className="text-blue-600 hover:underline" to={"/register"}>
              Register
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
