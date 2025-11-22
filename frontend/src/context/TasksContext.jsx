import React, { createContext, useContext, useEffect, useState } from 'react';
import * as api from '../services/api';

const TasksContext = createContext();
export { TasksContext };
export const useTasks = () => useContext(TasksContext);

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.getTasks();
      setTasks(res.data.sort((a, b) => b.id - a.id));
    } catch (err) {
      setError("No se pudieron cargar las tareas.");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async ({ title, description }) => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.createTask({
        title,
        description,
        done: false,
        createdAt: new Date().toISOString(),
      });

      setTasks((prev) => [res.data, ...prev]);
    } catch (err) {
      setError("No se pudo crear la tarea.");
    } finally {
      setLoading(false);
    }
  };

  const removeTask = async (id) => {
    setLoading(true);
    setError(null);

    try {
      await api.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError("No se pudo eliminar la tarea.");
    } finally {
      setLoading(false);
    }
  };

  const toggleDone = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const task = tasks.find((t) => t.id === id);
      const res = await api.updateTask(id, { done: !task.done });

      setTasks((prev) => prev.map((t) => (t.id === id ? res.data : t)));
    } catch (err) {
      setError("No se pudo actualizar la tarea.");
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id, data) => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.updateTask(id, data);

      setTasks((prev) =>
        prev.map((t) => (t.id === id ? res.data : t))
      );
    } catch (err) {
      setError("No se pudo editar la tarea.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        loading,
        error,
        fetchTasks,
        addTask,
        removeTask,
        toggleDone,
        updateTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
