import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../backend";

function Taskdata() {
  const [taskdata, setTaskdata] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTaskData();
  }, []);

  const getTaskData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.get(`${url}/api/task/tasks`, {
        headers: headers,
      });
      setTaskdata(res.data);
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.delete(`${url}/api/task/tasks/${id}`, {
        headers: headers,
      });
      getTaskData();
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  const handleUpdate = (id) => {
    navigate(`task/${id}`);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-white">Todo-List</h1>
      {taskdata.length === 0 ? (
        <p className="text-white">No todo list found...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 w-fit flex-col justify-center">
          {taskdata?.map((task, index) => (
            <div key={index} className="p-4 bg-white shadow-md rounded-md">
              <h3 className="text-lg font-semibold text-gray-600 overflow-hidden whitespace-pre-line overflow-ellipsis max-h-16">
                {task.title}
              </h3>
              <p className="text-gray-600 overflow-hidden whitespace-pre-line overflow-ellipsis max-h-16">
                {task.description}
              </p>
              {task.completed ? (
                <span
                  className="text-green-500"
                  role="img"
                  aria-label="Completed"
                >
                  ✅ Completed
                </span>
              ) : (
                <span
                  className="text-yellow-500"
                  role="img"
                  aria-label="Pending"
                >
                  ⏳ Pending
                </span>
              )}
              <div className="mt-4">
                <button
                  onClick={() => handleDelete(task._id)}
                  className="mr-2 bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleUpdate(task._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Taskdata;
