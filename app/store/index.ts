import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import uiReducer from "./uiSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    ui: uiReducer,
  },
});


if (typeof window !== "undefined") {
  // const savedTasks = localStorage.getItem("tasks");
  // if (savedTasks) {
  //   store.dispatch({ type: "tasks/loadTasks", payload: JSON.parse(savedTasks) });
  // }


  store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem("tasks", JSON.stringify(state.tasks.list));
  });
}



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;