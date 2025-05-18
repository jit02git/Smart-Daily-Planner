import React, { useState } from "react";

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({
      ...task,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
    console.log(onSubmit(task));

    // Optionally reset form
    // setTask({ ... });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-xl font-semibold text-gray-800">Create a New Task</h2>

      <div>
        <label className="block mb-1 font-medium">Title *</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Due Date *</label>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Due Time</label>
          <input
            type="time"
            name="dueTime"
            value={task.dueTime}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Priority</label>
          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={task.category}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Reminder</label>
        <input
          type="datetime-local"
          name="reminder"
          value={task.reminder}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center gap-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="repeat"
            checked={task.repeat}
            onChange={handleChange}
            className="mr-2"
          />
          Repeat Task
        </label>

        <label className="inline-flex items-center">
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
