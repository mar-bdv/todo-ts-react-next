"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setFilter } from "../../store/tasksSlice";

const TaskFilters = () => {
    const dispatch = useDispatch();
    const filter = useSelector((state: RootState) => state.tasks.filter);

    return (
        <div className="filters_container">
            <div
                className={`filter_block ${filter === "all" ? "filter_block-active" : ""}`}
                onClick={() => dispatch(setFilter("all"))}
            >
                <p className="filter_text">Все</p>
            </div>

            <div
                className={`filter_block ${filter === "active" ? "filter_block-active" : ""}`}
                onClick={() => dispatch(setFilter("active"))}
            >
                <p className="filter_text">Активные</p>
            </div>

            <div
                className={`filter_block ${filter === "completed" ? "filter_block-active" : ""}`}
                onClick={() => dispatch(setFilter("completed"))}
            >
                <p className="filter_text">Выполненные</p>
            </div>
        </div>
    );
};

export default TaskFilters;