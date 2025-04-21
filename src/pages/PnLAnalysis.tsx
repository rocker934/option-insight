import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const monthlyData = [
  { name: 'Jan', profit: 4000, loss: -2400 },
  { name: 'Feb', profit: 3000, loss: -1398 },
  { name: 'Mar', profit: 5000, loss: -3800 },
  { name: 'Apr', profit: 2780, loss: -3908 },
  { name: 'May', profit: 1890, loss: -4800 },
  { name: 'Jun', profit: 2390, loss: -3800 },
  { name: 'Jul', profit: 3490, loss: -4300 },
  { name: 'Aug', profit: 4000, loss: -2400 },
  { name: 'Sep', profit: 2780, loss: -1908 },
  { name: 'Oct', profit: 1890, loss: -2800 },
  { name: 'Nov', profit: 3578, loss: -2788 },
  { name: 'Dec', profit: 5000, loss: -4800 },
];

const instrumentData = [
  { name: 'Stocks', profit: 8500, loss: -3200 },
  { name: 'Options', profit: 12500, loss: -8700 },
  { name: 'Futures', profit: 6800, loss: -5400 },
  { name: 'Crypto', profit: 4200, loss: -3800 },
];

export function PnLAnalysis() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">P&L Analysis</h1>
      
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Monthly P&L</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyData}
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
              <Tooltip 
                formatter={(value) => [`$${Math.abs(value)}`, value >= 0 ? 'Profit' : 'Loss']}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Legend />
              <Bar dataKey="profit" fill="#4ade80" name="Profit" />
              <Bar dataKey="loss" fill="#f87171" name="Loss" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Cumulative P&L</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Cumulative P&L']} />
                <Area type="monotone" dataKey="profit" stroke="#4ade80" fill="#4ade80" fillOpacity={0.3} name="Cumulative P&L" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">P&L by Instrument</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={instrumentData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip 
                  formatter={(value) => [`$${Math.abs(value)}`, value >= 0 ? 'Profit' : 'Loss']}
                />
                <Legend />
                <Bar dataKey="profit" fill="#4ade80" name="Profit" />
                <Bar dataKey="loss" fill="#f87171" name="Loss" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">P&L Summary</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="pb-2 text-left font-medium">Category</th>
                <th className="pb-2 text-right font-medium">Profit</th>
                <th className="pb-2 text-right font-medium">Loss</th>
                <th className="pb-2 text-right font-medium">Net P&L</th>
                <th className="pb-2 text-right font-medium">ROI</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 text-left">Stocks</td>
                <td className="py-3 text-right text-green-500">$8,500.00</td>
                <td className="py-3 text-right text-red-500">-$3,200.00</td>
                <td className="py-3 text-right text-green-500">$5,300.00</td>
                <td className="py-3 text-right text-green-500">+12.4%</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 text-left">Options</td>
                <td className="py-3 text-right text-green-500">$12,500.00</td>
                <td className="py-3 text-right text-red-500">-$8,700.00</td>
                <td className="py-3 text-right text-green-500">$3,800.00</td>
                <td className="py-3 text-right text-green-500">+15.2%</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 text-left">Futures</td>
                <td className="py-3 text-right text-green-500">$6,800.00</td>
                <td className="py-3 text-right text-red-500">-$5,400.00</td>
                <td className="py-3 text-right text-green-500">$1,400.00</td>
                <td className="py-3 text-right text-green-500">+7.8%</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 text-left">Cryptocurrency</td>
                <td className="py-3 text-right text-green-500">$4,200.00</td>
                <td className="py-3 text-right text-red-500">-$3,800.00</td>
                <td className="py-3 text-right text-green-500">$400.00</td>
                <td className="py-3 text-right text-green-500">+2.1%</td>
              </tr>
              <tr>
                <td className="py-3 text-left font-bold">Total</td>
                <td className="py-3 text-right text-green-500 font-bold">$32,000.00</td>
                <td className="py-3 text-right text-red-500 font-bold">-$21,100.00</td>
                <td className="py-3 text-right text-green-500 font-bold">$10,900.00</td>
                <td className="py-3 text-right text-green-500 font-bold">+10.9%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
