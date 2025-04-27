'use client'

import { useQuery } from '@tanstack/react-query'
import { getAllTasksByUserId } from "@/actions/task"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Kanban, LayoutDashboard, List } from 'lucide-react';
import ListView from '@/app/dashboard/views/list-view';
import DashboardView from '@/app/dashboard/views/dashboard-view';
import KanbanView from '@/app/dashboard/views/kanban-view';
import { TasksData } from '@/types';

export default function DashboardClient({ 
  userId,
}: { 
  userId: string;
  user:{
    firstName: string;
    lastName: string;
  };
}) {
  // Set up React Query with initialData from server
  const { data: tasks } = useQuery<TasksData>({
    queryKey: ['tasks', userId],
    queryFn: () => getAllTasksByUserId(userId),
    refetchOnWindowFocus: true,
    staleTime: 30000, // Consider data fresh for 30 seconds
    // Only run the query if we have a userId
    enabled: !!userId,
  });

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <Tabs defaultValue="list-view" className="w-full">
        <TabsList className="grid w-fit grid-cols-3 gap-2 p-2 h-fit dark:bg-zinc-900">
          <TabsTrigger value="list-view" className="cursor-pointer m-1">
            <List className="w-4 h-4 mr-2" />
            List View
          </TabsTrigger>
          <TabsTrigger value="dashboard">
            <LayoutDashboard /> Dashboard
          </TabsTrigger>
          <TabsTrigger value="kanban-view" className="cursor-pointer p-2">
            <Kanban className="w-4 h-4 mr-2" />
            Kanban View
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="list-view" className="cursor-pointer bg-white dark:bg-black/80 rounded-lg">
          <ListView tasks={tasks || []} userId={userId}  />
        </TabsContent>
        <TabsContent value="dashboard">
          <DashboardView data={tasks && tasks || []} />
        </TabsContent>
        <TabsContent value="kanban-view" className="cursor-pointer">
          <KanbanView data={tasks && tasks || []}/>
        </TabsContent>
      </Tabs>
    </div>
  );
}