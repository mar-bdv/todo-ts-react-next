// "use client";
// import { useDispatch, useSelector } from "react-redux";
// import TaskAddButton from "./TaskAddButton";
// import TaskItem from "./TaskItem";
// import { RootState } from "../../store";
// import { useState } from "react";
// import { removeCompleted } from "@/app/store/tasksSlice";

// const TaskList = () => {
//     const dispatch = useDispatch();

//     const tasks = useSelector((state: RootState) => state.tasks.list);
//     const filter = useSelector((state: RootState) => state.tasks.filter);

//     const filtered = tasks.filter((t) => {
//         if (filter === "active") return !t.completed;
//         if (filter === "completed") return t.completed;
//         return true;
//     });

//     const [showConfirm, setShowConfirm] = useState(false);

//     const handleConfirmDelete = () => {
//         dispatch(removeCompleted());
//         setShowConfirm(false);
//     };

//     return (
//         <div className="tasklist_container">
//             {filter === "completed" && filtered.length > 0 && (
//                 <div className="delete_container">
//                     <button
//                         className="delete_all_completed_link"
//                         onClick={() => setShowConfirm(true)}
//                     >
//                         Удалить все выполненные задачи
//                     </button>
//                 </div>
//             )}

//             <div className="tasklist_one">
//                 {filtered.length === 0 ? (
//                     <p style={{ textAlign: "center", color: "#7E7E7E" }}>Добавьте первую задачу!</p>
//                 ) : (
//                     filtered.map((task) => <TaskItem key={task.id} task={task} />)
//                 )}
//             </div>

//             {showConfirm && (
//                 <div className="modal_backdrop" onClick={() => setShowConfirm(false)}>
//                 <div className="confirm_modal" onClick={(e) => e.stopPropagation()}>
//                     <p style={{ marginBottom: 16 }}>Вы уверены, что хотите удалить все выполненные задачи?</p>
//                     <div style={{ display: "flex", gap: 12 }}>
//                         <button className="btn_confirm_modal" onClick={() => setShowConfirm(false)}>Нет</button>
//                         <button className="btn_confirm_modal btn_confirm_modal-yes" onClick={handleConfirmDelete}>Да</button>
//                     </div>
//                 </div>
//                 </div>
//             )}

//             <div className="tasklist_btn">
//                 <TaskAddButton/>
//             </div>
            
//         </div>
//     );
// }

// export default TaskList;

"use client";
import { useDispatch, useSelector } from "react-redux";
import TaskAddButton from "./TaskAddButton";
import TaskItem from "./TaskItem";
import { RootState } from "../../store";
import { useState } from "react";
import { removeCompleted, reorderTasks } from "@/app/store/tasksSlice";

const TaskList = () => {
    const dispatch = useDispatch();

    const tasks = useSelector((state: RootState) => state.tasks.list);
    const filter = useSelector((state: RootState) => state.tasks.filter);

    const [showConfirm, setShowConfirm] = useState(false);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    const filtered = tasks.filter((t) => {
        if (filter === "active") return !t.completed;
        if (filter === "completed") return t.completed;
        return true;
    });

    const getFilteredIndex = (taskId: string) => {
        return filtered.findIndex((t) => t.id === taskId);
    };

    const getActualIndex = (taskId: string) => {
        return tasks.findIndex((t) => t.id === taskId);
    };

    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (index: number) => {
        setDragOverIndex(index);
    };

    const handleDrop = () => {
        if (draggedIndex !== null && dragOverIndex !== null && draggedIndex !== dragOverIndex) {
            // Получаем ID задач для корректной работы при фильтрации
            const draggedTaskId = filtered[draggedIndex].id;
            const draggedActualIndex = getActualIndex(draggedTaskId);
            const dragOverTaskId = filtered[dragOverIndex].id;
            const dragOverActualIndex = getActualIndex(dragOverTaskId);

            dispatch(reorderTasks({
                fromIndex: draggedActualIndex,
                toIndex: dragOverActualIndex,
            }));
        }
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    const handleConfirmDelete = () => {
        dispatch(removeCompleted());
        setShowConfirm(false);
    };

    return (
        <div className="tasklist_container">
            {filter === "completed" && filtered.length > 0 && (
                <div className="delete_container">
                    <button
                        className="delete_all_completed_link"
                        onClick={() => setShowConfirm(true)}
                    >
                        Удалить все выполненные задачи
                    </button>
                </div>
            )}

            <div className="tasklist_one">
                {filtered.length === 0 ? (
                    <p style={{ textAlign: "center", color: "#7E7E7E" }}>Добавьте первую задачу!</p>
                ) : (
                    filtered.map((task, index) => (
                        <TaskItem 
                            key={task.id} 
                            task={task}
                            index={index}
                            onDragStart={handleDragStart}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            isDragging={draggedIndex === index}
                        />
                    ))
                )}
            </div>

            {showConfirm && (
                <div className="modal_backdrop" onClick={() => setShowConfirm(false)}>
                <div className="confirm_modal" onClick={(e) => e.stopPropagation()}>
                    <p style={{ marginBottom: 16 }}>Вы уверены, что хотите удалить все выполненные задачи?</p>
                    <div style={{ display: "flex", gap: 12 }}>
                        <button className="btn_confirm_modal" onClick={() => setShowConfirm(false)}>Нет</button>
                        <button className="btn_confirm_modal btn_confirm_modal-yes" onClick={handleConfirmDelete}>Да</button>
                    </div>
                </div>
                </div>
            )}

            <div className="tasklist_btn">
                <TaskAddButton/>
            </div>
            
        </div>
    );
}

export default TaskList;