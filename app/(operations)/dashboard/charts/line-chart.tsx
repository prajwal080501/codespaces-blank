import { TasksData } from '@/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Cell, Label, Line, Pie, PieChart } from "recharts";
import { tasksDueSoon } from '@/actions/task';

export async function  LineChart() {
    const chartData = await tasksDueSoon();
    console.log("chartData", chartData);
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Task Count | By Priority</CardTitle>
                <CardDescription>Task Distribution</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <div className="mx-auto aspect-square max-h-[250px]">
                    <PieChart width={300} height={300}>
                        <Line
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            strokeWidth={3}
                            stroke="#fff"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                            <Label
                                value={totalTasks}
                                position="center"
                                className="text-2xl font-bold"
                                fontSize={24}
                            />
                        </Pie>
                    </PieChart>
                </div>
            </CardContent>
            <CardFooter className="pt-4">
                <div className="flex w-full justify-center gap-4">
                    {chartData.map((entry, index) => (
                        <div key={`legend-${index}`} className="flex items-center gap-1">
                            <div
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-sm">{entry.name}: {entry.value}</span>
                        </div>
                    ))}
                </div>
            </CardFooter>
        </Card>
    )
}