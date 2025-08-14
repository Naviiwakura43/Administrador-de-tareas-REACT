import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import Sidebar from './Sidebar';
import './App.css';
import './Sidebar.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState('');
  const [view, setView] = useState('all'); // Todos, completados, pendientes, en progreso
  const [priorityFilter, setPriorityFilter] = useState('all');

  // cargar tareas desde el servidor
  const API_URL = import.meta.env.VITE_API_URL;
  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_URL}/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch {
      setError('Error al cargar tareas');
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Add or update task
  const handleSave = async (task) => {
    try {
      if (task.id) {
        //actualizar
        await fetch(`${API_URL}/tasks/${task.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(task),
        });
      } else {
        // Crear
        await fetch(`${API_URL}/tasks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(task),
        });
      }
      setEditingTask(null);
      fetchTasks();
    } catch {
      setError('Error al guardar tarea');
    }
  };

  // Eliminar tarea
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
      fetchTasks();
    } catch {
      setError('Error al eliminar tarea');
    }
  };

  // Editar tarea
  const handleEdit = (task) => {
    setEditingTask({ ...task, priority: task.priority || 'P2' });
  };

  // Filtrar tareas según vista y prioridad
  let filteredTasks = tasks;
  if (view === 'completed') filteredTasks = tasks.filter(t => t.completed);
  else if (view === 'pending') filteredTasks = tasks.filter(t => !t.completed);
  else if (view === 'inprogress') filteredTasks = tasks.filter(t => !t.completed); // puedes ajustar si tienes otro campo para "in progress"
  if (priorityFilter !== 'all') filteredTasks = filteredTasks.filter(t => (t.priority || 'P2') === priorityFilter);

  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh', background: '#e3e3e3' }}>
        <Sidebar currentView={view} setView={setView} />
        <div className="app-container" style={{ marginLeft: 350, width: '100%' }}>
          <h1>Task Board</h1>
          {error && <div className="error">{error}</div>}
          {(view === 'all' || view === 'completed' || view === 'pending' || view === 'inprogress') && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem',
              background: '#fff',
              borderRadius: '18px',
              boxShadow: '0 2px 12px #6c63ff22, 0 1px 2px #0001',
              padding: '0.7rem 1.5rem',
              maxWidth: 400,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
              <label style={{ fontWeight: 'bold', color: '#232946', fontSize: '1.08em' }}>Filtrar por prioridad:</label>
              <select
                value={priorityFilter}
                onChange={e => setPriorityFilter(e.target.value)}
                style={{
                  borderRadius: '12px',
                  padding: '0.6rem 1.2rem',
                  border: '1.5px solid #b8c1ec',
                  background: '#f7f7fb',
                  color: '#232946',
                  fontWeight: 'bold',
                  fontSize: '1.05em',
                  boxShadow: '0 1px 4px #6c63ff11',
                }}
              >
                <option value="all">Todas</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
                <option value="P3">P3</option>
              </select>
            </div>
          )}
          <Routes>
            <Route path="/" element={
              <>
                {(view === 'add' || editingTask) && (
                  <TaskForm onSave={handleSave} editingTask={editingTask} onCancel={() => setEditingTask(null)} />
                )}
                {(view !== 'add' || editingTask) && (
                  <TaskList tasks={filteredTasks} onEdit={handleEdit} onDelete={handleDelete} />
                )}
              </>
            } />
            {/* Puedes agregar más rutas aquí si lo deseas */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
