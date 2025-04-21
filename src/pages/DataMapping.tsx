import { useState } from 'react';
import { ArrowRight, Database, Link2, RefreshCw, Save } from 'lucide-react';

export function DataMapping() {
  const [selectedSource, setSelectedSource] = useState('alphavantage');
  const [selectedDestination, setSelectedDestination] = useState('stocks');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Data Mapping</h1>
      
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Configure Data Mappings</h2>
        <p className="mb-4 text-muted-foreground">
          Map data from external APIs to your portfolio. This allows you to automatically update your portfolio with real-time data.
        </p>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">Data Source</label>
            <select 
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="alphavantage">Alpha Vantage</option>
              <option value="iex">IEX Cloud</option>
              <option value="polygon">Polygon.io</option>
              <option value="finnhub">Finnhub</option>
              <option value="tradier">Tradier</option>
              <option value="manual">Manual Input</option>
            </select>
          </div>
          
          <div className="flex items-center justify-center">
            <ArrowRight className="h-6 w-6" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Destination</label>
            <select 
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="stocks">Stocks Portfolio</option>
              <option value="options">Options Portfolio</option>
              <option value="futures">Futures Portfolio</option>
              <option value="crypto">Cryptocurrency Portfolio</option>
              <option value="watchlist">Watchlist</option>
            </select>
          </div>
        </div>
        
        <div className="mt-6 rounded-md border p-4">
          <h3 className="font-medium">Field Mapping</h3>
          <p className="text-sm text-muted-foreground mb-4">Map source fields to destination fields</p>
          
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-2">
                <label className="text-sm font-medium">Source Field</label>
                <select className="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm">
                  <option value="symbol">symbol</option>
                  <option value="latestPrice">latestPrice</option>
                  <option value="change">change</option>
                  <option value="changePercent">changePercent</option>
                  <option value="volume">volume</option>
                </select>
              </div>
              
              <div className="flex items-end justify-center pb-2">
                <ArrowRight className="h-4 w-4" />
              </div>
              
              <div className="col-span-2">
                <label className="text-sm font-medium">Destination Field</label>
                <select className="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm">
                  <option value="symbol">Symbol</option>
                  <option value="currentPrice">Current Price</option>
                  <option value="change">Change</option>
                  <option value="changePercent">Change Percent</option>
                  <option value="volume">Volume</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-2">
                <select className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm">
                  <option value="companyName">companyName</option>
                  <option value="marketCap">marketCap</option>
                  <option value="peRatio">peRatio</option>
                  <option value="dividendYield">dividendYield</option>
                  <option value="sector">sector</option>
                </select>
              </div>
              
              <div className="flex items-center justify-center">
                <ArrowRight className="h-4 w-4" />
              </div>
              
              <div className="col-span-2">
                <select className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm">
                  <option value="name">Name</option>
                  <option value="marketCap">Market Cap</option>
                  <option value="pe">P/E Ratio</option>
                  <option value="dividend">Dividend Yield</option>
                  <option value="sector">Sector</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-2">
                <select className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm">
                  <option value="open">open</option>
                  <option value="high">high</option>
                  <option value="low">low</option>
                  <option value="close">close</option>
                  <option value="previousClose">previousClose</option>
                </select>
              </div>
              
              <div className="flex items-center justify-center">
                <ArrowRight className="h-4 w-4" />
              </div>
              
              <div className="col-span-2">
                <select className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm">
                  <option value="openPrice">Open Price</option>
                  <option value="highPrice">High Price</option>
                  <option value="lowPrice">Low Price</option>
                  <option value="closePrice">Close Price</option>
                  <option value="previousClose">Previous Close</option>
                </select>
              </div>
            </div>
            
            <button className="flex items-center text-sm text-primary hover:underline">
              <span className="mr-1">Add Field Mapping</span>
              <span>+</span>
            </button>
          </div>
        </div>
        
        <div className="mt-6 flex items-center space-x-2">
          <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
            Save Mapping
          </button>
          <button className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent">
            Test Mapping
          </button>
        </div>
      </div>
      
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Saved Mappings</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="pb-2 text-left font-medium">Name</th>
                <th className="pb-2 text-left font-medium">Source</th>
                <th className="pb-2 text-left font-medium">Destination</th>
                <th className="pb-2 text-left font-medium">Last Updated</th>
                <th className="pb-2 text-left font-medium">Status</th>
                <th className="pb-2 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 text-left">Stock Prices</td>
                <td className="py-3 text-left">Alpha Vantage</td>
                <td className="py-3 text-left">Stocks Portfolio</td>
                <td className="py-3 text-left">2025-04-19 14:30:22</td>
                <td className="py-3 text-left">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                    Active
                  </span>
                </td>
                <td className="py-3 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="rounded-md p-1 hover:bg-accent" aria-label="Edit">
                      <Link2 className="h-4 w-4" />
                    </button>
                    <button className="rounded-md p-1 hover:bg-accent" aria-label="Refresh">
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 text-left">Options Data</td>
                <td className="py-3 text-left">IEX Cloud</td>
                <td className="py-3 text-left">Options Portfolio</td>
                <td className="py-3 text-left">2025-04-18 09:15:47</td>
                <td className="py-3 text-left">
                  <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                    Paused
                  </span>
                </td>
                <td className="py-3 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="rounded-md p-1 hover:bg-accent" aria-label="Edit">
                      <Link2 className="h-4 w-4" />
                    </button>
                    <button className="rounded-md p-1 hover:bg-accent" aria-label="Refresh">
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="py-3 text-left">Crypto Prices</td>
                <td className="py-3 text-left">Manual Input</td>
                <td className="py-3 text-left">Cryptocurrency Portfolio</td>
                <td className="py-3 text-left">2025-04-15 16:42:10</td>
                <td className="py-3 text-left">
                  <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                    Inactive
                  </span>
                </td>
                <td className="py-3 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="rounded-md p-1 hover:bg-accent" aria-label="Edit">
                      <Link2 className="h-4 w-4" />
                    </button>
                    <button className="rounded-md p-1 hover:bg-accent" aria-label="Refresh">
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Scheduled Updates</h2>
        <p className="mb-4 text-muted-foreground">
          Configure when your data mappings should automatically update your portfolio.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-md border p-4">
            <div>
              <h3 className="font-medium">Stock Prices</h3>
              <p className="text-sm text-muted-foreground">Updates every 15 minutes during market hours</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="rounded-md border border-input bg-background px-3 py-1 text-sm font-medium shadow-sm hover:bg-accent">
                Edit
              </button>
              <button className="rounded-md bg-primary px-3 py-1 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
                Run Now
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between rounded-md border p-4">
            <div>
              <h3 className="font-medium">Options Data</h3>
              <p className="text-sm text-muted-foreground">Updates every 30 minutes during market hours</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="rounded-md border border-input bg-background px-3 py-1 text-sm font-medium shadow-sm hover:bg-accent">
                Edit
              </button>
              <button className="rounded-md bg-primary px-3 py-1 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
                Run Now
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between rounded-md border p-4">
            <div>
              <h3 className="font-medium">Crypto Prices</h3>
              <p className="text-sm text-muted-foreground">Updates every hour, 24/7</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="rounded-md border border-input bg-background px-3 py-1 text-sm font-medium shadow-sm hover:bg-accent">
                Edit
              </button>
              <button className="rounded-md bg-primary px-3 py-1 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
                Run Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
