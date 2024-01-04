import React, { useState, useEffect } from 'react';
import Task from './Task';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) setTasks(JSON.parse(storedTasks));
  }, []);

  useEffect(() => {
    if (tasks && tasks.length > 0) localStorage.setItem('tasks', JSON.stringify(tasks));
    else localStorage.removeItem('tasks');
  }, [tasks]);

  const addTask = () => {
    if (newTaskTitle.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), title: newTaskTitle, completed: false }]);
      setNewTaskTitle('');
      setError('');
    } else setError('Task title is required!');
  };

  const deleteTask = (taskId) => setTasks(tasks.filter((task) => task.id !== taskId));

  const toggleCompletion = (taskId) =>
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)));

  const editTaskTitle = (taskId, newTitle) => {
    if (newTitle.trim() !== '') {
      setTasks(tasks.map((task) => (task.id === taskId ? { ...task, title: newTitle } : task)));
      setEditingTaskId(null);
      setError('');
    } else setError('Task title is required!');
  };

  const filterTasks = (taskList, filterType) => {
    switch (filterType) {
      case 'completed':
        return taskList.filter((task) => task.completed);
      case 'uncompleted':
        return taskList.filter((task) => !task.completed);
      default:
        return taskList;
    }
  };

  const filteredTasks = filterTasks(tasks, filter);

  return (
    <div className="task-list-container">
      <div className={`task-list show`}>
        <div className="filter-options">
          <button onClick={() => setFilter('all')}>Show All</button>
          <button onClick={() => setFilter('completed')}>Show Completed</button>
          <button onClick={() => setFilter('uncompleted')}>Show Uncompleted</button>
        </div>

        <div className="input-container">
          <input type="text" placeholder="Add a new task" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} />
          <button onClick={addTask}>Add Task</button>
        </div>
        {error && <p className="error-message">{error}</p>}

        <ul className="task-cards">
          {filteredTasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onDelete={() => deleteTask(task.id)}
              onToggleCompletion={() => toggleCompletion(task.id)}
              onEditTitle={(newTitle) => editTaskTitle(task.id, newTitle)}
              editing={editingTaskId === task.id}
              onToggleEdit={() => setEditingTaskId(editingTaskId === task.id ? null : task.id)}
              editValue={editingTaskId === task.id ? newTaskTitle : ''}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
