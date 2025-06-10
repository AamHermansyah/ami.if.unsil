import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils"; // pastikan ini mengarah ke util cn kamu

type OverviewCardProps = {
  label: string;
  value: string | number;
  icon: ReactNode;
  color: "blue" | "green" | "purple" | "orange" | "red";
  description?: string;
  progress?: number;
};

const colorVariants = {
  blue: {
    border: "border-l-blue-500",
    text: "text-blue-600",
    bg: "bg-blue-100",
  },
  green: {
    border: "border-l-green-500",
    text: "text-green-600",
    bg: "bg-green-100",
  },
  purple: {
    border: "border-l-purple-500",
    text: "text-purple-600",
    bg: "bg-purple-100",
  },
  orange: {
    border: "border-l-orange-500",
    text: "text-orange-600",
    bg: "bg-orange-100",
  },
  red: {
    border: "border-l-red-500",
    text: "text-red-600",
    bg: "bg-red-100",
  },
};

export const OverviewCard = ({
  label,
  value,
  icon,
  color,
  description,
  progress,
}: OverviewCardProps) => {
  const colorClass = colorVariants[color];

  return (
    <Card className={cn("border-l-4", colorClass.border)}>
      <CardContent className="px-4 md:px-6 py-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{label}</p>
            <p className={cn("text-3xl font-bold", colorClass.text)}>{value}</p>
          </div>
          <div
            className={cn(
              "w-12 h-12 rounded-lg flex items-center justify-center",
              colorClass.bg
            )}
          >
            {icon}
          </div>
        </div>
        {progress !== undefined ? (
          <Progress value={progress} className="mt-3" />
        ) : (
          description && (
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
          )
        )}
      </CardContent>
    </Card>
  );
};
