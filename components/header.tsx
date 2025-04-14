'use client'
import MessageBox from "./message-box";
import Link from "next/link";
import AuthManager from "./auth-manager";

export default function Header({ brandName, userId }: { brandName: string; userId: string | null }) {
    let message = {
        type: "",
        message: "",
        description: "",
    };

    return (
        <nav className="p-4 fixed top-0 w-full flex items-center justify-between z-10">
            <Link href="/" className="font-extrabold p-1 text-3xl">
                {brandName}
            </Link>
            <div className="flex gap-5 items-center">
                <MessageBox message={message} />
                <AuthManager userId={userId} />
            </div>
        </nav>
    );
}