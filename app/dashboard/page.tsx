import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { auth, currentUser } from "@clerk/nextjs/server"
import DashboardClient from "@/components/dashboard-client"
import DashboardMessage from "@/components/dashboard-message"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import Link from "next/link"

export default async function Page() {
  const { userId } = await auth()
  const user = await currentUser()
  const userObject = {
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
  }
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
            {/* Breadcrumb component */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <Link href="/">Home</Link>
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
        {/* Pass the userId to the client component */}
        <div className="relative flex w-full items-center justify-between p-2 font-bold text-black">
          <DashboardMessage userName={userObject.firstName + ' ' + userObject.lastName}  />
        </div>
        <DashboardClient userId={userId || ''} user={userObject} />
      </SidebarInset>
    </SidebarProvider>
  )
}