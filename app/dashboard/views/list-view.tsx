'use client'
import ListContainer from "@/components/list-container"
import { TasksData } from "@/types"

export default function ListView({tasks, user, userId}: {
    tasks: TasksData,
    user:any,
    userId: string
}) {
    return (
        <div className="bg-gray-100 dark:bg-black/80 rounded-lg overflow-auto min-h-[100vh] p-2 flex-1 rounded-xl md:min-h-min">
            <ListContainer userId={userId ? userId : ''} />
        </div>
    )
}