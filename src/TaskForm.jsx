import React, { useEffect, useState } from 'react';

const initialState = { title: '', description: '', completed: false, priority: 'P2' };

function TaskForm({ onSave, editingTask, onCancel }) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (editingTask) {
      setForm(editingTask);
    } else {
      setForm(initialState);
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description) return;
    onSave(form);
    setForm(initialState);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Título"
        required
        style={{ borderRadius: '8px', padding: '0.5rem', border: '1px solid #eebbc3', background: '#ffffffff', color: '#121619' }}
      />
      <input
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Descripción"
        required
        style={{ borderRadius: '8px', padding: '0.5rem', border: '1px solid #eebbc3', background: '#ffffffff', color: '#121619' }}
      />
      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
        required
        style={{ borderRadius: '8px', padding: '0.5rem', border: '1px solid #eebbc3', background: '#121629', color: '#fff' }}
      >
        <option value="P1">Prioridad Alta (P1)</option>
        <option value="P2">Prioridad Media (P2)</option>
        <option value="P3">Prioridad Baja (P3)</option>
      </select>
      {editingTask && (
        <label>
          <input
            type="checkbox"
            name="completed"
            checked={form.completed}
            onChange={handleChange}
          />
          Completada
        </label>
      )}
      <button type="submit">{editingTask ? 'Actualizar' : 'Agregar'}</button>
      {editingTask && <button type="button" onClick={onCancel}>Cancelar</button>}
    </form>
  );
}

export default TaskForm;
