import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', nifty: 21000, sensex: 68000 },
  { name: 'Feb', nifty: 21500, sensex: 69500 },
  { name: 'Mar', nifty: 22000, sensex: 71000 },
  { name: 'Apr', nifty: 21800, sensex: 70500 },
  { name: 'May', nifty: 22500, sensex: 72500 },
  { name: 'Jun', nifty: 22800, sensex: 73000 },
];

export function MarketTrends() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Market Trends</h1>
      
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Market Indices</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
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
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="nifty" stroke="#8884d8" activeDot={{ r: 8 }} name="NIFTY 50" />
              <Line yAxisId="right" type="monotone" dataKey="sensex" stroke="#82ca9d" name="SENSEX" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Sector Performance</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Technology</span>
              <div className="flex items-center">
                <span className="mr-2 text-green-500">+2.45%</span>
                <div className="h-2 w-32 rounded-full bg-gray-200">
                  <div className="h-2 w-3/4 rounded-full bg-green-500"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Finance</span>
              <div className="flex items-center">
                <span className="mr-2 text-green-500">+1.23%</span>
                <div className="h-2 w-32 rounded-full bg-gray-200">
                  <div className="h-2 w-1/2 rounded-full bg-green-500"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Healthcare</span>
              <div className="flex items-center">
                <span className="mr-2 text-red-500">-0.87%</span>
                <div className="h-2 w-32 rounded-full bg-gray-200">
                  <div className="h-2 w-1/4 rounded-full bg-red-500"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Energy</span>
              <div className="flex items-center">
                <span className="mr-2 text-green-500">+0.56%</span>
                <div className="h-2 w-32 rounded-full bg-gray-200">
                  <div className="h-2 w-1/3 rounded-full bg-green-500"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Consumer Goods</span>
              <div className="flex items-center">
                <span className="mr-2 text-red-500">-1.34%</span>
                <div className="h-2 w-32 rounded-full bg-gray-200">
                  <div className="h-2 w-2/5 rounded-full bg-red-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Market Movers</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Top Gainers</h3>
              <div className="mt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">HDFC Bank</span>
                  <span className="text-green-500">+3.45%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Reliance Industries</span>
                  <span className="text-green-500">+2.78%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Infosys</span>
                  <span className="text-green-500">+2.12%</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium">Top Losers</h3>
              <div className="mt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Tata Motors</span>
                  <span className="text-red-500">-2.34%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Bharti Airtel</span>
                  <span className="text-red-500">-1.89%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">ITC Ltd</span>
                  <span className="text-red-500">-1.45%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
