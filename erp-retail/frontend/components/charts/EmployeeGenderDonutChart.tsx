import React, { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import {
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer,
  PieProps,
  PieLabelRenderProps,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { getGenderStats } from "@/services/emmployeeService";

interface GenderDataItem {
  gender: string;
  value: number;
  fill: string;
}

const chartColors = ["var(--chart-1)", "var(--chart-2)"]; // CSS theme variables

const EmployeeGenderDonutChart: React.FC = () => {
  const [chartData, setChartData] = useState<GenderDataItem[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getGenderStats(); // Expects { male: number, female: number }
        const male = res.data?.male ?? 0;
        const female = res.data?.female ?? 0;

        setChartData([
          { gender: "Male", value: male, fill: chartColors[0] },
          { gender: "Female", value: female, fill: chartColors[1] },
        ]);
        setTotal(male + female);
      } catch (err) {
        console.error("Failed to fetch gender stats", err);
      }
    };

    fetchStats();
  }, []);

  const chartConfig: ChartConfig = {
    value: { label: "Employees" },
    Male: { label: "Male", color: chartColors[0] },
    Female: { label: "Female", color: chartColors[1] },
  };

  const activeShape = (props: PieLabelRenderProps & { outerRadius?: number }) => {
    const { outerRadius = 0, ...rest } = props;
    return <Sector {...rest} outerRadius={outerRadius + 10} />;
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Employee Gender Ratio</CardTitle>
        <CardDescription>Total Employees: {total}</CardDescription>
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
              dataKey="value"
              nameKey="gender"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={0}
              activeShape={activeShape}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          {total > 0 ? (
            <>
              Male {Math.round((chartData[0]?.value / total) * 100)}% | Female{" "}
              {Math.round((chartData[1]?.value / total) * 100)}%
            </>
          ) : (
            "No data"
          )}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Current employee gender distribution
        </div>
      </CardFooter>
    </Card>
  );
};

export default EmployeeGenderDonutChart;
