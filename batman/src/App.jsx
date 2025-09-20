import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  const handleTask = () => {
    if (task.trim() === "") return;

    if (isEditing) {
      const updatedTasks = tasks.map((t, i) =>
        i === currentTaskIndex ? { ...t, text: task } : t
      );
      setTasks(updatedTasks);
      setIsEditing(false);
      setCurrentTaskIndex(null);
    } else {
      // Add new task
      setTasks([...tasks, { text: task, completed: false }]);
    }

    setTask("");
  };

  const markCompleted = (index) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: true } : t
    );
    setTasks(updatedTasks);
  };

  const markNotCompleted = (index) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: false } : t
    );
    setTasks(updatedTasks);
  };
  const editTask = (index) => {
    setTask(tasks[index].text);
    setIsEditing(true);
    setCurrentTaskIndex(index);
  };
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setIsEditing(false);
    setTask("");
  };

  return (
    <div className="app">
      <h1><center>Todo List</center></h1>

      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task..."
        />
        <button onClick={handleTask}>
          {isEditing ? "Update" : "Add"}
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((t, index) => (
          <li key={index} className={t.completed ? "completed" : ""}>
            <span>{t.text}</span>
            <div className="actions">
              <button className="complete" onClick={() => markCompleted(index)}>✅</button>
              <button className="not-complete" onClick={() => markNotCompleted(index)}>🚫</button>
              <button className="edit" onClick={() => editTask(index)}>✏</button>
              <button className="delete" onClick={() => deleteTask(index)}>❌</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;