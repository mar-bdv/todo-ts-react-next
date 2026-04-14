
"use client";
import { useDispatch } from "react-redux";
import { Task } from "../../types/task";
import { removeTask, toggleTask } from "@/app/store/tasksSlice";
import { openModal } from "@/app/store/uiSlice";
import { useState } from "react";

type Props = {
  task: Task;
  index: number;
  onDragStart: (index: number) => void;
  onDragOver: (index: number) => void;
  onDrop: () => void;
  isDragging?: boolean;
};

const TaskItem = ({ task, index, onDragStart, onDragOver, onDrop, isDragging }: Props) => {
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  

  const handleDelete = () => {
    dispatch(removeTask(task.id));
    setShowConfirm(false);
  };

  const handleToggle = () => {
    dispatch(toggleTask(task.id));
  };

  const handleEdit = () => {
    dispatch(openModal(task));
  };

  return (
    <div 
      className={`task_container ${isDragging ? 'dragging' : ''}`}
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver(index);
      }}
      onDrop={onDrop}
      onDragEnd={onDrop}
    >
      <div className="task_checkbox-block">
        <button onClick={handleToggle} className="task_checkbox">
          {task.completed 
          ?
          <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="18" height="17" rx="8.5" stroke="black"/>
            <line x1="5.40556" y1="10.1562" x2="8.15617" y2="13.5944" stroke="black" strokeWidth="2" strokeLinecap="round"/>
            <line x1="14.2458" y1="5.39269" x2="8.39269" y2="13.7542" stroke="black" strokeWidth="2" strokeLinecap="round"/>
          </svg>

          : 
          <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="18" height="17" rx="8.5" stroke="black"/>
          </svg>
          }
        </button>
      </div>
      <div className="task_block">
        <div className="task_info">
          <p className="task_name" style={{ textDecoration: task.completed ? "line-through" : "none" }}>
            {task.title}
          </p>
          <p className="task_descr">
            {task?.description ? task.description : 'Нет описания'}
          </p>

          {task?.category ?  
            <p 
              className="task_category"
              style={{
                backgroundColor: task.color ?? undefined, 
                border: `1px solid ${task.colorBorder ?? '#ccc'}`
              }}
            >
              {task.category}
            </p>
            :
            ''
          }

        </div>

        <div className="task_actions">
          <button className="task_delete" onClick={() => setShowConfirm(true)}>
            <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.08643 1L9.67236 10" stroke="#F44336" strokeWidth="2" strokeLinecap="round"/>
              <path d="M9.67236 0.999999L1.00006 10.0865" stroke="#F44336" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          <button className="task_edit" onClick={handleEdit}>
            <svg width="4" height="14" viewBox="0 0 4 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="2" cy="2" r="2" fill="black"/>
              <circle cx="2" cy="12" r="2" fill="black"/>
              <circle cx="2" cy="7" r="2" fill="black"/>
            </svg>
          </button>
        </div>

          {showConfirm && (
            <div className="modal_backdrop" onClick={() => setShowConfirm(false)}>
              <div className="confirm_modal" onClick={(e) => e.stopPropagation()}>
                  <p style={{ marginBottom: 16 }}>Вы уверены, что хотите удалить задачу?</p>
                  <div style={{ display: "flex", gap: 12 }}>
                      <button className="btn_confirm_modal" onClick={() => setShowConfirm(false)}>Нет</button>
                      <button className="btn_confirm_modal btn_confirm_modal-yes" onClick={handleDelete}>Да</button>
                  </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default TaskItem;