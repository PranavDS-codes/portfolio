import { metrics } from "@/data/profile";
import { cn } from "@/lib/utils";
import { Stagger, StaggerItem } from "./Motion";

const toneMap = {
  teal: "text-teal",
  violet: "text-violet",
  amber: "text-amber",
};

export function MetricStrip() {
  return (
    <Stagger className="grid gap-4 border-y border-line py-5 sm:grid-cols-3">
      {metrics.map((metric) => (
        <StaggerItem key={metric.label} className="sm:border-r sm:border-line sm:pr-5 last:sm:border-r-0">
          <p className={cn("text-2xl font-black tracking-tight sm:text-3xl", toneMap[metric.tone as keyof typeof toneMap])}>{metric.value}</p>
          <p className="mt-1.5 text-xs leading-5 text-slate-400">{metric.label}</p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
