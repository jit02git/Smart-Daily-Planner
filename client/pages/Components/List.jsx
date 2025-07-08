import React, { useState, useEffect } from "react";

function TodoApp() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/task/list");
        if (!response.ok) throw new Error("Failed to fetch tasks");
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-7xl mx-auto">
        <div className="p-6 border-b">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            📋 My Tasks
          </h1>
        </div>

        <div className="overflow-x-auto">
          <div className="max-h-[500px] overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold tracking-wider sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left bg-gray-50">Title</th>
                  <th className="px-6 py-3 text-left bg-gray-50">Category</th>
                  <th className="px-6 py-3 text-left bg-gray-50">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left bg-gray-50">Due Date</th>
                  <th className="px-6 py-3 text-left bg-gray-50">Due Time</th>
                  <th className="px-6 py-3 text-left bg-gray-50">Priority</th>
                  <th className="px-6 py-3 text-left bg-gray-50">Reminder</th>
                  <th className="px-6 py-3 text-left bg-gray-50">Repeat</th>
                  <th className="px-6 py-3 text-left bg-gray-50">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-800 bg-white">
                {todos.map((todo) => (
                  <tr key={todo._id}>
                    <td className="px-6 py-4 font-medium">{todo.title}</td>
                    <td className="px-6 py-4">{todo.category}</td>
                    <td className="px-6 py-4">{todo.description}</td>
                    <td className="px-6 py-4">
                      {new Date(todo.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">{todo.dueTime}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium
                ${
                  todo.priority === "High"
                    ? "bg-red-100 text-red-600"
                    : todo.priority === "Medium"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-green-100 text-green-600"
                }`}
                      >
                        {todo.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(todo.reminder).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">{todo.repeat ? "✅" : "❌"}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold
                ${
                  todo.status
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-700"
                }`}
                      >
                        {todo.status ? "Completed" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoApp;
