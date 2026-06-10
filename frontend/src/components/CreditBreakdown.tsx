import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Sector } from "recharts";
import { useState } from "react";
import { FcPieChart } from "react-icons/fc";

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


const renderActiveShape = (props) => {
  return (
    <Sector
      {...props}
      outerRadius={props.outerRadius + 10} 
      fill={props.fill}
    />
  );
};

export default function CreditBreakdownChart() {
  const [activeIndex, setActiveIndex] = useState(null);

  const onMouseEnter = (_, index) => setActiveIndex(index);
  const onMouseLeave = () => setActiveIndex(null);

  return (
    <div className="card">
      <h2 className="text-xl  mx-4 flex gap-3 items-center">
        <FcPieChart size={32} /> Credit Distribution {" "}
      </h2>

      <div className="flex flex-col md:flex-row md:items-center gap-6 justify-center md:mx-15 mx-2 rounded-2xl my-1 shadow-sm cardsectioncredit">
        {/* Chart */}
        <div className="w-full md:w-1/3 shrink-0">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={4}
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    opacity={activeIndex === null || activeIndex === index ? 1 : 0.4}
                    style={{ transition: "opacity 0.3s ease" }} 
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend List */}
        <ul className="w-full md:w-1/3 flex flex-col gap-2 mr-4 ">
          {data.map((item, i) => (
            <li
              key={i}
              className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                activeIndex === i ? "bg-gray-200 " : "bg-gray-50 hover:bg-gray-100 shadow-sm"
              }`}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={onMouseLeave}
            >
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                <span className="text-sm font-medium text-gray-700 dark:text-black">
                  {item.name}
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-black">
                {item.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}   