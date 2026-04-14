"use client";

import { Provider } from "react-redux";
import { store } from "./index";
import { useEffect } from "react";
import { loadTasks } from "./tasksSlice";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      store.dispatch(loadTasks(JSON.parse(savedTasks)));
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
  // return <Provider store={store}>{children}</Provider>;
}