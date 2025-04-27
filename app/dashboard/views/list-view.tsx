'use client'
import ListContainer from "@/components/list-container"
import DashboardMessage from "@/components/dashboard-message"
import { Separator } from "@radix-ui/react-separator"

export default function ListView({tasks, user, userId}: {
    tasks: {
        id: string;
        title: string;
        status: string;
        priority: string;
        userId: string;
        dueDate: Date;
    }[],
    user:any,
    userId: string
}) {
    return (
        <div className="bg-gray-100 dark:bg-black/80 rounded-lg overflow-auto min-h-[100vh] p-2 flex-1 rounded-xl md:min-h-min">
            <ListContainer userId={userId ? userId : ''} />
        </div>
    )
}