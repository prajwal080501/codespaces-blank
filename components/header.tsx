'use client'
import MessageBox from "./message-box";
import Link from "next/link";
import AuthManager from "./auth-manager";
import { ModeToggle } from "./mode-toggle";

export default function Header({ brandName, userId }: { brandName: string; userId: string | null }) {
    let message = {
        type: "",
        message: "",
        description: "",
    };

    if (userId) {
        message = {
            type: "success",
            message: "Welcome back!",
            description: "You are logged in.",
        };
    } else {
        message = {
            type: "error",
            message: "Please log in.",
            description: "You are not logged in.",
        };
    }

    return (
        <nav className="p-4 fixed top-0 w-full flex items-center justify-between z-10">
            <Link href="/" className="font-extrabold p-1 text-3xl">
                {brandName}
            </Link>
            <div className="flex gap-5 items-center w-fit p-4">
                <ModeToggle />
                <MessageBox message={message} />
                <AuthManager userId={userId} />
            </div>
        </nav>
    );
}