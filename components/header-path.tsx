'use client';
import { usePathname } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import Link from 'next/link';

export default function HeaderPath() {
    const pathname = usePathname(); // Get the current route

    // Define routes where the header should not be displayed

    const currentPath = pathname.split('/').slice(1).join(' > '); // Get the current path

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                        Home
                    </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbPage className="text-sm font-medium text-muted-foreground">
                    {currentPath}
                </BreadcrumbPage>
            </BreadcrumbList>
        </Breadcrumb>
    )
}