import { auth, currentUser } from "@clerk/nextjs/server"
import DashboardClient from "@/components/dashboard-client"
import DashboardMessage from "@/components/dashboard-message"

export default async function Page() {
  const { userId } = await auth()
  const user = await currentUser()
  const userObject = {
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
  }
  return (
    <>
      <div className="relative flex w-full items-center justify-between p-2 font-bold text-black">
        <DashboardMessage userName={userObject.firstName + ' ' + userObject.lastName} />
      </div>
      <DashboardClient userId={userId || ''} user={userObject} />
    </>
  )
}