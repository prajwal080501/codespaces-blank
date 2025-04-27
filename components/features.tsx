import FeatureCard from "./feature-card";
import { FeaturesArray } from "@/data/data";
export default function Features() {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <div className="w-full mt-2 grid grid-cols-3 gap-3">
                {
                    FeaturesArray.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} />
                    ))
                }
            </div>
        </div>
    )
}