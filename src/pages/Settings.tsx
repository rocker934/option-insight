import { useState } from 'react';
import { Bell, Moon, Sun, User, LogOut, Save } from 'lucide-react';

export function Settings() {
  const [theme, setTheme] = useState('system');
  const [notifications, setNotifications] = useState(true);
  const [dataRefresh, setDataRefresh] = useState('15');
  const [currency, setCurrency] = useState('usd');
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Appearance</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Theme</label>
            <div className="mt-2 flex items-center space-x-2">
              <button 
                onClick={() => setTheme('light')}
                className={`flex items-center space-x-2 rounded-md px-3 py-2 ${theme === 'light' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-accent'}`}
              >
                <Sun className="h-4 w-4" />
                <span>Light</span>
              </button>
              <button 
                onClick={() => setTheme('dark')}
                className={`flex items-center space-x-2 rounded-md px-3 py-2 ${theme === 'dark' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-accent'}`}
              >
                <Moon className="h-4 w-4" />
                <span>Dark</span>
              </button>
              <button 
                onClick={() => setTheme('system')}
                className={`flex items-center space-x-2 rounded-md px-3 py-2 ${theme === 'system' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-accent'}`}
              >
                <span>System</span>
              </button>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium">Currency</label>
            <select 
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="mt-2 h-9 w-full max-w-xs rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="usd">USD ($)</option>
              <option value="eur">EUR (€)</option>
              <option value="gbp">GBP (£)</option>
              <option value="jpy">JPY (¥)</option>
              <option value="inr">INR (₹)</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Enable Notifications</h3>
              <p className="text-sm text-muted-foreground">Receive alerts for price changes, news, and portfolio updates</p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input 
                type="checkbox" 
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                className="peer sr-only" 
              />
              <div className="h-6 w-11 rounded-full bg-muted peer-checked:bg-primary after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full"></div>
            </label>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Notification Types</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="price-alerts" className="h-4 w-4 rounded border-gray-300" checked />
                <label htmlFor="price-alerts" className="text-sm">Price Alerts</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="news-alerts" className="h-4 w-4 rounded border-gray-300" checked />
                <label htmlFor="news-alerts" className="text-sm">News Alerts</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="portfolio-updates" className="h-4 w-4 rounded border-gray-300" checked />
                <label htmlFor="portfolio-updates" className="text-sm">Portfolio Updates</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="market-open-close" className="h-4 w-4 rounded border-gray-300" checked />
                <label htmlFor="market-open-close" className="text-sm">Market Open/Close</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Data Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Data Refresh Interval (minutes)</label>
            <select 
              value={dataRefresh}
              onChange={(e) => setDataRefresh(e.target.value)}
              className="mt-2 h-9 w-full max-w-xs rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="5">5 minutes</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Data Sources</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="real-time" className="h-4 w-4 rounded border-gray-300" checked />
                <label htmlFor="real-time" className="text-sm">Use Real-time Data (when available)</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="extended-hours" className="h-4 w-4 rounded border-gray-300" checked />
                <label htmlFor="extended-hours" className="text-sm">Include Extended Hours Data</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="historical" className="h-4 w-4 rounded border-gray-300" checked />
                <label htmlFor="historical" className="text-sm">Cache Historical Data</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Account</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 overflow-hidden rounded-full bg-primary">
              <User className="h-full w-full p-2 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-medium">John Doe</h3>
              <p className="text-sm text-muted-foreground">john.doe@example.com</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <button className="flex items-center space-x-2 text-sm text-primary hover:underline">
              <User className="h-4 w-4" />
              <span>Edit Profile</span>
            </button>
            <button className="flex items-center space-x-2 text-sm text-primary hover:underline">
              <Bell className="h-4 w-4" />
              <span>Notification Preferences</span>
            </button>
            <button className="flex items-center space-x-2 text-sm text-red-500 hover:underline">
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button className="flex items-center space-x-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
          <Save className="h-4 w-4" />
          <span>Save Settings</span>
        </button>
      </div>
    </div>
  );
}
