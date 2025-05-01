'use client'
import { TasksData } from "@/types";
import { Cell, Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Define colors for chart
const COLORS = {
  low: "#10B981", // Green 
  medium: "#F59E0B", // Amber
  high: "#EF4444", // Red
};

// Define chart configuration types
interface ChartDataItem {
  name: string;
  value: number;
  color: string;
}

export function Chart({ data }: { data: TasksData }) {
  // Handle empty data case
  if (!data || data.length === 0) {
    return (
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Task Count | By Priority</CardTitle>
          <CardDescription>No data available</CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  // Count tasks by priority
  const priorityCounts = {
    low: 0,
    medium: 0,
    high: 0,
  };
  
  data.forEach((task) => {
    const priority = task.priority.toLowerCase();
    if (priority === "low") {
      priorityCounts.low += 1;
    } else if (priority === "medium") {
      priorityCounts.medium += 1;
    } else if (priority === "high") {
      priorityCounts.high += 1;
    }
  });

  // Format data for the chart
  const chartData: ChartDataItem[] = [
    { name: "Low", value: priorityCounts.low, color: COLORS.low },
    { name: "Medium", value: priorityCounts.medium, color: COLORS.medium },
    { name: "High", value: priorityCounts.high, color: COLORS.high },
  ];
  
  const totalTasks = chartData.reduce((acc, item) => acc + item.value, 0);

  // Render chart
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Task Count | By Priority</CardTitle>
        <CardDescription>Task Distribution</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="mx-auto aspect-square max-h-[250px]">
          <PieChart width={300} height={300}>
            <Pie
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
  );
}