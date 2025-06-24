import TaskForm from "./Components/Form";
import List from "./Components/List"; // Import your List component

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <TaskForm />
      <List /> {/* Render the list of tasks */}
    </div>
  );
}
