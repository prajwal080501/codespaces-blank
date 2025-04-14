import FeatureCard from "./feature-card";

export default function Features() {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <div className="w-full mt-2 grid grid-cols-3 gap-3">
                <FeatureCard />
                <FeatureCard />
                <FeatureCard />
            </div>
        </div>
    )
}