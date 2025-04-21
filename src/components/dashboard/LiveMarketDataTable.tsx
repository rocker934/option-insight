import { ArrowUpDown } from 'lucide-react';

const marketData = [
  {
    id: 1,
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 187.42,
    change: 1.25,
    changePercent: 0.67,
    volume: '32.5M',
  },
  {
    id: 2,
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    price: 415.56,
    change: 3.78,
    changePercent: 0.92,
    volume: '28.1M',
  },
  {
    id: 3,
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 175.89,
    change: -0.95,
    changePercent: -0.54,
    volume: '18.7M',
  },
  {
    id: 4,
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 182.75,
    change: 2.15,
    changePercent: 1.19,
    volume: '22.3M',
  },
  {
    id: 5,
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: 215.32,
    change: -3.45,
    changePercent: -1.58,
    volume: '45.8M',
  },
  {
    id: 6,
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    price: 485.39,
    change: 5.67,
    changePercent: 1.18,
    volume: '15.2M',
  },
];

export function LiveMarketDataTable() {
  return (
    <div className="h-full w-full rounded-lg border bg-card p-4 shadow-sm">
      <h3 className="mb-4 text-lg font-medium">Live Market Data</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="pb-2 text-left font-medium">
                <div className="flex items-center">
                  Symbol
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                </div>
              </th>
              <th className="pb-2 text-left font-medium">Name</th>
              <th className="pb-2 text-right font-medium">
                <div className="flex items-center justify-end">
                  Price
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                </div>
              </th>
              <th className="pb-2 text-right font-medium">Change</th>
              <th className="pb-2 text-right font-medium">Volume</th>
            </tr>
          </thead>
          <tbody>
            {marketData.map((item) => (
              <tr key={item.id} className="border-b last:border-0">
                <td className="py-3 text-left font-medium">{item.symbol}</td>
                <td className="py-3 text-left">{item.name}</td>
                <td className="py-3 text-right">${item.price.toFixed(2)}</td>
                <td className={`py-3 text-right ${item.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)} ({item.change >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%)
                </td>
                <td className="py-3 text-right">{item.volume}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
