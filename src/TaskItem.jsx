import React from 'react';
import './TaskItem.css';

function TaskItem({ task, onEdit, onDelete }) {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} priority-${task.priority || 'P2'}`}>
      <div className="task-info">
        <strong className="task-title">{task.title}</strong>
        <div className="task-description">{task.description}</div>
        <div className="task-priority">Prioridad: {task.priority || 'P2'}</div>
        <div className={`task-status ${task.completed ? 'status-completed' : 'status-pending'}`}>
          {task.completed ? 'Completada' : 'Pendiente'}
        </div>
      </div>
      <div className="task-actions">
        <button className="btn-edit" onClick={() => onEdit(task)}>Editar</button>
        <button className="btn-delete" onClick={() => onDelete(task.id)}>Eliminar</button>
      </div>
    </div>
  );
}

export default TaskItem;
