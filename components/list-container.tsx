
'use client'
import { deleteTask, getAllTasksByUserId } from "@/actions/task";
import TaskTable from "./task-table";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from "react";

export default function ListContainer({ userId }: { userId: string }) {
    const [filter, setFilter] = useState({})

    const { data: tasks, isLoading } = useQuery({
        queryKey: ['tasks'],
        queryFn: () => getAllTasksByUserId(userId),
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
        <div className="flex flex-col gap-4">
            <TaskTable tasks={filteredTasks} setFilter={setFilter} />
        </div>
    )
}
