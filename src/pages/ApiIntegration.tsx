import { useState } from 'react';
import { Check, Copy, Key, RefreshCw } from 'lucide-react';

export function ApiIntegration() {
  const [copied, setCopied] = useState(false);
  const [testResult, setTestResult] = useState<null | 'success' | 'error'>(null);
  const [apiKey, setApiKey] = useState('');
  
  const copyApiKey = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const testConnection = () => {
    // Simulate API test
    setTestResult('success');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">API Integration</h1>
      
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">API Keys</h2>
        <p className="mb-4 text-muted-foreground">
          Manage your API keys to connect with external data providers and services.
          These keys are required to fetch live market data, execute trades, and access historical information.
        </p>
        
        <div className="space-y-4">
          <div className="rounded-md border p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">OptionInsight API Key</h3>
                <p className="text-sm text-muted-foreground">Used for accessing the OptionInsight API services</p>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={copyApiKey}
                  className="rounded-md p-2 hover:bg-accent"
                  aria-label="Copy API key"
                >
                  {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                </button>
                <button 
                  className="rounded-md p-2 hover:bg-accent"
                  aria-label="Regenerate API key"
                >
                  <RefreshCw className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="mt-2 flex items-center rounded-md border bg-muted p-2">
              <Key className="mr-2 h-4 w-4 text-muted-foreground" />
              <code className="flex-1 font-mono text-sm">sk_live_51NxD8ALkhB3Y7d8JGz9tMYwQ8JHqSZD</code>
            </div>
          </div>
          
          <div className="rounded-md border p-4">
            <h3 className="font-medium">External API Integration</h3>
            <p className="text-sm text-muted-foreground mb-4">Connect to third-party data providers</p>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Provider</label>
                <select className="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm">
                  <option value="alphavantage">Alpha Vantage</option>
                  <option value="iex">IEX Cloud</option>
                  <option value="polygon">Polygon.io</option>
                  <option value="finnhub">Finnhub</option>
                  <option value="tradier">Tradier</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium">API Key</label>
                <input
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key"
                  className="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <button 
                  onClick={testConnection}
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                >
                  Test Connection
                </button>
                <button 
                  className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent"
                >
                  Save
                </button>
                
                {testResult === 'success' && (
                  <span className="text-sm text-green-500">Connection successful!</span>
                )}
                
                {testResult === 'error' && (
                  <span className="text-sm text-red-500">Connection failed. Please check your API key.</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Connected Services</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="pb-2 text-left font-medium">Service</th>
                <th className="pb-2 text-left font-medium">Status</th>
                <th className="pb-2 text-left font-medium">Last Updated</th>
                <th className="pb-2 text-left font-medium">Data Points</th>
                <th className="pb-2 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 text-left">Alpha Vantage</td>
                <td className="py-3 text-left">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                    Connected
                  </span>
                </td>
                <td className="py-3 text-left">2025-04-19 14:30:22</td>
                <td className="py-3 text-left">Stock Prices, Technical Indicators</td>
                <td className="py-3 text-right">
                  <button className="text-sm text-primary hover:underline">Disconnect</button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 text-left">IEX Cloud</td>
                <td className="py-3 text-left">
                  <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                    Limited
                  </span>
                </td>
                <td className="py-3 text-left">2025-04-18 09:15:47</td>
                <td className="py-3 text-left">Real-time Quotes, Company Data</td>
                <td className="py-3 text-right">
                  <button className="text-sm text-primary hover:underline">Reconnect</button>
                </td>
              </tr>
              <tr>
                <td className="py-3 text-left">Polygon.io</td>
                <td className="py-3 text-left">
                  <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                    Disconnected
                  </span>
                </td>
                <td className="py-3 text-left">2025-04-15 16:42:10</td>
                <td className="py-3 text-left">Options Data, Historical OHLC</td>
                <td className="py-3 text-right">
                  <button className="text-sm text-primary hover:underline">Connect</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">API Documentation</h2>
        <p className="mb-4 text-muted-foreground">
          Access our API documentation to learn how to integrate with OptionInsight programmatically.
        </p>
        <div className="space-y-4">
          <div className="rounded-md border p-4">
            <h3 className="font-medium">REST API</h3>
            <p className="text-sm text-muted-foreground">Base URL: https://api.optioninsight.com/v1</p>
            <button className="mt-2 text-sm text-primary hover:underline">View Documentation</button>
          </div>
          <div className="rounded-md border p-4">
            <h3 className="font-medium">WebSocket API</h3>
            <p className="text-sm text-muted-foreground">Endpoint: wss://ws.optioninsight.com</p>
            <button className="mt-2 text-sm text-primary hover:underline">View Documentation</button>
          </div>
        </div>
      </div>
    </div>
  );
}
