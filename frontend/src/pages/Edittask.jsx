import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../backend";
import "../pages/Edittask.css";
function Edittask() {
  const [editedTask, setEditedTask] = useState({
    title: "",
    description: "",
    completed: false,
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setEditedTask({
      ...editedTask,
      [name]: newValue,
    });
  };

  const handleEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.patch(
        `${url}/api/task/tasks/${id}`,
        editedTask,
        {
          headers: headers,
        }
      );

      navigate("/task");
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  const handleClose = () => {
    navigate("/task");
  };

  return (
    <div className="edit-task-container">
      <h2>Edit Todo</h2>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        name="title"
        value={editedTask.title}
        onChange={handleInputChange}
        placeholder="Enter new title"
      />
      <label htmlFor="description">Description:</label>
      <input
        type="text"
        name="description"
        value={editedTask.description}
        onChange={handleInputChange}
        placeholder="Enter new description"
      />
      <label style={{ color: "white" }}>
        {editedTask.completed ? "✅ Completed" : "⏳ Pending"}:
        <input
          type="checkbox"
          name="completed"
          checked={editedTask.completed}
          onChange={handleInputChange}
        />
      </label>
      <button onClick={handleEdit}>Save Changes</button>
      <button onClick={handleClose} className="close-button">
        Close
      </button>
    </div>
  );
}

export default Edittask;
