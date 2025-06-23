"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { university: "Institut Teknologi Bandung", dosen: 2 },
  { university: "Universitas Indonesia", dosen: 2 },
  { university: "Universitas Padjadjaran", dosen: 1 },
  { university: "Universitas Siliwangi", dosen: 1 },
]

const chartConfig = {
  dosen: {
    label: "Jumlah Dosen",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig

export function ChartUniversityOrigin() {
  return (
    <ChartContainer config={chartConfig} className="max-h-52">
      <BarChart
        accessibilityLayer
        data={chartData}
        layout="vertical"
        margin={{
          right: 16,
        }}
      >
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey="university"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
          hide
        />
        <XAxis dataKey="dosen" type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Bar
          dataKey="dosen"
          layout="vertical"
          fill="var(--color-dosen)"
          radius={4}
        >
          <LabelList
            dataKey="university"
            position="insideLeft"
            offset={8}
            className="fill-(--color-label)"
            fontSize={12}
          />
          <LabelList
            dataKey="dosen"
            position="right"
            offset={8}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}
