'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from "@/components/ui/sonner"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/app-sidebar"
// import DashboardClient from "@/components/dashboard-client"
// import DashboardMessage from "@/components/dashboard-message"
import HeaderPath from '@/components/header-path'
import TaskForm from '@/forms/task-form'
import UploadPopup from '@/components/upload-popup'
const queryClient = new QueryClient()

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col gap-4">
        <SidebarProvider>
          {/* <AppSidebar /> */}
          <SidebarInset>
            <header className="w-full flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="w-full flex justify-between items-center gap-2 px-4">
                <div className="flex items-center gap-2">
                  {/* <SidebarTrigger className="-ml-1" /> */}
                  <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                  />
                  {/* Breadcrumb component */}
                  <HeaderPath />
                </div>
                <div className="flex gap-2 justify-start  items-center">
                  <TaskForm />
                  {/* <Button
              onClick={refetchTasks}
              variant="outline"
              className="px-2 py-1"
            >
              <RotateCcw className="w-4 h-4" />
            </Button> */}
                  <UploadPopup />
                </div>
              </div>
            </header>
            <Separator className="h-px bg-muted/50" />
            {children}
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </div>
    </QueryClientProvider>
  )
}