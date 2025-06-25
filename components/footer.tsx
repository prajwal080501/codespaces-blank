export default function Footer() {
    return (
        <div className="absolute bottom-0 w-[100%] mx-auto p-2 bg-black rounded-lg mt-24">
            <div>
                <p className="text-sm text-center p-2">
                    &copy; {
                        new Date().getFullYear()
                    } <b>DoTheTodo</b> All Rights Reserved
                </p>
            </div>
        </div>
    )
}