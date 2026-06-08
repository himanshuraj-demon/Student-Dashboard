import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

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

export default function SemesterTrendChart() {
  return (
    <>
    <h2 className="text-2xl font-semibold m-4">Usual Sems Pattern : </h2>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={semesterData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="sem" />
        <YAxis />
        <Tooltip />

        <Line
          type="monotone"
          dataKey="credits"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
    </>
  );
}