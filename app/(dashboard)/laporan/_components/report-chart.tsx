"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  XAxis,
  YAxis
} from "recharts"
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
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useCallback } from "react"

const chartConfig = {
  indicator: {
    label: "Capaian",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

interface IProps {
  report: {
    criteriaAuditId: string;
    criteriaCode: string;
    criteriaTitle: string;
    indicators: {
      indicatorAuditId: string;
      indicatorCode: string;
      indicatorTitle: string;
      achievement: number;
    }[];
  };
  type: 'bar' | 'radar';
}

export function ReportChart({ report, type }: IProps) {
  const chartData = report.indicators.map((criteria) => ({
    code: criteria.indicatorCode,
    indicator: criteria.achievement
  }));

  const getAverage = useCallback(() => {
    return report.indicators.reduce((acc, val) => acc + val.achievement, 0) / report.indicators.length
  }, [report]);

  return (
    <Card className="[&:not(:first-child)]:mt-4">
      <CardHeader className="items-center pb-4">
        <CardTitle>{report.criteriaCode}</CardTitle>
        <CardDescription>
          {report.criteriaTitle}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="w-full max-w-none mx-auto aspect-square"
          style={{
            maxHeight: type === 'radar' ? 250 : report.indicators.length * 30
          }}
        >
          {type === 'radar' ? (
            <RadarChart data={chartData}>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <PolarAngleAxis dataKey="code" />
              <PolarGrid />
              <Radar
                dataKey="indicator"
                fill="var(--color-indicator)"
                fillOpacity={0.6}
              />
            </RadarChart>
          ) : (
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
                dataKey="code"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
                hide
              />
              <XAxis dataKey="indicator" type="number" hide domain={[0, 4]} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar
                dataKey="indicator"
                layout="vertical"
                fill="var(--color-indicator)"
                radius={4}
              >
                <LabelList
                  dataKey="code"
                  position="insideLeft"
                  offset={8}
                  className="fill-(--color-label)"
                  fontSize={12}
                />
                <LabelList
                  dataKey="indicator"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          )}
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="[&>div]:max-h-40 w-full">
          <Table className="border [&_tr]:border-b [&_th]:border [&_td]:border">
            <TableHeader className="bg-muted-foreground/20 border sticky top-0 z-[1] backdrop-blur-xs">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-medium">Kode</TableHead>
                <TableHead className="text-right font-medium">Capaian</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {report.indicators.map((indicator) => (
                <TableRow key={indicator.indicatorAuditId}>
                  <TableCell>{indicator.indicatorCode}</TableCell>
                  <TableCell className="text-right">{indicator.achievement}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter className="bg-transparent">
              <TableRow className="hover:bg-transparent">
                <TableCell>Rata Rata Capaian</TableCell>
                <TableCell className="text-right">{getAverage().toFixed(2)}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </CardFooter>
    </Card>
  )
}
