import axios from "axios";
import React, { useState, useEffect } from "react";
import Taskdata from "./Taskdata";
import { useNavigate } from "react-router-dom";
import { url } from "../backend";

function TaskList() {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    completed: false,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setNewTask({
        ...newTask,
        [name]: checked,
      });
    } else {
      setNewTask({
        ...newTask,
        [name]: value,
      });
    }
  };

  const addTask = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      if (isLoggedIn) {
        const response = await axios.post(`${url}/api/task/tasks`, newTask, {
          headers: headers,
        });

        navigate("/task");
        window.location.reload(false);
      } else {
        alert("Please Login First. You are not authorized.");
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  return (
    <div className="task-list-container">
      <div className="task-input-form bg-gray-800 p-4 rounded-lg">
        <h1 className="text-2xl text-white font-semibold">Add Todo</h1>
        {!isLoggedIn && (
          <p className="text-white text-lg">
            Please Login First You are not Authorized
          </p>
        )}
        {isLoggedIn && (
          <div>
            <input
              className="mt-4 p-2 rounded-md bg-gray-700 text-white"
              type="text"
              placeholder="Title"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
            />
            <br />
            <input
              className="mt-4 p-2 rounded-md bg-gray-700 text-white"
              type="text"
              placeholder="Description"
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="completed" className="text-white mt-4">
              Completed:
               {" "}
            </label>
            <input
              className="mt-2 mr-3"
              type="checkbox"
              name="completed"
              checked={newTask.completed}
              onChange={handleInputChange}
            />
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
              onClick={addTask}
            >
              Add Todo
            </button>
          </div>
        )}
      </div>
      <div>
        <Taskdata />
      </div>
    </div>
  );
}

export default TaskList;
