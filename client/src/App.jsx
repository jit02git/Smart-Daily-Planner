import React from 'react';
import TaskForm from './Components/Form';

function TaskPage() {
  const handleTaskSubmit = (taskData) => {
    console.log('Task submitted:', taskData);
    // You can send taskData to your backend using fetch/axios here
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <TaskForm onSubmit={handleTaskSubmit} />
    </div>
  );
}

export default TaskPage;
