import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TasksContext } from "../context/TasksContext";

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { tasks, updateTask, fetchTasks } = useContext(TasksContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const task = tasks.find((t) => t.id === parseInt(id));
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [id, tasks]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateTask(parseInt(id), { title, description });
    await fetchTasks();
    navigate("/");
  };
  return (
    <div className="edit-container">
      <h2>Editar Tarea</h2>

      <form onSubmit={handleSubmit} className="edit-form">
        <label>Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          required
        ></textarea>

        <button type="submit" className="save-btn">
          Guardar Cambios
        </button>

        <button
          type="button"
          className="cancel-btn"
          onClick={() => navigate("/")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}
