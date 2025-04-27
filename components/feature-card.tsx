import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import { Button } from "./ui/button"

export default function FeatureCard({feature}:{
    feature: {
        id: number;
        title: string;
        subtitle: string;
    }
}) {
    return (
        <Card className="py-2">
            <CardHeader className="text-2xl font-bold">Powerful</CardHeader>
            <CardDescription className="p-2">
                <div>
                    {feature.title}
                </div>
            </CardDescription>
            <CardContent>
                <div className="text-sm text-muted-foreground">
                    {feature.subtitle}
                </div>
            </CardContent>
            <CardFooter>
                <Button variant={'default'} className="w-fit">
                    Get Started
                </Button>
            </CardFooter>
        </Card>
    )
}