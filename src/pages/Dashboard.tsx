import { Briefcase, DollarSign, TrendingUp } from 'lucide-react';
import { StatCard } from '../components/dashboard/StatCard';
import { PnLChart } from '../components/dashboard/PnLChart';
import { AssetAllocationChart } from '../components/dashboard/AssetAllocationChart';
import { OptionsStrategyChart } from '../components/dashboard/OptionsStrategyChart';
import { MarketNewsList } from '../components/dashboard/MarketNewsList';
import { LiveMarketDataTable } from '../components/dashboard/LiveMarketDataTable';

export function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          title="Portfolio Value"
          value="$124,567.89"
          icon={<Briefcase className="h-5 w-5" />}
          trend={{ value: "2.4% today", positive: true }}
        />
        <StatCard
          title="Total Investment"
          value="$100,000.00"
          icon={<DollarSign className="h-5 w-5" />}
        />
        <StatCard
          title="Total Return"
          value="$24,567.89"
          icon={<TrendingUp className="h-5 w-5" />}
          trend={{ value: "24.57% overall", positive: true }}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <PnLChart />
        <AssetAllocationChart />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <OptionsStrategyChart />
        <MarketNewsList />
      </div>

      <div>
        <LiveMarketDataTable />
      </div>

      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <h3 className="mb-4 text-lg font-medium">Market Insights</h3>
        <p className="text-muted-foreground">
          Market sentiment remains cautiously optimistic as investors digest recent economic data and corporate earnings reports. 
          The technology sector continues to show strength, while financial stocks face headwinds amid changing interest rate expectations. 
          Analysts suggest maintaining a diversified portfolio with exposure to defensive sectors given current market volatility.
        </p>
      </div>
    </div>
  );
}
