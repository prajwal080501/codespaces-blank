import Hero from "@/components/hero";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const {orgId, orgRole} = await auth();
  console.log(orgId, orgRole, 'role org')
  return (
    <>
      <div className="@container w-full h-full mb-5">
          <Hero title="Your Premium Task Manager" description="Manage and streamline tasks at your fingertips"/>
      </div>
    </>
  )
}