'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from "@/components/ui/sonner"

const queryClient = new QueryClient()

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="flex flex-col gap-4">
                {children}
                <Toaster />
            </div>
        </QueryClientProvider>
    )
}