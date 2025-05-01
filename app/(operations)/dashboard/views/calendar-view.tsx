import AppCalendar from "@/components/app-calendar";

export default function CalendarView() {
    return (
        <div className="bg-gray-100 dark:bg-black/80  overflow-auto min-h-[100vh] p-2 flex-1 rounded-xl md:min-h-min">
            <AppCalendar />
        </div>
    )
}