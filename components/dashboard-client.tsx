'use client'

import { useQuery } from '@tanstack/react-query'
import { getAllTasksByUserId } from "@/actions/task"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import ListView from '@/app/dashboard/views/list-view';
import DashboardView from '@/app/dashboard/views/dashboard-view';
import KanbanView from '@/app/dashboard/views/kanban-view';
import { TasksData } from '@/types';
// import CalendarView from '@/app/dashboard/views/calendar-view';
import { views } from '@/data/data';
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile'

export default function DashboardClient({
  userId,
}: {
  userId: string;
  user: {
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
  const isMobile = useIsMobile()
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <Tabs defaultValue="list-view" className="w-full">
        <TabsList className="grid w-full lg:w-[70%] grid-cols-4 gap-2 p-2 h-fit dark:bg-zinc-900">
          {
            views.map((view) => {
              const icon = view.icon
              return (
                <TabsTrigger key={view.id} value={view.value} className="cursor-pointer m-1">
                  {React.createElement(icon, { className: "w-4 h-4 mr-2" })}
                  {!isMobile && view.title}
                </TabsTrigger>
              )
            })
          }
          {/* <TabsTrigger value="dashboard">
            <LayoutDashboard /> Dashboard
          </TabsTrigger>
          <TabsTrigger value="kanban-view" className="cursor-pointer p-2">
            <Kanban className="w-4 h-4 mr-2" />
            Kanban View
          </TabsTrigger>
          <TabsTrigger value='calendar-view'>
          <Calendar className='w-4 h-4' />
            Calendar View
          </TabsTrigger> */}
        </TabsList>

        <TabsContent value="list-view" className="cursor-pointer bg-white dark:bg-black/80 rounded-lg">
          <ListView tasks={tasks || []} userId={userId} />
        </TabsContent>
        <TabsContent value="dashboard-view">
          <DashboardView data={tasks && tasks || []} />
        </TabsContent>
        <TabsContent value="kanban-view" className="cursor-pointer">
          <KanbanView data={tasks && tasks || []} />
        </TabsContent>
        <TabsContent value='calendar-view' className="cursor-pointer">
          {/* <CalendarView /> */}
          <div className='text-center h-90 w-full p-2 flex justify-center items-center'>
            Coming Soon
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}