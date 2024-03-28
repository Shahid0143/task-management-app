import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../backend";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const Navigate = useNavigate();

  const obj = {
    email,
    password,
  };

  const isEmailValid = (email) => {
    // Regular expression to validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    try {
      if (!email || !password) {
        setMessage("Please enter both email and password.");
      } else {
        setLoading(true);
        localStorage.setItem("email", email);
        axios
          .post(`${url}/api/user/login`, obj)
          .then((res) => {
            console.log(res);
            const token = res.data.token;
            console.log(token);
            if (token) {
              localStorage.setItem("token", res.data.token);
              setMessage("Login successful!");
            }
            Navigate("/task");
          })
          .catch((error) => {
            console.error("Login failed:", error);
            setMessage("Login failed. Please check your email and password.");
          })
          .finally(() => {
            setLoading(false); 
          });
      }
    } catch (error) {}
  };

  const handleclick = () => {
    Navigate("/register");
  };

  const handlePasswordFocus = () => {
    if (!isEmailValid(email)) {
      setMessage("Email is not valid");
    } else {
      setMessage("");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="login-container p-8 border bg-white border-gray-300 w-80 rounded-md">
        <h2 className="text-2xl font-bold mb-4 ">Login</h2>
        <label className="block mb-2" htmlFor="email">
          Email:
        </label>
        <input
          className="input1 mb-4 p-2 border rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="block mb-2 " htmlFor="password">
          Password:
        </label>
        <input
          className="2ndinput mb-4 p-2 border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={handlePasswordFocus}
        />
        <div className="flex justify-center">
          <button
            className="login mr-4 bg-green-500 text-white py-2 px-4 rounded"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}{" "}
          </button>
          <button
            className="register bg-gray-300 text-black py-2 px-4 rounded"
            onClick={handleclick}
            disabled={loading}
          >
            Register
          </button>
        </div>
        <p className="text-red-500 text-sm mt-2">{message}</p>
      </div>
    </div>
  );
}

export default Login;
