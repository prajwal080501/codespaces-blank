"use client";

import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";

export default function AuthManager({ userId }: { userId: string | null }) {
    return (
        <>
            <SignedOut>
                <SignInButton>
                    <Button variant={"default"} className="text-lg font-medium cursor-pointer">
                        Sign in
                    </Button>
                </SignInButton>
                <SignUpButton>
                    <Button variant={"outline"} className="text-lg font-medium cursor-pointer">
                        Sign up
                    </Button>
                </SignUpButton>
            </SignedOut>
            <SignedIn>
                {userId && (
                    <Link href="/dashboard">
                        <Button
                            title="Dashboard"
                            variant={"outline"}
                            className="text-lg font-medium cursor-pointer"
                        >
                            Dashboard
                        </Button>
                    </Link>
                )}
                <UserButton
                    appearance={{
                        elements: {
                            userButtonBox: "flex items-center justify-center",
                            userButtonAvatarBox: "rounded-full",
                            userButtonAvatar: "rounded-full",
                            userButtonName: "text-sm font-medium",
                            userButtonProfile: "hidden",
                            userButtonDropdown: "hidden",
                        },
                    }}
                />
            </SignedIn>
        </>
    );
}