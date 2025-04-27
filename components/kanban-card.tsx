import TaskForm from "@/forms/task-form";

export default function KanbanCard({
    task
}:{
    task: {
        id: string;
        title: string;
        priority: string;
        status: string;
        dueDate: Date;
        userId: string;
    }
}){

    return (
        <div className="dark:bg-zinc-900 hover:ring-1 hover:ring-blue-100 hover:bg-blue-100 duration-200 rounded ring-gray-100 p-2">
            {/* Top bar */}
            <div>
                <div className="flex justify-between">
                    <div className={`text-sm font-bold text-gray-500 ${task.priority === "high" ? "text-red-500" : task.priority === "medium" ? "text-yellow-500" : "text-green-500"}`}>
                        {task.priority[0].toUpperCase() + task.priority.slice(1)}
                    </div>
                    <div className="text-sm font-bold text-gray-500">
                        {task.status[0].toUpperCase() + task.status.slice(1)}
                    </div>
                </div>
            </div>
            {/* Main Content  */}
            <div>
                <div className="font-medium text-lg">
                    {task.title}
                </div>
                <div className="text-sm text-gray-500">
                    {new Date(task.dueDate).toLocaleDateString()}
                </div>
            </div>
            {/* Bottom bar */}
            <div></div>
        </div>
    )
}