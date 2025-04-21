import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const cryptoData = [
  { date: '2025-01-01', btc: 82450, eth: 3850 },
  { date: '2025-01-02', btc: 83200, eth: 3920 },
  { date: '2025-01-03', btc: 82800, eth: 3880 },
  { date: '2025-01-04', btc: 84500, eth: 3950 },
  { date: '2025-01-05', btc: 85200, eth: 4020 },
  { date: '2025-01-06', btc: 84800, eth: 3980 },
  { date: '2025-01-07', btc: 86500, eth: 4080 },
  { date: '2025-01-08', btc: 87200, eth: 4150 },
  { date: '2025-01-09', btc: 86800, eth: 4120 },
  { date: '2025-01-10', btc: 88500, eth: 4250 },
];

const portfolioCrypto = [
  {
    id: 1,
    symbol: 'BTC',
    name: 'Bitcoin',
    quantity: 0.35,
    avgPrice: 78250.50,
    currentPrice: 88500.00,
    value: 30975.00,
    pnl: 3587.33,
    pnlPercent: 13.10,
  },
  {
    id: 2,
    symbol: 'ETH',
    name: 'Ethereum',
    quantity: 2.5,
    avgPrice: 3750.25,
    currentPrice: 4250.00,
    value: 10625.00,
    pnl: 1249.38,
    pnlPercent: 13.33,
  },
  {
    id: 3,
    symbol: 'SOL',
    name: 'Solana',
    quantity: 15,
    avgPrice: 145.80,
    currentPrice: 168.25,
    value: 2523.75,
    pnl: 336.75,
    pnlPercent: 15.40,
  },
  {
    id: 4,
    symbol: 'ADA',
    name: 'Cardano',
    quantity: 1200,
    avgPrice: 0.85,
    currentPrice: 0.92,
    value: 1104.00,
    pnl: 84.00,
    pnlPercent: 8.24,
  },
];

const allocationData = [
  { name: 'Bitcoin', value: 30975.00 },
  { name: 'Ethereum', value: 10625.00 },
  { name: 'Solana', value: 2523.75 },
  { name: 'Cardano', value: 1104.00 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function Cryptocurrency() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Cryptocurrency</h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <h3 className="font-medium">Total Value</h3>
          <p className="mt-2 text-2xl font-bold">$45,227.75</p>
          <p className="text-sm text-green-500">+13.14% ($5,257.46)</p>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <h3 className="font-medium">Total Investment</h3>
          <p className="mt-2 text-2xl font-bold">$39,970.29</p>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <h3 className="font-medium">Total Return</h3>
          <p className="mt-2 text-2xl font-bold">$5,257.46</p>
          <p className="text-sm text-green-500">+13.14%</p>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Cryptocurrency Price Chart</h2>
        <div className="flex items-center space-x-4 mb-4">
          <div className="rounded-md border px-3 py-1 text-sm font-medium">BTC</div>
          <div className="rounded-md border px-3 py-1 text-sm">ETH</div>
          <div className="rounded-md border px-3 py-1 text-sm">SOL</div>
          <div className="rounded-md border px-3 py-1 text-sm">ADA</div>
        </div>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={cryptoData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip formatter={(value) => [`$${value}`, 'Price']} />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="btc" stroke="#F7931A" activeDot={{ r: 8 }} name="BTC Price" />
              <Line yAxisId="right" type="monotone" dataKey="eth" stroke="#627EEA" name="ETH Price" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Portfolio Allocation</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Value']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Market Data</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Bitcoin (BTC)</h3>
                <p className="text-sm text-muted-foreground">Market Cap: $1.72T</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$88,500.00</p>
                <p className="text-sm text-green-500">+2.31%</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Ethereum (ETH)</h3>
                <p className="text-sm text-muted-foreground">Market Cap: $510.2B</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$4,250.00</p>
                <p className="text-sm text-green-500">+1.85%</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Solana (SOL)</h3>
                <p className="text-sm text-muted-foreground">Market Cap: $72.5B</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$168.25</p>
                <p className="text-sm text-green-500">+3.42%</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Cardano (ADA)</h3>
                <p className="text-sm text-muted-foreground">Market Cap: $32.8B</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$0.92</p>
                <p className="text-sm text-red-500">-0.54%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Portfolio Cryptocurrencies</h2>
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
              {portfolioCrypto.map((crypto) => (
                <tr key={crypto.id} className="border-b">
                  <td className="py-3 text-left font-medium">{crypto.symbol}</td>
                  <td className="py-3 text-left">{crypto.name}</td>
                  <td className="py-3 text-right">{crypto.quantity}</td>
                  <td className="py-3 text-right">${crypto.avgPrice.toFixed(2)}</td>
                  <td className="py-3 text-right">${crypto.currentPrice.toFixed(2)}</td>
                  <td className="py-3 text-right">${crypto.value.toFixed(2)}</td>
                  <td className={`py-3 text-right ${crypto.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    ${crypto.pnl.toFixed(2)} ({crypto.pnl >= 0 ? '+' : ''}{crypto.pnlPercent.toFixed(2)}%)
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
