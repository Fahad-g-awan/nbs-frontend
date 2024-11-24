"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { createAdminApi } from "@/components/utilis/api/authApi";
import { useAppHook } from "@/components/utilis/hooks/AppHook";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const { dispatch, state } = useAppHook();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "SET_IS_LOADING", payload: true });

    try {
      let apiData = { username, email, password, phone, user_type: "admin" };
      const response = await createAdminApi(apiData);

      if (response) {
        router.push("/admin/signin");
      }
    } catch (error) {
      dispatch({ type: "SET_IS_LOADING", payload: false });

      toast.error(error.message || "Something went wrong, Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    let token = localStorage.getItem("token");
    if (token) {
      router.push("/admin/dashboard");
    } else {
      dispatch({ type: "SET_IS_LOADING", payload: false });
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-sm w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Admin Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              type="number"
              id="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mt-4"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <a href="/admin/signin" className="text-blue-500">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
