import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onEdit, onDelete }) {
  if (!tasks.length) return <p style={{ textAlign: 'center', color: '#232946', fontWeight: 'bold' }}>No hay tareas.</p>;
  return (
    <div className="task-board-grid">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default TaskList;
