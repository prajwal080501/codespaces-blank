export default function AppCalendar() {
    const currentMonth = new Date().getMonth();
    const daysInMonth = new Date(new Date().getFullYear(), currentMonth + 1, 0).getDate();

    return (
        <div className="bg-gray-100 dark:bg-black/80  overflow-auto min-h-[100vh] p-2 flex-1 rounded-xl md:min-h-min">
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Calendar</h1>
                <div className="grid grid-cols-7 gap-4">
                    {Array.from({ length: daysInMonth }, (_, i) => (
                        <div key={i} className="p-1 w-16 text-center border rounded-lg bg-white dark:bg-zinc-800">
                            {i + 1}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}