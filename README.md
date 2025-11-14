# Option Insight

A comprehensive financial market analysis application built with React, TypeScript, and Vite.

## Features

- Real-time market data visualization
- Portfolio tracking and analysis
- Options strategy analysis
- Market trends and news
- Asset allocation tracking
- Market screener
- API integration capabilities
- Data mapping tools
- **Nordstrom Product Stock Scraper** - Automated tool to find and check Nordstrom product availability

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide Icons

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/rocker934/option-insight.git
cd option-insight
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
option-insight/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── providers/     # Context providers
│   └── lib/          # Utility functions
├── scraper/          # Nordstrom product stock scraper
│   ├── cli.ts        # Command-line interface
│   ├── index.ts      # Main scraper logic
│   ├── urlScraper.ts # URL scanning functionality
│   ├── nordstromChecker.ts # Stock checking logic
│   ├── types.ts      # TypeScript types
│   ├── example.ts    # Usage examples
│   └── README.md     # Scraper documentation
├── public/           # Static assets
└── index.html        # Entry HTML file
```

## Nordstrom Product Scraper

The scraper tool automatically finds Nordstrom product links on any webpage and checks their stock status.

### Quick Start

```bash
# Check products from any URL
npm run scrape <URL>

# Example with 2-second delay between requests
npm run scrape https://example.com 2000
```

### Features

- Automatically finds all Nordstrom product links on a webpage
- Checks stock status (in stock vs. out of stock)
- Detects "Buy Now" buttons and stock indicators
- Provides detailed reports with product titles and URLs
- Built-in rate limiting to respect server resources

For detailed documentation, see [scraper/README.md](scraper/README.md)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
