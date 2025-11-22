import React, { useState, useEffect } from 'react';
import { useTasks } from '../context/TasksContext';
import { useParams, useNavigate } from 'react-router-dom';

export default function TaskForm() {
  const { addTask, updateTask, tasks, loading } = useTasks();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { id } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const task = tasks.find(t => t.id === parseInt(id));
      if (task) {
        setTitle(task.title);
        setDescription(task.description || '');
      }
    }
  }, [id, tasks]);

  const submit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return alert('El título es obligatorio');

    if (id) {
      await updateTask(parseInt(id), {
        title: title.trim(),
        description: description.trim()
      });
      navigate("/");
    } else {
      await addTask({
        title: title.trim(),
        description: description.trim(),
      });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={submit} style={{ marginBottom: 16 }}>
      <h2>{id ? "Editar tarea" : "Agregar tarea"}</h2>

      <input
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
        disabled={loading}
      />

      <input
        placeholder="Descripción (opcional)"
        value={description}
        onChange={e => setDescription(e.target.value)}
        disabled={loading}
      />

      <button type="submit" disabled={loading}>
        {id ? "Guardar cambios" : "Agregar"}
      </button>
    </form>
  );
}
