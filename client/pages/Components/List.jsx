import React, { useState, useEffect } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);

  // Fetch tasks from API on mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/task/list');
        if (!response.ok) throw new Error('Failed to fetch tasks');
        const data = await response.json();
        setTodos(data); // Adjust if your API returns { tasks: [...] }
      } catch (error) {
        console.error(error);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = (task) => {
    setTodos([...todos, { id: Date.now(), text: task }]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800">My To-Do List</h1>
       
        <ul className="mt-6 space-y-2">
          {todos.map((todo) => (
            <li key={todo._id || todo.id} className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-700">
              {todo.title || todo.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoApp;
