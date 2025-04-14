import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button"

export default function FeatureCard() {
    return (
        <Card className="py-2">
            <CardHeader className="text-2xl font-bold">Powerful</CardHeader>
            <CardDescription className="p-2">
                <div>
                    Powerful task management system
                </div>
            </CardDescription>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <Button variant={'default'} className="w-fit">
                    Get Started
                </Button>
            </CardFooter>
        </Card>
    )
}