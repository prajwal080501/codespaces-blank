"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


export function Chart({data}:{data: any}) {
    const rawData = data;
    const obj = {
        low: 0,
        medium: 0,
        high: 0,
    }
    rawData.forEach((item: any) => {
        console.log(item, 'item');
        if (item.priority.toLowerCase() === "low") {
            obj.low += 1;
        } else if (item.priority.toLowerCase() === "medium") {
            obj.medium += 1;
        }
        else if (item.priority.toLowerCase() === "high") {
            obj.high += 1;
        }
    });

    const chartData = [
        { status: "Low", count: obj.low },
        { status: "Medium", count: obj.medium },
        { status: "High", count: obj.high },
    ]
    console.log(chartData, 'chartData');
    
    const chartConfig: ChartConfig = {
        status:{
            label: 'status',
        },
        low:{
            label: 'Low',
            color: 'red',
        },
        medium:{
            label: 'Medium',
            color: 'orange',
        },
        high:{
            label: 'High',
            color: 'green',
        },
    } satisfies ChartConfig
    const totalCounts = chartData.reduce((acc, item) => acc + item.count, 0)
    console.log(totalCounts, 'totalCounts');
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Task Count | By Priority</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalCounts.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Tasks
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Task Count By Priority
        </div>
      </CardFooter>
    </Card>
  )
}
