'use client'
import { Chart } from "../charts/pie-chart";

export default function DashboardView({data}: {data: any}) {
    return (
        <Chart data={data}/>
    )
}