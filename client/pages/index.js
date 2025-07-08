// pages/index.jsx
import React, { useState } from "react";
import Form from "./Components/Form";
import List from "./Components/List";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">

      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition mb-4"
      >
        ➕ Add Task
      </button>

      <Form show={showModal} onClose={() => setShowModal(false)} />

      <List />
    </div>
  );
}
