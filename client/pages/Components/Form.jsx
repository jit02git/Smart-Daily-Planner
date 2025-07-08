import React, { useState } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

function TaskModal({ show, setShow, onSubmit }) {
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

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({ ...task, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/task/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      if (!res.ok) throw new Error("Task creation failed");

      const data = await res.json();
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
      setShow(false);
      router.push("/task/list");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm px-4">
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-2xl relative"
          >
            <button
              onClick={() => setShow(false)}
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-900 text-xl font-bold"
            >
              ×
            </button>

            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">📝 Create New Task</h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm text-gray-700">
              <div>
                <label className="font-medium">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={task.title}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="font-medium">Description</label>
                <textarea
                  name="description"
                  value={task.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full mt-1 border border-gray-300 px-4 py-2 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-medium">Due Date *</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={task.dueDate}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="font-medium">Due Time</label>
                  <input
                    type="time"
                    name="dueTime"
                    value={task.dueTime}
                    onChange={handleChange}
                    className="w-full mt-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-medium">Priority</label>
                  <select
                    name="priority"
                    value={task.priority}
                    onChange={handleChange}
                    className="w-full mt-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div>
                  <label className="font-medium">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={task.category}
                    onChange={handleChange}
                    className="w-full mt-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-medium">Reminder</label>
                <input
                  type="datetime-local"
                  name="reminder"
                  value={task.reminder}
                  onChange={handleChange}
                  className="w-full mt-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex gap-6 text-sm mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="repeat"
                    checked={task.repeat}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Repeat
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
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
              >
                💾 Save Task
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default TaskModal;
