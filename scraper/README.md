# Nordstrom Product Stock Scraper

A comprehensive TypeScript-based web scraper that automatically finds Nordstrom product links and checks their stock availability. Supports multiple URLs, Google Sheets export, and local HTML file scanning.

## Features

- **Automatic Link Detection**: Scans any URL for Nordstrom product links
- **Multi-URL Support**: Scan multiple URLs from a file or command line
- **Stock Status Checking**: Determines if products are in stock or out of stock
- **Google Sheets Export**: Export results directly to Google Sheets
- **Local HTML Scanning**: Scan saved HTML files (useful when sites block requests)
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

### Quick Start - Single URL

```bash
npm run scrape <URL> [delay_ms]
```

Example:
```bash
npm run scrape https://example.com/products 1500
```

### Advanced Usage - Multiple URLs & Google Sheets

The advanced CLI supports scanning multiple URLs and exporting to Google Sheets:

```bash
npm run scrape:advanced [OPTIONS]
```

#### Scan Multiple URLs from File

1. Edit `scraper/urls.txt` and add your URLs (one per line)
2. Run the scraper:

```bash
npm run scrape:advanced --urls-file scraper/urls.txt
```

#### Scan Multiple URLs from Command Line

```bash
npm run scrape:advanced \
  --url https://example.com/page1 \
  --url https://example.com/page2 \
  --url https://example.com/page3
```

#### Export to Google Sheets

```bash
npm run scrape:advanced \
  --urls-file scraper/urls.txt \
  --spreadsheet-id YOUR_SPREADSHEET_ID \
  --credentials ./path/to/credentials.json
```

#### Advanced Options

```bash
npm run scrape:advanced \
  --urls-file scraper/urls.txt \
  --delay 2000 \              # Delay between product checks (ms)
  --url-delay 5000 \          # Delay between different URLs (ms)
  --spreadsheet-id ID \       # Google Sheets ID
  --credentials creds.json    # Google API credentials
```

### Get Help

```bash
npm run scrape:help
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

## Google Sheets Setup

To export results to Google Sheets:

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the Google Sheets API for your project

### 2. Create Service Account

1. Go to "IAM & Admin" > "Service Accounts"
2. Click "Create Service Account"
3. Give it a name and click "Create"
4. Grant it the "Editor" role
5. Click "Done"

### 3. Download Credentials

1. Click on the service account you created
2. Go to the "Keys" tab
3. Click "Add Key" > "Create new key"
4. Choose JSON format
5. Download the file and save it securely (e.g., `credentials.json`)

### 4. Share Your Spreadsheet

1. Create or open a Google Spreadsheet
2. Click "Share"
3. Copy the service account email from your credentials JSON
4. Share the spreadsheet with that email address (give Editor access)
5. Copy the Spreadsheet ID from the URL:
   `https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit`

### 5. Use the Scraper

```bash
npm run scrape:advanced \
  --urls-file scraper/urls.txt \
  --spreadsheet-id YOUR_SPREADSHEET_ID \
  --credentials ./credentials.json
```

## Working Around 403 Forbidden Errors

Some websites (like Elfster) have bot protection that blocks automated requests. Here are solutions:

### Option 1: Save HTML Locally

If you get a 403 error:

1. Open the URL in your browser
2. Right-click and select "Save Page As" (save as HTML)
3. Scan the local HTML file:

```typescript
import { scanHtmlFile } from './scraper/htmlFileScanner.js';

const results = await scanHtmlFile('./saved-page.html');
```

### Option 2: Use Direct Product URLs

If you already know the Nordstrom product URLs, create a file with just those URLs and scan them directly.

### Option 3: Browser Extensions

For heavily protected sites, consider using browser automation tools or extensions that can extract links for you.

## Troubleshooting

### No Products Found

- Verify the URL contains actual Nordstrom product links
- Check if the page requires JavaScript to load content
- Try accessing the URL in a browser to confirm it works

### 403 Forbidden Errors

- The website is blocking automated requests
- Try saving the page HTML locally and scanning the file
- Use direct Nordstrom product URLs instead
- Increase delays or use different approaches

### Timeout Errors

- Increase the timeout in the options
- Check your internet connection
- The target website might be down

### Rate Limiting / 429 Errors

- Increase the delay between requests
- Reduce the number of concurrent requests
- Wait before retrying

### Google Sheets Export Fails

- Verify credentials.json is valid
- Check that the spreadsheet is shared with the service account email
- Ensure the Google Sheets API is enabled in your project

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
