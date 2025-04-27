
'use client'
import { deleteTask, getAllTasksByUserId } from "@/actions/task";
import TaskTable from "./task-table";
import { useCallback, useState } from "react";
import { useQuery, useQueryClient } from '@tanstack/react-query'

export default function ListContainer({ userId }: { userId: string }) {
    const [filter, setFilter] = useState({})
    const queryClient = useQueryClient();
    const refetchTasks = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }, [queryClient]);

    const { data: tasks, isLoading } = useQuery({
        queryKey: ['tasks'],
        queryFn: () => getAllTasksByUserId(userId),
        refetchOnWindowFocus: true,
        refetchOnReconnect: false,
        staleTime: 0,
    })
    // Function to apply filters
    const getFilteredTasks = () => {
        if (!tasks) return [];
      
        return tasks.filter(task => {
          // If no filters are set, return all tasks
          if (Object.keys(filter).length === 0) return true;
      
          // Check if task matches all filter criteria
          for (const [key, value] of Object.entries(filter)) {
            // Skip the "all" value since it means "any" (no filtering)
            if (value === "all") continue;
            
            // Check if the task property matches the filter value
            if (value && task[key as keyof typeof task] !== value) {
              return false;
            }
          }
          return true;
        });
      };

    if (isLoading) {
        return <div>Loading...</div>
    }

    const filteredTasks = getFilteredTasks();

    return (
        <div className="flex dark:bg-black/80 flex-col gap-4 h-1/2 overflow-y-auto">
            <TaskTable tasks={filteredTasks} setFilter={setFilter} refetchTasks={refetchTasks}/>
        </div>
    )
}
