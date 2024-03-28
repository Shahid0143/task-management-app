import React, { useState } from "react";
import axios from "axios";
import Speech from "react-speech";
import { useNavigate } from "react-router-dom";
import { url } from "../backend";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const navigate = useNavigate();

  const [alrt, setAlrt] = useState("");
  const [blankFieldMsg, setBlankFieldMsg] = useState("");
  const [invalidEmailMsg, setInvalidEmailMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    
    setBlankFieldMsg("");
    setInvalidEmailMsg("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any of the form fields are empty
    if (!formData.username || !formData.email || !formData.password) {
      setBlankFieldMsg("Please fill in all fields");
    } else if (!isEmailValid(formData.email)) {
      setInvalidEmailMsg("Invalid email format");
    } else {
    
      setBlankFieldMsg("");
      setInvalidEmailMsg("");

      axios
        .post(`${url}/api/user/register`, formData)
        .then((res) => {
          console.log(res.data);
          setAlrt(res.data.message);
          localStorage.setItem("role", res.data.registerdata.role);
        })
        .catch((error) => {
          console.error("Registration failed:", error.message);
        });
    }
  };

  const handleclick = () => {
    navigate("/login");
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="registration-container bg-white p-8 border border-gray-300 rounded-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Register Form</h2>
        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-1"
            htmlFor="username"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            className="input1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="input1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-1"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="input1 p-2 border rounded w-full"
          />
        </div>
        {blankFieldMsg && (
          <p className="text-red-500 text-sm mb-2">{blankFieldMsg}</p>
        )}
        {invalidEmailMsg && (
          <p className="text-red-500 text-sm mb-2">{invalidEmailMsg}</p>
        )}
        {alrt && <p className="text-green-500 text-lg mb-2">{alrt}</p>}
        <div className="flex justify-center">
          <button
            type="submit"
            className="register-button bg-green-500 text-white py-2 px-4 rounded mr-4"
          >
            Register
          </button>
          <button
            onClick={handleclick}
            className="login-button bg-teal-500 text-white py-2 px-4 rounded"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
