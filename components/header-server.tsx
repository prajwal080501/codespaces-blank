import { auth } from "@clerk/nextjs/server";
import Header from "./header";

export default async function HeaderServer({
    brandName,
    pathname,
}: {
    brandName: string;
    pathname: string;
}) {
    const { userId } = await auth(); // Server-side logic

    return <Header brandName={brandName} userId={userId} />;
}