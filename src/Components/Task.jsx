// Task.jsx
import React, { useState } from 'react';

const Task = ({ task, onDelete, onToggleCompletion, onEditTitle, editing, onToggleEdit }) => {
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleSave = () => {
    onEditTitle(editedTitle);
    onToggleEdit();
  };

  return (
    <li className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div className="task-details">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggleCompletion}
        />

        {editing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleSave}
            autoFocus
          />
        ) : (
          <span className={task.completed ? 'completed-task' : ''}>{task.title}</span>
        )}
      </div>

      <div className="task-actions">
        {editing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <>
            <button onClick={onToggleEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
          </>
        )}
      </div>
    </li>
  );
};

export default Task;
