'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from "@/components/ui/sonner"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
// import DashboardClient from "@/components/dashboard-client"
// import DashboardMessage from "@/components/dashboard-message"
import Link from "next/link"
import HeaderPath from '@/components/header-path'
const queryClient = new QueryClient()

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col gap-4">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="w-full flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="w-full flex justify-between items-center gap-2 px-4">
                <div className="flex items-center gap-2">
                  <SidebarTrigger className="-ml-1" />
                  <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                  />
                  {/* Breadcrumb component */}
                  <HeaderPath />
                </div>
                <div>
                  <Link className="bg-white p-2 rounded-sm font-medium text-black hover:bg-white/70 duration-200" href={
                    '/teams'
                  }>Manage Teams</Link>
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