export default function SectionWrapper({ children, title, className }: { children: React.ReactNode, title: string, className: string}) {
    return (
        <div className={`relative max-w-7xl mx-auto h-full flex flex-col items-center justify-center ${className}`}>
            {/* Section title */}
            <div className="flex items-start p-2 w-full h-1/4">
                <h1 className="text-4xl font-bold text-center">{title}</h1>
            </div>
            {children}
        </div>
    )
}