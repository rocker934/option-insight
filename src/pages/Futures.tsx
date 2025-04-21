import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const futuresData = [
  { date: '2025-01-01', price: 4850.25 },
  { date: '2025-01-02', price: 4875.50 },
  { date: '2025-01-03', price: 4860.75 },
  { date: '2025-01-04', price: 4890.25 },
  { date: '2025-01-05', price: 4915.50 },
  { date: '2025-01-06', price: 4905.75 },
  { date: '2025-01-07', price: 4925.25 },
  { date: '2025-01-08', price: 4950.50 },
  { date: '2025-01-09', price: 4940.75 },
  { date: '2025-01-10', price: 4965.25 },
];

const portfolioFutures = [
  {
    id: 1,
    symbol: 'ES',
    name: 'E-mini S&P 500',
    expiry: '2025-06-20',
    quantity: 2,
    entryPrice: 4825.50,
    currentPrice: 4965.25,
    value: 139750.00,
    pnl: 6987.50,
    pnlPercent: 5.26,
  },
  {
    id: 2,
    symbol: 'NQ',
    name: 'E-mini NASDAQ-100',
    expiry: '2025-06-20',
    quantity: 1,
    entryPrice: 17250.75,
    currentPrice: 17580.50,
    value: 87902.50,
    pnl: 1648.75,
    pnlPercent: 1.91,
  },
  {
    id: 3,
    symbol: 'CL',
    name: 'Crude Oil',
    expiry: '2025-05-20',
    quantity: 3,
    entryPrice: 82.45,
    currentPrice: 85.30,
    value: 255900.00,
    pnl: 8550.00,
    pnlPercent: 3.46,
  },
  {
    id: 4,
    symbol: 'GC',
    name: 'Gold',
    expiry: '2025-06-26',
    quantity: 1,
    entryPrice: 2350.80,
    currentPrice: 2425.60,
    value: 242560.00,
    pnl: 7480.00,
    pnlPercent: 3.18,
  },
];

export function Futures() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Futures</h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <h3 className="font-medium">Total Value</h3>
          <p className="mt-2 text-2xl font-bold">$726,112.50</p>
          <p className="text-sm text-green-500">+3.49% ($24,666.25)</p>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <h3 className="font-medium">Total Investment</h3>
          <p className="mt-2 text-2xl font-bold">$701,446.25</p>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <h3 className="font-medium">Total Return</h3>
          <p className="mt-2 text-2xl font-bold">$24,666.25</p>
          <p className="text-sm text-green-500">+3.49%</p>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Futures Price Chart</h2>
        <div className="flex items-center space-x-4 mb-4">
          <div className="rounded-md border px-3 py-1 text-sm font-medium">ES</div>
          <div className="rounded-md border px-3 py-1 text-sm">NQ</div>
          <div className="rounded-md border px-3 py-1 text-sm">CL</div>
          <div className="rounded-md border px-3 py-1 text-sm">GC</div>
        </div>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={futuresData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={['dataMin - 50', 'dataMax + 50']} />
              <Tooltip formatter={(value) => [`$${value}`, 'Price']} />
              <Legend />
              <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} name="ES Price" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Portfolio Futures</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="pb-2 text-left font-medium">Symbol</th>
                <th className="pb-2 text-left font-medium">Name</th>
                <th className="pb-2 text-left font-medium">Expiry</th>
                <th className="pb-2 text-right font-medium">Quantity</th>
                <th className="pb-2 text-right font-medium">Entry Price</th>
                <th className="pb-2 text-right font-medium">Current Price</th>
                <th className="pb-2 text-right font-medium">Value</th>
                <th className="pb-2 text-right font-medium">P&L</th>
              </tr>
            </thead>
            <tbody>
              {portfolioFutures.map((future) => (
                <tr key={future.id} className="border-b">
                  <td className="py-3 text-left font-medium">{future.symbol}</td>
                  <td className="py-3 text-left">{future.name}</td>
                  <td className="py-3 text-left">{future.expiry}</td>
                  <td className="py-3 text-right">{future.quantity}</td>
                  <td className="py-3 text-right">${future.entryPrice.toFixed(2)}</td>
                  <td className="py-3 text-right">${future.currentPrice.toFixed(2)}</td>
                  <td className="py-3 text-right">${future.value.toFixed(2)}</td>
                  <td className={`py-3 text-right ${future.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    ${future.pnl.toFixed(2)} ({future.pnl >= 0 ? '+' : ''}{future.pnlPercent.toFixed(2)}%)
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Margin Requirements</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="pb-2 text-left font-medium">Symbol</th>
                <th className="pb-2 text-right font-medium">Initial Margin</th>
                <th className="pb-2 text-right font-medium">Maintenance Margin</th>
                <th className="pb-2 text-right font-medium">Used Margin</th>
                <th className="pb-2 text-right font-medium">Available Margin</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 text-left font-medium">ES</td>
                <td className="py-3 text-right">$12,375.00</td>
                <td className="py-3 text-right">$9,900.00</td>
                <td className="py-3 text-right">$24,750.00</td>
                <td className="py-3 text-right">$75,250.00</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 text-left font-medium">NQ</td>
                <td className="py-3 text-right">$16,500.00</td>
                <td className="py-3 text-right">$13,200.00</td>
                <td className="py-3 text-right">$16,500.00</td>
                <td className="py-3 text-right">$83,500.00</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 text-left font-medium">CL</td>
                <td className="py-3 text-right">$6,270.00</td>
                <td className="py-3 text-right">$5,700.00</td>
                <td className="py-3 text-right">$18,810.00</td>
                <td className="py-3 text-right">$81,190.00</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 text-left font-medium">GC</td>
                <td className="py-3 text-right">$11,550.00</td>
                <td className="py-3 text-right">$10,500.00</td>
                <td className="py-3 text-right">$11,550.00</td>
                <td className="py-3 text-right">$88,450.00</td>
              </tr>
              <tr>
                <td className="py-3 text-left font-bold">Total</td>
                <td className="py-3 text-right font-bold">$46,695.00</td>
                <td className="py-3 text-right font-bold">$39,300.00</td>
                <td className="py-3 text-right font-bold">$71,610.00</td>
                <td className="py-3 text-right font-bold">$328,390.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
