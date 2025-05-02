'use client'

import { deleteTask } from "@/actions/task"
import { useRouter } from "next/navigation"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { priorityClassMap, taskStatusClassMap, taskStatusMap } from "@/lib/utils"
import { Trash } from "lucide-react"
import { Button } from "./ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { TableFilter } from "./table-filter"
import TaskForm from "@/forms/task-form"
import { TasksData } from "@/types"
import UploadPopup from "./upload-popup"

export default function TaskTable({ tasks, setFilter, refetchTasks}: {
    tasks: TasksData,
    setFilter: (filter: Record<string, string>) => void,
    refetchTasks: () => void,

}) {
    const router = useRouter();
    const queryClient = useQueryClient();
    // Define the mutation correctly
    const mutation = useMutation({
        mutationFn: (taskId: string) => deleteTask(taskId),
        onSuccess: () => {
            // Invalidate and refetch tasks after successful deletion
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            router.refresh(); // Optional: refresh the page to ensure UI is updated
        },
        onError: (error) => {
            console.error("Failed to delete task:", error);
        }
    });

    // Simplified handler that just uses the mutation
    const handleDelete = (taskId: string) => {
        // Use confirm dialog for user confirmation
        if (confirm("Are you sure you want to delete this task?")) {
            mutation.mutate(taskId);
        }
    };
    return (
        <div>
            <div className="w-full self-end flex dark:bg-black items-end p-2 justify-end gap-3">
                <TaskForm />
                <Button 
                    onClick={refetchTasks} 
                    variant="outline" 
                    className="px-2 py-1"
                >
                    Refresh
                </Button>
                <UploadPopup />
                <TableFilter filterTitle="Tasks filter" tasks={tasks} setFilter={setFilter} />
            </div>
            <Table className="bg-white dark:bg-black/90 rounded">
                <TableCaption>A list of your recent tasks.</TableCaption>
                <TableHeader className="rounded-lg">
                    <TableRow className="bg-gray-200 dark:bg-zinc-900">
                        <TableHead className="w-[100px] font-extrabold">Title</TableHead>
                        <TableHead className="w-[100px] font-extrabold">Date</TableHead>
                        <TableHead className="font-extrabold">Status</TableHead>
                        <TableHead className="font-extrabold">Priority</TableHead>
                        <TableHead className="font-extrabold">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks && tasks.length > 0 ? (
                        tasks.map((task) => (
                            <TableRow className="hover:bg-blue-100 hover:dark:bg-zinc-800 cursor-pointer duration-150" key={task.id}>
                                <TableCell className="font-medium">{task.title}</TableCell>
                                <TableCell>
                                    {
                                        task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'
                                    }
                                </TableCell>
                                <TableCell className={
                                    taskStatusClassMap[task.status as keyof typeof taskStatusClassMap] + " font-medium"
                                }>
                                    {taskStatusMap[task.status as keyof typeof taskStatusMap] || task.status}
                                </TableCell>
                                <TableCell className={
                                    priorityClassMap[task.priority as keyof typeof priorityClassMap] + " font-medium"
                                }>
                                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <TaskForm editMode data={task} />
                                        <Button
                                            onClick={() => handleDelete(task.id)}
                                            variant="ghost"
                                            className="w-8 h-8 rounded-full hover:bg-red-500 hover:text-white duration-75 cursor-pointer"
                                            disabled={mutation.isPending}
                                        >
                                            <Trash className="w-4 h-4 text-red-500 hover:text-white duration-75 hover:scale-105" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-8">No tasks found</TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell className="text-black font-bold dark:text-white" colSpan={4}>Total Tasks</TableCell>
                        <TableCell className="text-right">{tasks?.length || 0}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>

    )
}