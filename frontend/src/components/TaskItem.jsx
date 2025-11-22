import React from "react";
import { useTasks } from "../context/TasksContext";
import { Link } from "react-router-dom";

export default function TaskItem({ task }) {
  const { removeTask, toggleDone } = useTasks();

  return (
    <div className="task-card">
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => toggleDone(task.id)}
        style={{ width: 20, height: 20 }}
      />

      <div className="task-content">
        <div className={`task-title ${task.done ? "done" : ""}`}>
          {task.title}
        </div>

        {task.description && (
          <div className="task-description">{task.description}</div>
        )}

        <div className="task-date">
          {new Date(task.createdAt).toLocaleString()}
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>

        <Link to={`/edit/${task.id}`}>
          <button className="edit-button">Editar</button>
        </Link>

        <button className="delete-button" onClick={() => removeTask(task.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
}
