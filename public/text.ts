import { Task } from "@/app/types/task"

type TasksState = {
    list: Task[];
    filter: "all" | "active" | "completed";
}

