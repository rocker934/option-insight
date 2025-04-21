import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

export function StatCard({ title, value, icon, trend, className }: StatCardProps) {
  return (
    <div className={cn("rounded-lg border bg-card p-4 shadow-sm", className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="rounded-full bg-primary/10 p-2 text-primary">{icon}</div>
      </div>
      <div className="mt-2">
        <h3 className="text-2xl font-bold">{value}</h3>
        {trend && (
          <p className={cn(
            "mt-1 text-xs",
            trend.positive ? "text-green-500" : "text-red-500"
          )}>
            {trend.positive ? "↑" : "↓"} {trend.value}
          </p>
        )}
      </div>
    </div>
  );
}
