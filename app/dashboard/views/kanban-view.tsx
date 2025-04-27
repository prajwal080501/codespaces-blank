'use client'
import KanbanContainer from "@/components/kanban-container";
import { TasksData } from "@/types";
export default function KanbanView({data}:{
    data: TasksData,
}) {

    let todo = data.filter((task) => task.status === "todo");
    let inProgress = data.filter((task) => task.status === "inProgress");
    let done = data.filter((task) => task.status === "completed");
    return (
        <div className="p-2 bg-gray-100 dark:bg-black rounded-lg min-h-[100vh] md:min-h-min">
            <div className='h-1/2 w-full grid grid-cols-3 place-items-center gap-4'>
                <div className="h-full w-full">
                    <KanbanContainer tasks={todo}  type="todo" />
                </div>
                <div className="h-full w-full">
                <KanbanContainer tasks={inProgress}  type="in-progress" />
                </div>
                <div className="h-full w-full">
                    <KanbanContainer tasks={done}  type="done" />
                </div>
            </div>
        </div>
    )
}