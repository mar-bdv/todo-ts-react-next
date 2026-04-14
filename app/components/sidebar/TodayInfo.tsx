"use client";

import { getFormattedDate } from "@/app/utils/date";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/index";
import { Task } from "@/app/types/task";

import ProgressBar from "./ProgressBar";

const getTaskWord = (count: number): string => {
    const mod10 = count % 10;
    const mod100 = count % 100;
    
    if (mod100 >= 11 && mod100 <= 19) {
        return "задач";
    }
    if (mod10 === 1) {
        return "задачу";
    }
    if (mod10 >= 2 && mod10 <= 4) {
        return "задачи";
    }
    return "задач";
};

const TodayInfo = () => {
    const todayDate = getFormattedDate();
    
    const tasks = useSelector((state: RootState) => state.tasks.list);
    
    const completedCount = tasks.filter((task: Task) => task.completed).length;
    const totalCount = tasks.length;

    
    return (
        <div className="info_container">
            <div className="info_text">
                <p className="info_date">Сегодня 
                    <span className="info_span">
                        {todayDate}
                    </span>
                </p>
                <p className="info_date">
                    Вы выполнили: <br/> 
                    <span className="info_span">{completedCount} </span> 
                    {getTaskWord(completedCount)} из {totalCount}
                </p>
            </div>


            <div className="motivation_block">
                <ProgressBar/>
                <p className="motivation_text">{totalCount === 0 ? "Готовы начать? Создайте первую задачу!" : "Продолжайте в том же духе!"}</p>
            </div>
        </div>
    );
}

export default TodayInfo;