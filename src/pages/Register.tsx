import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

type RegisterFormType = {
  name: string;
  email: string;
  phone: string;
  password: string;
  skills: string;
  info: string;
};

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormType>({
    mode: "onChange"
  });

  const onSubmit = async (data: RegisterFormType) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.msg || "Something went wrong");
        return;
      }

      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-liner-to-r from-blue-100 to-indigo-200 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl flex flex-col gap-5"
      >
        <h1 className="text-3xl font-bold text-center text-gray-700">
          Create Account
        </h1>

        {/* Name */}
        <div>
          <label>Name</label>
          <input
            placeholder="Enter name"
            {...register("name", { required: "Name is required" })}
            className="w-full mt-1 px-4 py-2 border rounded-lg"
          />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div>

        {/* Email */}
        <div>
          <label>Email</label>
          <input
            placeholder="Enter email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email"
              }
            })}
            className="w-full mt-1 px-4 py-2 border rounded-lg"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        {/* Phone */}
        <div>
          <label>Phone</label>
          <input
            placeholder="Enter phone"
            {...register("phone", {
              required: "Phone is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Phone must be 10 digits"
              }
            })}
            className="w-full mt-1 px-4 py-2 border rounded-lg"
          />
          <p className="text-red-500 text-sm">{errors.phone?.message}</p>
        </div>

        {/* Password */}
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters"
              }
            })}
            className="w-full mt-1 px-4 py-2 border rounded-lg"
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        {/* Skills */}
        <div>
          <label>Skills</label>
          <input
            placeholder="Enter skills"
            {...register("skills", {
              required: "Skills required"
            })}
            className="w-full mt-1 px-4 py-2 border rounded-lg"
          />
          <p className="text-red-500 text-sm">{errors.skills?.message}</p>
        </div>

        {/* Info */}
        <div>
          <label>Short Info</label>
          <textarea
            placeholder="Enter info"
            {...register("info", {
              required: "Info required"
            })}
            className="w-full mt-1 px-4 py-2 border rounded-lg"
          />
          <p className="text-red-500 text-sm">{errors.info?.message}</p>
        </div>

        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold">
          Register
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;