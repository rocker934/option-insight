import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Covered Call', value: 35 },
  { name: 'Iron Condor', value: 25 },
  { name: 'Bull Spread', value: 20 },
  { name: 'Butterfly', value: 15 },
  { name: 'Straddle', value: 5 },
];

export function OptionsStrategyChart() {
  return (
    <div className="h-full w-full rounded-lg border bg-card p-4 shadow-sm">
      <h3 className="mb-4 text-lg font-medium">Options Strategy Distribution</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" name="Allocation %" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
