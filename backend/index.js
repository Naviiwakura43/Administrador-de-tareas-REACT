import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// array para almacenar las tareas (mientras este prendido el servidor)
let tasks = [];

// Helper: funcion para encontrar el indice de una tarea por su id
const findTaskIndex = (id) => tasks.findIndex((t) => t.id === id);

// GET /api/tasks - obtener todas las tareas
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// POST /api/tasks - crear nueva tarea
app.post('/api/tasks', (req, res) => {
  const { title, description, priority } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }
  const newTask = {
    id: Date.now().toString(),
    title,
    description,
    completed: false,
    createdAt: new Date(),
    priority: priority || 'P2', // P2 por defecto
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /api/tasks/:id - actualizar tarea
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, completed, priority } = req.body;
  const idx = findTaskIndex(id);
  if (idx === -1) return res.status(404).json({ error: 'Task not found' });
  if (title !== undefined) tasks[idx].title = title;
  if (description !== undefined) tasks[idx].description = description;
  if (completed !== undefined) tasks[idx].completed = completed;
  if (priority !== undefined) tasks[idx].priority = priority;
  res.json(tasks[idx]);
});

// borra tarea segun id
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const idx = findTaskIndex(id);
  if (idx === -1) return res.status(404).json({ error: 'Task not found' });
  const deleted = tasks.splice(idx, 1);
  res.json(deleted[0]);
});

// manejador de errores basicos
app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
