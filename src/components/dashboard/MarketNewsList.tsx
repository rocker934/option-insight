import { CalendarIcon } from 'lucide-react';

const newsItems = [
  {
    id: 1,
    title: 'Fed Signals Potential Rate Cut in September Meeting',
    source: 'Financial Times',
    date: '2 hours ago',
  },
  {
    id: 2,
    title: 'Tech Stocks Rally as Earnings Beat Expectations',
    source: 'Wall Street Journal',
    date: '4 hours ago',
  },
  {
    id: 3,
    title: 'Oil Prices Surge Amid Middle East Tensions',
    source: 'Bloomberg',
    date: '6 hours ago',
  },
  {
    id: 4,
    title: 'Cryptocurrency Market Sees Renewed Interest from Institutional Investors',
    source: 'CoinDesk',
    date: '8 hours ago',
  },
  {
    id: 5,
    title: 'Major Merger Announced in Banking Sector',
    source: 'CNBC',
    date: '10 hours ago',
  },
];

export function MarketNewsList() {
  return (
    <div className="h-full w-full rounded-lg border bg-card p-4 shadow-sm">
      <h3 className="mb-4 text-lg font-medium">Market News</h3>
      <div className="space-y-4">
        {newsItems.map((item) => (
          <div key={item.id} className="flex items-start space-x-3 border-b pb-3 last:border-0">
            <div className="flex-1">
              <h4 className="font-medium hover:text-primary hover:underline cursor-pointer">
                {item.title}
              </h4>
              <div className="mt-1 flex items-center text-xs text-muted-foreground">
                <span>{item.source}</span>
                <span className="mx-2">•</span>
                <span className="flex items-center">
                  <CalendarIcon className="mr-1 h-3 w-3" />
                  {item.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
