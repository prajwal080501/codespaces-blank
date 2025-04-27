'use client'
import TaskForm from "@/forms/task-form";
import KanbanCard from "./kanban-card";
import { Separator } from "./ui/separator";
import { TasksData } from "@/types";

export default function KanbanContainer({ type, tasks }: {
    type: string, tasks: TasksData
}) {
    let title = "";
    if (type === "todo") {
        title = "To Do";
    }
    else if (type === "in-progress") {
        title = "In Progress";
    }
    else if (type === "done") {
        title = "Done";
    }
    else {
        title = "Unknown";
    }
    return (
        <div className="p-2 relative w-full h-full rounded-lg">
            <div className="sticky flex w-full items-center justify-between top-0 p-2 font-bold text-black">
                <span className="dark:text-white">{title}</span>
                <TaskForm displayMode="icon" />
            </div>
            <Separator className="h-px bg-gray-200/50" />
            {/* Cards */}
            <div className="grid grid-cols-1 gap-2 p-2">
                {
                    tasks.map((task) => (
                        <KanbanCard key={task.id} task={task} />
                    ))
                }
            </div>
            {
                tasks.length === 0 && (
                    <div className="text-center w-full h-full text-gray-500">
                        No tasks available
                    </div>
                )
            }
        </div>
    )
}