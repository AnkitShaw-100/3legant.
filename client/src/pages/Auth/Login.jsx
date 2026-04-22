import React, { useState } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || email.trim() === "") {
      toast.error("Email is required");
      return;
    }
    if (!email.includes("@")) {
      toast.error("Email must contain @");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!password || password.trim() === "") {
      toast.error("Password is required");
      return;
    }
    if (password.length < 9) {
      toast.error("Password must be at least 9 characters");
      return;
    }

    try {
      const res = await axios.post("/api/v1/auth/login", { email, password });
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: res.data.user,
            token: res.data.token,
          })
        );
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Layout title="Login - Ecomm app">
      <div className="flex items-center justify-center min-h-[90vh] px-4 font-poppins">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center tracking-tight">
            Welcome Back
          </h1>
          <p className="text-center text-gray-600 text-base mb-6 font-normal leading-relaxed">
            Login to your account to continue shopping
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            {/* Email */}
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-900 capitalize"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="py-3 px-4 border border-gray-300 rounded-md text-base font-poppins transition-all bg-gray-50 w-full focus:outline-none focus:border-gray-900 focus:bg-white focus:shadow-md placeholder:text-gray-400"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-gray-900 capitalize"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="py-3 px-4 border border-gray-300 rounded-md text-base font-poppins transition-all bg-gray-50 w-full focus:outline-none focus:border-gray-900 focus:bg-white focus:shadow-md placeholder:text-gray-400"
              />
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3 px-5 rounded-md text-base font-semibold cursor-pointer transition-all mt-2 uppercase tracking-wide shadow-md w-full hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
            >
              Login Now
            </button>
          </form>

          <div className="text-center mt-6 text-base text-gray-600">
            <a
              href="/forgot-password"
              className="text-gray-900 font-semibold transition-colors ml-1 hover:text-gray-800 hover:underline"
            >
              Forgot password?
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
