# Nordstrom Product Stock Scraper

A TypeScript-based web scraper that automatically finds Nordstrom product links on any webpage and checks their stock availability.

## Features

- **Automatic Link Detection**: Scans any URL for Nordstrom product links
- **Stock Status Checking**: Determines if products are in stock or out of stock
- **Real-time Notifications**: Get instant updates on product availability
- **Detailed Reporting**: Shows product titles, URLs, and stock status
- **Rate Limiting**: Built-in delays to respect server resources
- **Error Handling**: Robust error handling for network issues

## How It Works

1. **Input**: You provide a URL that contains Nordstrom product links
2. **Scanning**: The scraper finds all Nordstrom product URLs on that page
3. **Checking**: Each product is checked for stock status by looking for:
   - "Add to Bag" or "Buy Now" buttons (in stock)
   - "Out of Stock" or "Sold Out" messages (out of stock)
4. **Results**: You get a detailed report of all products and their stock status

## Installation

Dependencies are already installed as part of the main project. If you need to reinstall:

```bash
npm install
```

## Usage

### Basic Usage

```bash
npm run scrape <URL>
```

### With Custom Delay

Add a delay (in milliseconds) between requests to avoid rate limiting:

```bash
npm run scrape <URL> <delay_ms>
```

### Examples

```bash
# Check products on a blog post
npm run scrape https://example.com/best-nordstrom-products

# With 2-second delay between requests
npm run scrape https://example.com/shopping-guide 2000

# Using ts-node directly
ts-node scraper/cli.ts https://example.com 1500
```

### Help

```bash
npm run scrape --help
```

## Output

The scraper provides detailed output in several sections:

### Real-time Progress
```
[1/5] Checking: https://www.nordstrom.com/s/product-name
  ✅ IN STOCK: Product Name
```

### Summary Report
```
============================================================
SCRAPING SUMMARY
============================================================
Source URL: https://example.com
Total Products Found: 5
In Stock: 3
Out of Stock: 2
Errors: 0
Scanned at: 2025-11-14T20:00:00.000Z

------------------------------------------------------------
IN STOCK PRODUCTS:
------------------------------------------------------------
1. Product Name 1
   URL: https://www.nordstrom.com/s/product-1
   Status: Product is in stock - Buy Now button available

------------------------------------------------------------
OUT OF STOCK PRODUCTS:
------------------------------------------------------------
1. Product Name 2
   URL: https://www.nordstrom.com/s/product-2
```

## Technical Details

### Architecture

- **urlScraper.ts**: Finds Nordstrom product links on a webpage
- **nordstromChecker.ts**: Checks individual product stock status
- **index.ts**: Main scraper logic and result aggregation
- **cli.ts**: Command-line interface
- **types.ts**: TypeScript type definitions

### Technologies Used

- **TypeScript**: For type-safe code
- **Axios**: For HTTP requests
- **Cheerio**: For HTML parsing
- **Node.js**: Runtime environment

### Stock Detection Logic

The scraper checks multiple indicators to determine stock status:

1. **In Stock Indicators**:
   - Presence of "Add to Bag" button
   - Presence of "Buy Now" button
   - Button is enabled (not disabled)

2. **Out of Stock Indicators**:
   - "Out of Stock" text
   - "Sold Out" text
   - "Currently Unavailable" text
   - "Notify Me When Available" button
   - Disabled "Add to Bag" button

### Limitations

- **JavaScript-Rendered Content**: This scraper uses static HTML parsing. If Nordstrom heavily relies on JavaScript for rendering, some content might not be detected. For JavaScript-heavy sites, consider using a browser automation tool like Puppeteer.
- **Rate Limiting**: Respect Nordstrom's servers by using appropriate delays between requests (default: 1000ms)
- **Dynamic URLs**: Some product URLs might have tracking parameters that make them look different even for the same product

## Configuration Options

You can customize the scraper by modifying the `ScraperOptions` in your code:

```typescript
interface ScraperOptions {
  timeout?: number;      // Request timeout in ms (default: 30000)
  userAgent?: string;    // Custom user agent string
  delay?: number;        // Delay between requests in ms (default: 1000)
}
```

## Troubleshooting

### No Products Found

- Verify the URL contains actual Nordstrom product links
- Check if the page requires JavaScript to load content
- Try accessing the URL in a browser to confirm it works

### Timeout Errors

- Increase the timeout in the options
- Check your internet connection
- The target website might be down

### Rate Limiting / 429 Errors

- Increase the delay between requests
- Reduce the number of concurrent requests
- Wait before retrying

## Legal & Ethical Considerations

- **Respect robots.txt**: Check Nordstrom's robots.txt file
- **Rate Limiting**: Use appropriate delays to avoid overloading servers
- **Terms of Service**: Ensure compliance with Nordstrom's terms of service
- **Personal Use**: This tool is intended for personal use only

## Future Enhancements

Potential improvements:
- Browser automation with Puppeteer for JavaScript-heavy pages
- Proxy support for distributed scraping
- Email/SMS notifications for stock changes
- Database storage for tracking stock history
- Price tracking alongside stock status
- Multi-retailer support

## License

This scraper is part of the Option Insight project and follows the same MIT License.

## Support

For issues or questions:
1. Check this README
2. Review the code comments
3. Open an issue on the GitHub repository

---

**Note**: Web scraping should be done responsibly and ethically. Always respect the website's terms of service and rate limits.
