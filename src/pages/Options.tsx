import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const optionData = [
  { strike: 180, callPrice: 12.45, putPrice: 5.30, callOI: 5200, putOI: 3800 },
  { strike: 185, callPrice: 9.75, putPrice: 7.60, callOI: 6800, putOI: 4200 },
  { strike: 190, callPrice: 7.35, putPrice: 10.20, callOI: 8500, putOI: 5100 },
  { strike: 195, callPrice: 5.20, putPrice: 13.05, callOI: 7200, putOI: 6300 },
  { strike: 200, callPrice: 3.45, putPrice: 16.30, callOI: 9500, putOI: 7800 },
  { strike: 205, callPrice: 2.10, putPrice: 19.95, callOI: 4800, putOI: 8900 },
  { strike: 210, callPrice: 1.25, putPrice: 24.10, callOI: 3200, putOI: 9700 },
];

const portfolioOptions = [
  {
    id: 1,
    symbol: 'AAPL',
    type: 'Call',
    strike: 190,
    expiry: '2025-06-20',
    quantity: 5,
    avgPrice: 8.45,
    currentPrice: 7.35,
    value: 3675.00,
    pnl: -550.00,
    pnlPercent: -13.01,
  },
  {
    id: 2,
    symbol: 'MSFT',
    type: 'Put',
    strike: 410,
    expiry: '2025-05-15',
    quantity: 3,
    avgPrice: 12.30,
    currentPrice: 14.75,
    value: 4425.00,
    pnl: 735.00,
    pnlPercent: 19.92,
  },
  {
    id: 3,
    symbol: 'GOOGL',
    type: 'Call',
    strike: 180,
    expiry: '2025-07-18',
    quantity: 4,
    avgPrice: 10.25,
    currentPrice: 12.45,
    value: 4980.00,
    pnl: 880.00,
    pnlPercent: 21.46,
  },
  {
    id: 4,
    symbol: 'AMZN',
    type: 'Put',
    strike: 175,
    expiry: '2025-06-20',
    quantity: 2,
    avgPrice: 8.75,
    currentPrice: 7.60,
    value: 1520.00,
    pnl: -230.00,
    pnlPercent: -13.14,
  },
];

export function Options() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Options</h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <h3 className="font-medium">Total Value</h3>
          <p className="mt-2 text-2xl font-bold">$14,600.00</p>
          <p className="text-sm text-green-500">+5.74% ($835.00)</p>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <h3 className="font-medium">Total Investment</h3>
          <p className="mt-2 text-2xl font-bold">$13,765.00</p>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <h3 className="font-medium">Total Return</h3>
          <p className="mt-2 text-2xl font-bold">$835.00</p>
          <p className="text-sm text-green-500">+5.74%</p>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Option Chain</h2>
        <div className="flex items-center space-x-4 mb-4">
          <div className="rounded-md border px-3 py-1 text-sm font-medium">AAPL</div>
          <div className="rounded-md border px-3 py-1 text-sm">MSFT</div>
          <div className="rounded-md border px-3 py-1 text-sm">GOOGL</div>
          <div className="rounded-md border px-3 py-1 text-sm">AMZN</div>
          <div className="rounded-md border px-3 py-1 text-sm">TSLA</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th colSpan={3} className="pb-2 text-center font-medium">Calls</th>
                <th className="pb-2 text-center font-medium">Strike</th>
                <th colSpan={3} className="pb-2 text-center font-medium">Puts</th>
              </tr>
              <tr className="border-b">
                <th className="pb-2 text-right font-medium">OI</th>
                <th className="pb-2 text-right font-medium">Price</th>
                <th className="pb-2 text-right font-medium">Change</th>
                <th className="pb-2 text-center font-medium"></th>
                <th className="pb-2 text-right font-medium">Change</th>
                <th className="pb-2 text-right font-medium">Price</th>
                <th className="pb-2 text-right font-medium">OI</th>
              </tr>
            </thead>
            <tbody>
              {optionData.map((option) => (
                <tr key={option.strike} className="border-b">
                  <td className="py-3 text-right">{option.callOI.toLocaleString()}</td>
                  <td className="py-3 text-right">${option.callPrice.toFixed(2)}</td>
                  <td className="py-3 text-right text-red-500">-0.25</td>
                  <td className="py-3 text-center font-medium">${option.strike}</td>
                  <td className="py-3 text-right text-green-500">+0.35</td>
                  <td className="py-3 text-right">${option.putPrice.toFixed(2)}</td>
                  <td className="py-3 text-right">{option.putOI.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Open Interest</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={optionData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="strike" />
                <YAxis />
                <Tooltip formatter={(value) => [value.toLocaleString(), 'Contracts']} />
                <Legend />
                <Bar dataKey="callOI" fill="#4ade80" name="Call OI" />
                <Bar dataKey="putOI" fill="#f87171" name="Put OI" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Option Prices</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={optionData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="strike" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Price']} />
                <Legend />
                <Line type="monotone" dataKey="callPrice" stroke="#4ade80" name="Call Price" />
                <Line type="monotone" dataKey="putPrice" stroke="#f87171" name="Put Price" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Portfolio Options</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="pb-2 text-left font-medium">Symbol</th>
                <th className="pb-2 text-left font-medium">Type</th>
                <th className="pb-2 text-right font-medium">Strike</th>
                <th className="pb-2 text-left font-medium">Expiry</th>
                <th className="pb-2 text-right font-medium">Qty</th>
                <th className="pb-2 text-right font-medium">Avg. Price</th>
                <th className="pb-2 text-right font-medium">Current Price</th>
                <th className="pb-2 text-right font-medium">Value</th>
                <th className="pb-2 text-right font-medium">P&L</th>
              </tr>
            </thead>
            <tbody>
              {portfolioOptions.map((option) => (
                <tr key={option.id} className="border-b">
                  <td className="py-3 text-left font-medium">{option.symbol}</td>
                  <td className={`py-3 text-left ${option.type === 'Call' ? 'text-green-500' : 'text-red-500'}`}>
                    {option.type}
                  </td>
                  <td className="py-3 text-right">${option.strike}</td>
                  <td className="py-3 text-left">{option.expiry}</td>
                  <td className="py-3 text-right">{option.quantity}</td>
                  <td className="py-3 text-right">${option.avgPrice.toFixed(2)}</td>
                  <td className="py-3 text-right">${option.currentPrice.toFixed(2)}</td>
                  <td className="py-3 text-right">${option.value.toFixed(2)}</td>
                  <td className={`py-3 text-right ${option.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    ${option.pnl.toFixed(2)} ({option.pnl >= 0 ? '+' : ''}{option.pnlPercent.toFixed(2)}%)
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
