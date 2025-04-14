export default function DashboardMessage({userName}:{userName: string}){
    return (
        <div className="flex flex-col gap-4 p-4 pt-0">
            <div className="bg-gray-100 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
                <div className="w-full flex justify-end items-center p-2 gap-2">
                    <h1 className="text-2xl">Welcome <span className="font-extrabold  rounded-lg px-2 py-1 text-blue-500">{userName}</span></h1>
                </div>
            </div>
        </div>
    )
}