import React, { useState, ChangeEvent, FormEvent } from "react";

type Task = {
  title: string;
  description: string;
  dueDate: string;
  dueTime: string;
  repeat: boolean;
  priority: string;
  category: string;
  reminder: string;
  status: boolean;
};

type TaskFormProps = {
  onSuccess: () => void;
};

const initialState: Task = {
  title: "",
  description: "",
  dueDate: "",
  dueTime: "",
  repeat: false,
  priority: "Medium",
  category: "",
  reminder: "",
  status: false,
};

function TaskForm({ onSuccess }: TaskFormProps) {
  const [task, setTask] = useState<Task>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:5000/api/task/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (!response.ok) throw new Error("Failed to create task");
      setTask(initialState);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-xl shadow-lg max-w-md w-full"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Create Task</h2>
      {error && <div className="text-red-600">{error}</div>}
      <div>
        <label className="block mb-1 font-medium text-black">Title *</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded-lg text-black"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium text-black">Description</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg text-black"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium text-black">Category</label>
        <input
          type="text"
          name="category"
          value={task.category}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg text-black"
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
            className="w-full border px-4 py-2 rounded-lg text-black"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-black">Due Time *</label>
          <input
            type="time"
            name="dueTime"
            value={task.dueTime}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg text-black"
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
          className="w-full border px-4 py-2 rounded-lg text-black"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium text-black">Priority</label>
          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg text-black"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="flex items-center gap-4 mt-6">
          <label className="inline-flex items-center text-black">
            <input
              type="checkbox"
              name="repeat"
              checked={task.repeat}
              onChange={handleChange}
              className="mr-2"
            />
            Repeat
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
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        {loading ? "Saving..." : "Save Task"}
      </button>
    </form>
  );
}

export default TaskForm;