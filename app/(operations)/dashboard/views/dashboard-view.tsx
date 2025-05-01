'use client'
import { Chart } from "../charts/pie-chart";
import {  TasksData } from "@/types";

export default function DashboardView({ data }: { data: TasksData }) {
  return (
    <Chart data={data} />
  )
}