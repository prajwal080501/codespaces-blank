'use client'
export default function DashboardMessage({userName}:{userName: string}){
    return (
        <div className="sticky top-10 flex flex-col gap-4 p-4 pt-0">
            <div className="dark:bg-zinc-900 bg-gray-100 min-h-fit flex-1 rounded-xl sm:h-fit md:min-h-min">
                <div className="w-full flex justify-start items-center p-2 gap-2">
                    <h1 className="text-2xl dark:text-white">Welcome <span className="font-extrabold  rounded-lg px-2 py-1 text-blue-500">{userName}</span></h1>
                </div>
            </div>
        </div>
    )
}