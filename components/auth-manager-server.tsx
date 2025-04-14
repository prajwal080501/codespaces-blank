import { auth } from "@clerk/nextjs/server";
import AuthManager from "./auth-manager";

export default async function AuthManagerServer() {
    const { userId } = await auth(); // Server-side logic

    return <AuthManager userId={userId} />;
}