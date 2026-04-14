
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { Task } from "../types/task";

// type TasksState = {
//   list: Task[];
//   filter: "all" | "active" | "completed";
// };

// const initialState: TasksState = {
//   list: [],
//   filter: "all",
// };

// const tasksSlice = createSlice({
//   name: "tasks",
//   initialState,
//   reducers: {
//     loadTasks: (state, action: PayloadAction<Task[]>) => {
//       state.list = action.payload;
//     },
//     addTask: (state, action: PayloadAction<string>) => {
//       state.list.push({
//         id: crypto.randomUUID(),
//         title: action.payload,
//         completed: false,
//         description: null,
//         category: null,
//         color: null,
//         colorBorder: null,
//       });
//     },
//     updateTask: (state, action: PayloadAction<Task>) => {
//       const index = state.list.findIndex((t) => t.id === action.payload.id);
//       if (index !== -1) {
//         state.list[index] = action.payload;
//       }
//     },
//     toggleTask: (state, action: PayloadAction<string>) => {
//       const task = state.list.find((t) => t.id === action.payload);
//       if (task) task.completed = !task.completed;
//     },
//     removeTask: (state, action: PayloadAction<string>) => {
//       state.list = state.list.filter((t) => t.id !== action.payload);
//     },
//     setFilter: (state, action: PayloadAction<TasksState["filter"]>) => {
//       state.filter = action.payload;
//     },
//     removeCompleted: (state) => {
//       state.list = state.list.filter(t => !t.completed);
//     },
//   },
// });

// export const { loadTasks, addTask, updateTask, toggleTask, removeTask, setFilter, removeCompleted } = tasksSlice.actions;
// export default tasksSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../types/task";

type TasksState = {
  list: Task[];
  filter: "all" | "active" | "completed";
};

type ReorderPayload = {
  fromIndex: number;
  toIndex: number;
};

const initialState: TasksState = {
  list: [],
  filter: "all",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    loadTasks: (state, action: PayloadAction<Task[]>) => {
      state.list = action.payload;
    },
    addTask: (state, action: PayloadAction<string>) => {
      state.list.push({
        id: crypto.randomUUID(),
        title: action.payload,
        completed: false,
        description: null,
        category: null,
        color: null,
        colorBorder: null,
      });
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.list.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.list.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((t) => t.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<TasksState["filter"]>) => {
      state.filter = action.payload;
    },
    removeCompleted: (state) => {
      state.list = state.list.filter(t => !t.completed);
    },
    reorderTasks: (state, action: PayloadAction<ReorderPayload>) => {
      const { fromIndex, toIndex } = action.payload;
      const [movedTask] = state.list.splice(fromIndex, 1);
      state.list.splice(toIndex, 0, movedTask);
    },
  },
});

export const { 
  loadTasks, 
  addTask, 
  updateTask, 
  toggleTask, 
  removeTask, 
  setFilter, 
  removeCompleted,
  reorderTasks 
} = tasksSlice.actions;
export default tasksSlice.reducer;



