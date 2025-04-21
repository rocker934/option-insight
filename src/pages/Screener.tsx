import { useState } from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

const screeningResults = [
  {
    id: 1,
    symbol: 'AAPL',
    name: 'Apple Inc.',
    sector: 'Technology',
    price: 187.42,
    change: 1.25,
    changePercent: 0.67,
    volume: '32.5M',
    marketCap: '2.95T',
    pe: 31.2,
    dividend: 0.58,
  },
  {
    id: 2,
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    sector: 'Technology',
    price: 415.56,
    change: 3.78,
    changePercent: 0.92,
    volume: '28.1M',
    marketCap: '3.08T',
    pe: 36.8,
    dividend: 0.72,
  },
  {
    id: 3,
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    sector: 'Technology',
    price: 175.89,
    change: -0.95,
    changePercent: -0.54,
    volume: '18.7M',
    marketCap: '2.21T',
    pe: 25.4,
    dividend: 0,
  },
  {
    id: 4,
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    sector: 'Consumer Cyclical',
    price: 182.75,
    change: 2.15,
    changePercent: 1.19,
    volume: '22.3M',
    marketCap: '1.89T',
    pe: 59.2,
    dividend: 0,
  },
  {
    id: 5,
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    sector: 'Automotive',
    price: 215.32,
    change: -3.45,
    changePercent: -1.58,
    volume: '45.8M',
    marketCap: '685.2B',
    pe: 55.1,
    dividend: 0,
  },
  {
    id: 6,
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    sector: 'Technology',
    price: 485.39,
    change: 5.67,
    changePercent: 1.18,
    volume: '15.2M',
    marketCap: '1.24T',
    pe: 26.3,
    dividend: 0,
  },
  {
    id: 7,
    symbol: 'JNJ',
    name: 'Johnson & Johnson',
    sector: 'Healthcare',
    price: 152.78,
    change: 0.85,
    changePercent: 0.56,
    volume: '8.7M',
    marketCap: '368.5B',
    pe: 17.2,
    dividend: 3.21,
  },
  {
    id: 8,
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    sector: 'Financial Services',
    price: 198.45,
    change: 2.35,
    changePercent: 1.20,
    volume: '12.4M',
    marketCap: '572.3B',
    pe: 12.1,
    dividend: 2.45,
  },
];

export function Screener() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');

  const sectors = ['All', 'Technology', 'Financial Services', 'Healthcare', 'Consumer Cyclical', 'Automotive'];

  const filteredResults = screeningResults.filter(item => {
    const matchesSearch = item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = selectedSector === 'All' || item.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Stock Screener</h1>
      
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">Search</label>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Symbol or company name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-full rounded-md border border-input bg-background pl-8 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Sector</label>
            <div className="relative">
              <Filter className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="h-9 w-full rounded-md border border-input bg-background pl-8 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring appearance-none"
              >
                {sectors.map((sector) => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Price Range</label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min"
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <span>to</span>
              <input
                type="number"
                placeholder="Max"
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Market Cap</label>
            <select className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring appearance-none">
              <option value="all">All</option>
              <option value="mega">Mega ($200B+)</option>
              <option value="large">Large ($10B-$200B)</option>
              <option value="mid">Mid ($2B-$10B)</option>
              <option value="small">Small ($300M-$2B)</option>
              <option value="micro">Micro ($50M-$300M)</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">P/E Ratio</label>
            <select className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring appearance-none">
              <option value="all">All</option>
              <option value="low">Low (&lt;15)</option>
              <option value="medium">Medium (15-30)</option>
              <option value="high">High (&gt;30)</option>
              <option value="negative">Negative</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Dividend Yield</label>
            <select className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring appearance-none">
              <option value="all">All</option>
              <option value="none">None (0%)</option>
              <option value="low">Low (&lt;1%)</option>
              <option value="medium">Medium (1%-3%)</option>
              <option value="high">High (&gt;3%)</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Volume</label>
            <select className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring appearance-none">
              <option value="all">All</option>
              <option value="high">High (&gt;1M)</option>
              <option value="medium">Medium (100K-1M)</option>
              <option value="low">Low (&lt;100K)</option>
            </select>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
            Apply Filters
          </button>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Results ({filteredResults.length})</h2>
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
                <th className="pb-2 text-left font-medium">Sector</th>
                <th className="pb-2 text-right font-medium">
                  <div className="flex items-center justify-end">
                    Price
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th className="pb-2 text-right font-medium">Change</th>
                <th className="pb-2 text-right font-medium">Volume</th>
                <th className="pb-2 text-right font-medium">Market Cap</th>
                <th className="pb-2 text-right font-medium">P/E</th>
                <th className="pb-2 text-right font-medium">Div Yield</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((item) => (
                <tr key={item.id} className="border-b last:border-0">
                  <td className="py-3 text-left font-medium">{item.symbol}</td>
                  <td className="py-3 text-left">{item.name}</td>
                  <td className="py-3 text-left">{item.sector}</td>
                  <td className="py-3 text-right">${item.price.toFixed(2)}</td>
                  <td className={`py-3 text-right ${item.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)} ({item.change >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%)
                  </td>
                  <td className="py-3 text-right">{item.volume}</td>
                  <td className="py-3 text-right">{item.marketCap}</td>
                  <td className="py-3 text-right">{item.pe.toFixed(1)}</td>
                  <td className="py-3 text-right">{item.dividend > 0 ? `${item.dividend.toFixed(2)}%` : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
