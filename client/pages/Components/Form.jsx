import React, { useState } from "react";
import { useRouter } from "next/router"; // Add this import

function TaskForm({ onSubmit }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    dueTime: "",
    repeat: false,
    priority: "Medium",
    category: "",
    reminder: "",
    status: false,
  });

  const router = useRouter(); // Initialize router

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({
      ...task,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/task/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      const data = await response.json();
      if (onSubmit) onSubmit(data);
      setTask({
        title: "",
        description: "",
        dueDate: "",
        dueTime: "",
        repeat: false,
        priority: "Medium",
        category: "",
        reminder: "",
        status: false,
      });
      router.push("task/list"); // Redirect to /list after saving
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-xl font-semibold text-gray-800">Create a New Task</h2>

      <div>
        <label className="block mb-1 font-medium text-black">Title *</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-black">Description</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium text-black">Due Date *</label>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-black">Due Time</label>
          <input
            type="time"
            name="dueTime"
            value={task.dueTime}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium text-black">Priority</label>
          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-black">Category</label>
          <input
            type="text"
            name="category"
            value={task.category}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium text-black">Reminder</label>
        <input
          type="datetime-local"
          name="reminder"
          value={task.reminder}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>

      <div className="flex items-center gap-4">
        <label className="inline-flex items-center text-black">
          <input
            type="checkbox"
            name="repeat"
            checked={task.repeat}
            onChange={handleChange}
            className="mr-2"
          />
          Repeat Task
        </label>

        <label className="inline-flex items-center text-black">
          <input
            type="checkbox"
            name="status"
            checked={task.status}
            onChange={handleChange}
            className="mr-2"
          />
          Completed
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Save Task
      </button>
    </form>
  );
}

export default TaskForm;
