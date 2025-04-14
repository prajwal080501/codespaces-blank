import { ArrowDown } from "lucide-react";
import { Button } from "./ui/button";
import BrandIcon from "./brand-icon";

export default function Hero({ title, description }: { title: string, description: string }) {
    return (
        <div>
            <div className=" min-h-screen z-10 w-full flex flex-col items-center justify-center">
                <BrandIcon />
                <h1 className="text-5xl font-bold text-center mb-4">{title}</h1>
                <p className="text-xl text-center mb-8 text-gray-700">{description}</p>
                <div className="flex flex-col gap-3 items-center justify-center">
                    <Button variant="default" className="bg-black duration-500 cursor-pointer text-white hover:bg-blue-600">
                        Get Started
                    </Button>
                    <ArrowDown className="animate-bounce text-black font-bold mt-5" />
                </div>
            </div>
            {/* <div className="absolute top-0 right-0 left-0 h-1/2 bg-gradient-to-t from-gray-100 to-red-400 z-0"></div> */}
        </div>
    )
}