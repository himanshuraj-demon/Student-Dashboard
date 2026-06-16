import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  type TooltipProps,
  Area,
  AreaChart,
} from "recharts";
import { TrendingUp, CalendarDays } from "lucide-react";

const semesterData = [
  { sem: "S1", credits: 24 },
  { sem: "S2", credits: 24 },
  { sem: "S3", credits: 22 },
  { sem: "S4", credits: 22 },
  { sem: "S5", credits: 20 },
  { sem: "S6", credits: 20 },
  { sem: "S7", credits: 16 },
  { sem: "S8", credits: 16 },
];

const totalCredits = semesterData.reduce((sum, d) => sum + d.credits, 0);
const avgCredits = (totalCredits / semesterData.length).toFixed(1);
const peakCredits = Math.max(...semesterData.map((d) => d.credits));
const latestCredits = semesterData[semesterData.length - 1].credits;

const stats = [
  { label: "Total credits", value: totalCredits, sub: "Across all semesters" },
  { label: "Average / sem", value: avgCredits, sub: "Per semester" },
  { label: "Peak", value: peakCredits, sub: "S1 & S2" },
  { label: "Latest", value: latestCredits, sub: "S7 & S8" },
];

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-lg dark:border-white/10 dark:bg-zinc-900">
        <p className="mb-1 text-xs font-medium text-gray-400 dark:text-zinc-500">
          {label}
        </p>
        <p className="text-sm font-semibold text-gray-900 dark:text-white">
          {payload[0].value} credits
        </p>
      </div>
    );
  }
  return null;
};

export default function SemesterTrendChart() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-[#ffffff11] p-4 universal md:m-4 mt-4 m-1">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <TrendingUp size={18} className="text-blue-500" />
            <h2 className="text-sm font-semibold ">
              Semester credit trend
            </h2>
          </div>
          <p className="text-xs ">
            Credits earned across 8 semesters
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
          <CalendarDays size={11} />
          8 semesters
        </span>
      </div>

      {/* Stat Cards */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl bg-gray-50 px-4 py-3 dark:bg-white/5"
          >
            <p className="mb-1 text-xs ">
              {s.label}
            </p>
            <p className="text-xl font-semibold ">
              {s.value}
            </p>
            <p className="mt-0.5 text-[11px]">
              {s.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={semesterData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="creditGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#378ADD" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#378ADD" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="currentColor"
            vertical={false}
          />
          <XAxis
            dataKey="sem"
            tick={{ fontSize: 12, fill: "currentColor" }}
            axisLine={false}
            tickLine={false}
            dy={8}
          />
          <YAxis
            domain={[12, 28]}
            tick={{ fontSize: 12, fill: "currentColor" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v} cr`}
            tickCount={5}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#378ADD", strokeWidth: 1, strokeDasharray: "4 4" }} />
          <Area
            type="monotone"
            dataKey="credits"
            stroke="#378ADD"
            strokeWidth={2.5}
            fill="url(#creditGradient)"
            dot={{ r: 4, fill: "#378ADD", strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 6, fill: "#378ADD", strokeWidth: 2, stroke: "#fff" }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-2">
        <span className="inline-block h-0.5 w-6 rounded-full bg-blue-500" />
        <span className="text-xs ">
          Credits per semester
        </span>
      </div>
    </div>
  );
}