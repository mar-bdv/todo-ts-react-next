"use client";
import { useState } from "react";
import { addTask } from "../../store/tasksSlice";
import { useDispatch } from "react-redux";

const TaskAddButton = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const submit = () => {
    if (value.trim()) {
      dispatch(addTask(value));
      setValue("");
      setOpen(false);
    }
  };

  if (!open)
    return (
      <button 
        onClick={() => setOpen(true)}
        className="taskadd_btn"
      >
        Добавить задачу
      </button>
    );

  return (
    <div className="taskadd_input-container">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        className="taskadd_btn-input"
        placeholder="Введите задачу..."
      />
      <button 
        onClick={submit}
        className="taskadd_btn-plus"
      >+</button>
    </div>
  );
};

export default TaskAddButton;