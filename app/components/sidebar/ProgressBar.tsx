"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/app/store/index";
import { Task } from "@/app/types/task";


const ProgressBar = () => {
    const tasks = useSelector((state: RootState) => state.tasks.list);
    
    const completedCount = tasks.filter((task: Task) => task.completed).length;
    const totalCount = tasks.length;
    const progress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);



    return (
        <div className="progress_bar_container">
            <div 
            className="progress_bar_fill" 
            style={{ width: `${progress}%` }}>

            </div>
        </div>
    );
}

export default ProgressBar;