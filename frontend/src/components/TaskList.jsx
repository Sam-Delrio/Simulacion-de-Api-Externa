import React from 'react';
import { useTasks } from '../context/TasksContext';
import TaskItem from './TaskItem';

export default function TaskList() {
  const { tasks, loading, error } = useTasks();

  if (loading) return <div>Cargando...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!tasks.length) return <div>No hay tareas.</div>;

  return (
    <div>
      {tasks.map(t => <TaskItem key={t.id} task={t} />)}
    </div>
  );
}
