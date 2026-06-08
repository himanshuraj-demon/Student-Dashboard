import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
];
const data = [
  { name: "Core", value: 64 },
  { name: "Electives", value: 24 },
  { name: "HSS", value: 20 },
  { name: "Open Electives", value: 20 },
  { name: "Science + Math", value: 14 },
  { name: "Institute", value: 28 },
];

export default function CreditBreakdownChart() {
  return (
    <div className="card">
      <h2 className="text-2xl font-semibold mx-4">Credit Distribution</h2>

      {/* Desktop: chart left, list right. Mobile: chart top, list bottom */}
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        {/* Chart */}
        <div className="w-full md:w-1/2 shrink-0">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={4}>
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="w-full md:w-1/2 flex flex-col gap-2 mr-4">
          {data.map((value, i) => (
            <li
              key={i}
              className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                <span className="text-sm font-medium text-gray-700 dark:text-black">
                  {value.name}
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-black">
                {value.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
