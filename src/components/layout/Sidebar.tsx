import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  Briefcase,
  CandlestickChart,
  ChevronLeft,
  ChevronRight,
  Cog,
  Database,
  Globe,
  Home,
  LineChart,
  Newspaper,
  Search,
  TrendingUp,
  Wallet,
} from 'lucide-react';

type SidebarItem = {
  title: string;
  icon: React.ReactNode;
  path: string;
};

const sidebarItems: SidebarItem[] = [
  { title: 'Dashboard', icon: <Home className="h-5 w-5" />, path: '/' },
  { title: 'Market Trends', icon: <TrendingUp className="h-5 w-5" />, path: '/market-trends' },
  { title: 'P&L Analysis', icon: <LineChart className="h-5 w-5" />, path: '/pnl-analysis' },
  { title: 'Stocks', icon: <BarChart3 className="h-5 w-5" />, path: '/stocks' },
  { title: 'Options', icon: <CandlestickChart className="h-5 w-5" />, path: '/options' },
  { title: 'Futures', icon: <Briefcase className="h-5 w-5" />, path: '/futures' },
  { title: 'Cryptocurrency', icon: <Wallet className="h-5 w-5" />, path: '/cryptocurrency' },
  { title: 'News & Analysis', icon: <Newspaper className="h-5 w-5" />, path: '/news' },
  { title: 'Screener', icon: <Search className="h-5 w-5" />, path: '/screener' },
  { title: 'API Integration', icon: <Globe className="h-5 w-5" />, path: '/api-integration' },
  { title: 'Data Mapping', icon: <Database className="h-5 w-5" />, path: '/data-mapping' },
  { title: 'Settings', icon: <Cog className="h-5 w-5" />, path: '/settings' },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        'flex h-screen flex-col border-r bg-background transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-14 items-center border-b px-3">
        <div className={cn('flex items-center', collapsed ? 'justify-center w-full' : 'justify-between w-full')}>
          {!collapsed && <h1 className="text-xl font-bold">OptionInsight</h1>}
          {collapsed && <CandlestickChart className="h-6 w-6" />}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-full p-1 hover:bg-accent"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {sidebarItems.map((item) => (
            <li key={item.title}>
              <Link
                to={item.path}
                className="flex items-center rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
              >
                <span className="mr-3">{item.icon}</span>
                {!collapsed && <span>{item.title}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
