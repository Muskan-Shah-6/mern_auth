import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:1568/api/auth/register",
        form
      );
      toast.success(res.data.msg || "User registered successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-transparent  p-6 rounded-xl shadow-lg shadow-blue-500/50 space-y-4 w-80"
      >
        <h2 className="text-2xl text-gray-300 font-bold">Register</h2>

        <input
          className="border-b border-blue-400 text-white p-4 w-full"
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
        <input
          className="border-b border-blue-400 text-white p-4 w-full"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          className="border-b border-blue-400 text-white p-4 w-full"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        {/* ✅ explicitly set type="submit" */}
        <button
          type="submit"
          className="bg-blue-300 text-black hover:bg-blue-500 hover:text-white px-4 py-2 rounded w-full transition-all duration-300 ease-in-out"
        >
          Register
        </button>
        <p className="text-sm text-blue-500">
          Already have an account?{" "}
          <Link className="text-blue-600 hover:underline" to={"/login"}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
