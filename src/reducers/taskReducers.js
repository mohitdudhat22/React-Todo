const initialState = {
  tasks: [],
};

const taskReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      localStorage.setItem('tasks', JSON.stringify(action.payload));
      return {
        ...state,
        tasks: action.payload,
      };
    case 'ADD_TASK':
      const newTasksAdd = [...state.tasks, action.payload];
      localStorage.setItem('tasks', JSON.stringify(newTasksAdd));
      return {
        ...state,
        tasks: newTasksAdd,
      };

    case 'DELETE_TASK':
      const newTasksDelete = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(newTasksDelete));
      return {
        ...state,
        tasks: newTasksDelete,
      };

    case 'TOGGLE_COMPLETION':
      const newTasksToggle = state.tasks.map((task) =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
      localStorage.setItem('tasks', JSON.stringify(newTasksToggle));
      return {
        ...state,
        tasks: newTasksToggle,
      };

    case 'EDIT_TASK_TITLE':
      const newTasksEdit = state.tasks.map((task) =>
        task.id === action.payload.id ? { ...task, title: action.payload.title } : task
      );
      localStorage.setItem('tasks', JSON.stringify(newTasksEdit));
      return {
        ...state,
        tasks: newTasksEdit,
      };

    default:
      return state;
  }
};

export default taskReducers;
