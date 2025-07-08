import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskForm from "./Form";

export default function ModalForm({ show, onClose, taskId }) {
  const [taskData, setTaskData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (taskId && show) {
      setLoading(true);
      fetch(`http://localhost:5000/api/task/${taskId}`)
        .then((res) => res.json())
        .then((data) => {
          setTaskData(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setTaskData(null);
    }
  }, [taskId, show]);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center px-4"
      >
        <motion.div
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white w-full max-w-2xl p-6 md:p-8 rounded-2xl shadow-xl relative"
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-gray-500 hover:text-gray-900 text-2xl"
          >
            &times;
          </button>

          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            {taskId ? "✏️ Edit Task" : "📝 Create New Task"}
          </h2>

          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <TaskForm onSubmit={onClose} initialValues={taskData} />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
