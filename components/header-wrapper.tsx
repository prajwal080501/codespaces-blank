"use client";

import { usePathname } from "next/navigation";
import Header from "./header";

export default function HeaderWrapper({
    brandName,
    userId,
}: {
    brandName: string;
    userId: string | null;
}) {
    const pathname = usePathname(); // Get the current route

    // Define routes where the header should not be displayed
    const hiddenPaths = ["/login", "/register", "/dashboard"];

    if (hiddenPaths.includes(pathname)) {
        return null; // Do not render the header
    }

    return <Header brandName={brandName} userId={userId} />;
}