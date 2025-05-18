import React from 'react';
import TaskForm from './Components/Form';

function TaskPage() {
  const handleTaskSubmit = (taskData) => {
    console.log('Task submitted:', taskData);
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <TaskForm onSubmit={handleTaskSubmit} />
    </div>
  );
}

export default TaskPage;
