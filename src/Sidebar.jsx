import React from 'react';
import './Sidebar.css';

function Sidebar({ currentView, setView }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">Task Manager</div>
      <nav>
        <ul>
          <li className={currentView === 'all' ? 'active' : ''} onClick={() => setView('all')}>
            Dashboard
          </li>
          <li className={currentView === 'completed' ? 'active' : ''} onClick={() => setView('completed')}>
            Completed Tasks
          </li>
          <li className={currentView === 'pending' ? 'active' : ''} onClick={() => setView('pending')}>
            Pending Tasks
          </li>
          <li className={currentView === 'inprogress' ? 'active' : ''} onClick={() => setView('inprogress')}>
            In Progress Tasks
          </li>
          <li className={currentView === 'add' ? 'active' : ''} onClick={() => setView('add')}>
            Add New Task
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
