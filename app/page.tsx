import TodayInfo from "./components/sidebar/TodayInfo";
import TaskFilters from "./components/tasks/TaskFilters";
import TaskList from "./components/tasks/TaskList";
import EditTaskModal from "./components/ui/EditTaskModal";

export default function Home() {
  return (
    <div className="home_container">
      <EditTaskModal />
      <div className="tasks_block">
        <TaskFilters/>
        <TaskList/>
      </div>

      <div className="info_block">
        <TodayInfo/>
      </div> 
    </div>
  );
}
