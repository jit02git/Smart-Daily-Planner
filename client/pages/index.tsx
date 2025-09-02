import TaskForm from "../pages/Components/TaskForm";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <TaskForm onSuccess={() => {}} />
    </div>
  );
}
