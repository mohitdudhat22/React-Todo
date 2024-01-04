// actions.js
export const addTask = (task) => ({
    type: 'ADD_TASK',
    payload: task,
  });
  
  export const deleteTask = (taskId) => ({
    type: 'DELETE_TASK',
    payload: taskId,
  });
  
  export const toggleCompletion = (taskId) => ({
    type: 'TOGGLE_COMPLETION',
    payload: taskId,
  });
  
  export const editTaskTitle = (taskId, newTitle) => ({
    type: 'EDIT_TASK_TITLE',
    payload: { id: taskId, title: newTitle },
  });

export const setTasks = (tasks) => ({
  type: 'SET_TASKS',
  payload: tasks,
});
  