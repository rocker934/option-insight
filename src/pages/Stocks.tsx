import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const stockData = [
  { date: '2025-01-01', price: 150.25 },
  { date: '2025-01-02', price: 152.30 },
  { date: '2025-01-03', price: 151.45 },
  { date: '2025-01-04', price: 153.75 },
  { date: '2025-01-05', price: 155.20 },
  { date: '2025-01-06', price: 154.80 },
  { date: '2025-01-07', price: 156.90 },
  { date: '2025-01-08', price: 158.25 },
  { date: '2025-01-09', price: 157.50 },
  { date: '2025-01-10', price: 159.75 },
];

const portfolioStocks = [
  {
    id: 1,
    symbol: 'AAPL',
    name: 'Apple Inc.',
    quantity: 50,
    avgPrice: 175.25,
    currentPrice: 187.42,
    value: 9371.00,
    pnl: 608.50,
    pnlPercent: 6.95,
  },
  {
    id: 2,
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    quantity: 25,
    avgPrice: 390.75,
    currentPrice: 415.56,
    value: 10389.00,
    pnl: 620.25,
    pnlPercent: 6.35,
  },
  {
    id: 3,
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    quantity: 30,
    avgPrice: 180.50,
    currentPrice: 175.89,
    value: 5276.70,
    pnl: -138.30,
    pnlPercent: -2.55,
  },
  {
    id: 4,
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    quantity: 20,
    avgPrice: 175.30,
    currentPrice: 182.75,
    value: 3655.00,
    pnl: 149.00,
    pnlPercent: 4.25,
  },
  {
    id: 5,
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    quantity: 15,
    avgPrice: 225.80,
    currentPrice: 215.32,
    value: 3229.80,
    pnl: -157.20,
    pnlPercent: -4.64,
  },
];

export function Stocks() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Stocks</h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <h3 className="font-medium">Total Value</h3>
          <p className="mt-2 text-2xl font-bold">$31,921.50</p>
          <p className="text-sm text-green-500">+3.56% ($1,082.25)</p>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <h3 className="font-medium">Total Investment</h3>
          <p className="mt-2 text-2xl font-bold">$30,839.25</p>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <h3 className="font-medium">Total Return</h3>
          <p className="mt-2 text-2xl font-bold">$1,082.25</p>
          <p className="text-sm text-green-500">+3.56%</p>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Stock Price Chart</h2>
        <div className="flex items-center space-x-4 mb-4">
          <div className="rounded-md border px-3 py-1 text-sm font-medium">AAPL</div>
          <div className="rounded-md border px-3 py-1 text-sm">MSFT</div>
          <div className="rounded-md border px-3 py-1 text-sm">GOOGL</div>
          <div className="rounded-md border px-3 py-1 text-sm">AMZN</div>
          <div className="rounded-md border px-3 py-1 text-sm">TSLA</div>
        </div>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={stockData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
              <Tooltip formatter={(value) => [`$${value}`, 'Price']} />
              <Legend />
              <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} name="AAPL Price" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Portfolio Stocks</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="pb-2 text-left font-medium">Symbol</th>
                <th className="pb-2 text-left font-medium">Name</th>
                <th className="pb-2 text-right font-medium">Quantity</th>
                <th className="pb-2 text-right font-medium">Avg. Price</th>
                <th className="pb-2 text-right font-medium">Current Price</th>
                <th className="pb-2 text-right font-medium">Value</th>
                <th className="pb-2 text-right font-medium">P&L</th>
              </tr>
            </thead>
            <tbody>
              {portfolioStocks.map((stock) => (
                <tr key={stock.id} className="border-b">
                  <td className="py-3 text-left font-medium">{stock.symbol}</td>
                  <td className="py-3 text-left">{stock.name}</td>
                  <td className="py-3 text-right">{stock.quantity}</td>
                  <td className="py-3 text-right">${stock.avgPrice.toFixed(2)}</td>
                  <td className="py-3 text-right">${stock.currentPrice.toFixed(2)}</td>
                  <td className="py-3 text-right">${stock.value.toFixed(2)}</td>
                  <td className={`py-3 text-right ${stock.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    ${stock.pnl.toFixed(2)} ({stock.pnl >= 0 ? '+' : ''}{stock.pnlPercent.toFixed(2)}%)
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
