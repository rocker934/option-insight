import { CalendarIcon } from 'lucide-react';

const newsItems = [
  {
    id: 1,
    title: 'Fed Signals Potential Rate Cut in September Meeting',
    source: 'Financial Times',
    date: '2 hours ago',
    content: 'Federal Reserve officials have signaled a potential interest rate cut in their September meeting, citing improving inflation data and concerns about labor market cooling. Markets reacted positively to the news, with major indices climbing on expectations of easier monetary policy ahead.',
    category: 'Economy',
    image: '/news-fed.jpg'
  },
  {
    id: 2,
    title: 'Tech Stocks Rally as Earnings Beat Expectations',
    source: 'Wall Street Journal',
    date: '4 hours ago',
    content: 'Major technology companies reported quarterly earnings that exceeded analyst expectations, driving a broad rally in tech stocks. Companies cited strong cloud computing growth, AI advancements, and resilient consumer spending on digital services as key factors behind the impressive results.',
    category: 'Technology',
    image: '/news-tech.jpg'
  },
  {
    id: 3,
    title: 'Oil Prices Surge Amid Middle East Tensions',
    source: 'Bloomberg',
    date: '6 hours ago',
    content: 'Crude oil prices jumped more than 3% today as geopolitical tensions in the Middle East escalated. Analysts warn that any disruption to oil production or shipping routes could further constrain global supply, potentially pushing prices even higher in the coming weeks.',
    category: 'Commodities',
    image: '/news-oil.jpg'
  },
  {
    id: 4,
    title: 'Cryptocurrency Market Sees Renewed Interest from Institutional Investors',
    source: 'CoinDesk',
    date: '8 hours ago',
    content: 'Institutional investors are showing renewed interest in cryptocurrency markets, with several major financial institutions announcing plans to expand their digital asset offerings. This shift comes as regulatory clarity improves and traditional finance increasingly embraces blockchain technology.',
    category: 'Cryptocurrency',
    image: '/news-crypto.jpg'
  },
  {
    id: 5,
    title: 'Major Merger Announced in Banking Sector',
    source: 'CNBC',
    date: '10 hours ago',
    content: 'Two of the nation\'s largest regional banks announced a merger agreement valued at $45 billion, creating the fifth-largest bank in the United States. The combined entity is expected to realize significant cost synergies while expanding its geographic footprint and digital capabilities.',
    category: 'Finance',
    image: '/news-banking.jpg'
  },
  {
    id: 6,
    title: 'Retail Sales Data Shows Stronger Than Expected Consumer Spending',
    source: 'Reuters',
    date: '12 hours ago',
    content: 'The latest retail sales data exceeded economist forecasts, suggesting consumer spending remains resilient despite inflation concerns. Department stores and online retailers reported particularly strong results, while spending at restaurants and bars continued to grow steadily.',
    category: 'Economy',
    image: '/news-retail.jpg'
  },
  {
    id: 7,
    title: 'New AI Regulations Proposed by European Commission',
    source: 'The Guardian',
    date: '1 day ago',
    content: 'The European Commission has proposed new regulations governing artificial intelligence applications, focusing on transparency, accountability, and risk management. Technology companies are assessing the potential impact on their AI development roadmaps and global operations.',
    category: 'Regulation',
    image: '/news-ai.jpg'
  },
  {
    id: 8,
    title: 'Housing Market Shows Signs of Cooling as Mortgage Rates Rise',
    source: 'Financial Times',
    date: '1 day ago',
    content: 'The housing market is showing signs of cooling as mortgage rates climb to multi-year highs. Home sales declined for the third consecutive month, while inventory levels are gradually increasing from historic lows, potentially providing relief for buyers after years of intense competition.',
    category: 'Real Estate',
    image: '/news-housing.jpg'
  },
];

export function News() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">News & Analysis</h1>
      
      <div className="flex items-center space-x-4 mb-4">
        <div className="rounded-md border bg-primary text-primary-foreground px-3 py-1 text-sm font-medium">All</div>
        <div className="rounded-md border px-3 py-1 text-sm">Economy</div>
        <div className="rounded-md border px-3 py-1 text-sm">Markets</div>
        <div className="rounded-md border px-3 py-1 text-sm">Stocks</div>
        <div className="rounded-md border px-3 py-1 text-sm">Options</div>
        <div className="rounded-md border px-3 py-1 text-sm">Crypto</div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {newsItems.slice(0, 2).map((item) => (
          <div key={item.id} className="rounded-lg border bg-card overflow-hidden shadow-sm">
            <div className="h-48 bg-muted"></div>
            <div className="p-4">
              <div className="flex items-center text-xs text-muted-foreground mb-2">
                <span className="bg-primary/10 text-primary rounded-full px-2 py-1">{item.category}</span>
                <span className="mx-2">•</span>
                <span>{item.source}</span>
                <span className="mx-2">•</span>
                <span className="flex items-center">
                  <CalendarIcon className="mr-1 h-3 w-3" />
                  {item.date}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground mb-4">{item.content}</p>
              <button className="text-primary hover:underline">Read more</button>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {newsItems.slice(2).map((item) => (
          <div key={item.id} className="flex items-start space-x-4 rounded-lg border bg-card p-4 shadow-sm">
            <div className="h-24 w-24 flex-shrink-0 bg-muted rounded-md"></div>
            <div className="flex-1">
              <div className="flex items-center text-xs text-muted-foreground mb-1">
                <span className="bg-primary/10 text-primary rounded-full px-2 py-1">{item.category}</span>
                <span className="mx-2">•</span>
                <span>{item.source}</span>
                <span className="mx-2">•</span>
                <span className="flex items-center">
                  <CalendarIcon className="mr-1 h-3 w-3" />
                  {item.date}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
              <p className="text-muted-foreground text-sm line-clamp-2">{item.content}</p>
              <button className="mt-2 text-sm text-primary hover:underline">Read more</button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent">
          Load More News
        </button>
      </div>
    </div>
  );
}
