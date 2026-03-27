import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";



type LoginDataType ={
  email: string,
  password: string
}

type UserType={
  name: string,
  email: string,
  password: string
}


const Login = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate

  const [loginData, setLoginData] = useState<LoginDataType>({
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

 const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    const res = await fetch("https://resume-analyzer-backend-6.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.msg || "Login failed");
      return;
    }

    // Save logged in user in localStorage (or state)
    localStorage.setItem("token", data.token)
    localStorage.setItem("auth", JSON.stringify(data.user))

    navigate("/dashboard"); // redirect after successful login

  } catch (error) {
    console.log(error);
    alert("Server error");
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-87.5 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center text-gray-700">
          Login
        </h1>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Login
        </button>

        {/* Register Link */}
        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;