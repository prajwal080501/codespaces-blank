import { AppSidebar } from "@/components/app-sidebar"
import DashboardMessage from "@/components/dashboard-message"
import ListContainer from "@/components/list-container"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import TaskForm from "@/forms/task-form"
import { auth, currentUser } from "@clerk/nextjs/server"
import Link from "next/link"
import { TableFilter } from "@/components/table-filter"
export default async function Page() {
  const user = await currentUser()
  const { userId } = await auth()
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <Link href="/">
                    Home
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <Separator className="h-px bg-muted/50" />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div> */}
          <div className="bg-gray-100 overflow-auto min-h-[100vh] p-2 flex-1 rounded-xl md:min-h-min">
            <div className="w-full flex items-center justify-between p-2 gap-2">
              <div>
                <DashboardMessage userName={user?.firstName + ' ' + user?.lastName} />
              </div>
              <div className="flex items-center gap-2">
                <Input type="text" name='search' placeholder="Search" className="w-42 bg-white ring-0 focus:ring-1 focus:ring-blue-500" />
                <TaskForm />
              </div>
            </div>
            <Separator className="h-px bg-muted/50" />
            <ListContainer userId={userId ? userId : ''} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
