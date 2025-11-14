#!/usr/bin/env node

/**
 * Advanced command-line interface for the Nordstrom product scraper
 * Supports multi-URL scanning and Google Sheets export
 */

import { scrapeNordstromProducts } from './index.js';
import { scrapeMultipleUrls, readUrlsFromFile } from './multiUrlScanner.js';
import { exportToGoogleSheets } from './sheetsExporter.js';
import { promises as fs } from 'fs';

interface CliOptions {
  urls?: string[];
  urlsFile?: string;
  delay?: number;
  urlDelay?: number;
  spreadsheetId?: string;
  credentials?: string;
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    printHelp();
    process.exit(0);
  }

  try {
    const options = parseArguments(args);

    // Determine which URLs to scan
    let urls: string[] = [];

    if (options.urlsFile) {
      console.log(`Reading URLs from file: ${options.urlsFile}`);
      urls = await readUrlsFromFile(options.urlsFile);
      console.log(`Loaded ${urls.length} URLs from file\n`);
    } else if (options.urls && options.urls.length > 0) {
      urls = options.urls;
    } else {
      console.error('❌ Error: No URLs provided. Use --url, --urls-file, or provide URLs as arguments');
      process.exit(1);
    }

    if (urls.length === 0) {
      console.error('❌ Error: No valid URLs found');
      process.exit(1);
    }

    // Scrape URLs
    const scraperOptions = { delay: options.delay || 1500 };
    const result = urls.length === 1
      ? await scrapeNordstromProducts(urls[0], scraperOptions)
      : await scrapeMultipleUrls(urls, scraperOptions, options.urlDelay || 3000);

    // Export to Google Sheets if requested
    if (options.spreadsheetId) {
      if (!options.credentials) {
        console.error('\n❌ Error: --credentials path required for Google Sheets export');
        process.exit(1);
      }

      console.log('\n📤 Exporting results to Google Sheets...');
      await exportToGoogleSheets(options.spreadsheetId, result, options.credentials);
    }

    console.log('\n✅ Scraping completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Scraping failed:', error);
    process.exit(1);
  }
}

function parseArguments(args: string[]): CliOptions {
  const options: CliOptions = {
    urls: [],
    delay: 1500,
    urlDelay: 3000
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case '--url':
      case '-u':
        if (i + 1 < args.length) {
          options.urls!.push(args[++i]);
        }
        break;

      case '--urls-file':
      case '-f':
        if (i + 1 < args.length) {
          options.urlsFile = args[++i];
        }
        break;

      case '--delay':
      case '-d':
        if (i + 1 < args.length) {
          options.delay = parseInt(args[++i], 10);
        }
        break;

      case '--url-delay':
        if (i + 1 < args.length) {
          options.urlDelay = parseInt(args[++i], 10);
        }
        break;

      case '--spreadsheet-id':
      case '-s':
        if (i + 1 < args.length) {
          options.spreadsheetId = args[++i];
        }
        break;

      case '--credentials':
      case '-c':
        if (i + 1 < args.length) {
          options.credentials = args[++i];
        }
        break;

      default:
        // Treat as URL if it starts with http
        if (arg.startsWith('http://') || arg.startsWith('https://')) {
          options.urls!.push(arg);
        }
        break;
    }
  }

  return options;
}

function printHelp() {
  console.log(`
Nordstrom Product Stock Scraper - Advanced CLI
===============================================

Scan one or multiple URLs for Nordstrom products and check their stock status.
Optionally export results to Google Sheets.

USAGE:
  npm run scrape:advanced [OPTIONS]
  tsx scraper/advancedCli.ts [OPTIONS]

OPTIONS:
  -u, --url <URL>              Single URL to scan (can be used multiple times)
  -f, --urls-file <PATH>       Path to file containing URLs (one per line)
  -d, --delay <MS>             Delay between product checks in ms (default: 1500)
  --url-delay <MS>             Delay between scanning different URLs (default: 3000)
  -s, --spreadsheet-id <ID>    Google Spreadsheet ID for export
  -c, --credentials <PATH>     Path to Google API credentials JSON file
  -h, --help                   Show this help message

EXAMPLES:

  # Scan a single URL
  npm run scrape:advanced --url https://example.com/products

  # Scan multiple URLs
  npm run scrape:advanced -u https://example.com/blog1 -u https://example.com/blog2

  # Scan URLs from a file
  npm run scrape:advanced --urls-file scraper/urls.txt

  # Scan and export to Google Sheets
  npm run scrape:advanced \\
    --urls-file scraper/urls.txt \\
    --spreadsheet-id YOUR_SPREADSHEET_ID \\
    --credentials ./credentials.json

  # Custom delays
  npm run scrape:advanced \\
    --urls-file scraper/urls.txt \\
    --delay 2000 \\
    --url-delay 5000

GOOGLE SHEETS SETUP:

  1. Create a Google Cloud Project
  2. Enable Google Sheets API
  3. Create a Service Account
  4. Download the credentials JSON file
  5. Share your spreadsheet with the service account email
  6. Use the credentials file with --credentials flag

URLS FILE FORMAT:

  Create a text file with one URL per line:

  https://example.com/page1
  https://example.com/page2
  # Lines starting with # are comments

  See scraper/urls.txt for an example.

NOTES:

  - The scraper respects rate limits with built-in delays
  - Some websites may block automated requests (403 errors)
  - For blocked sites, try:
    1. Increasing the delay
    2. Saving the HTML locally and scanning the file
    3. Using different URLs or approaches

TROUBLESHOOTING:

  403 Forbidden Errors:
    Some sites have bot protection. Try:
    - Saving the page HTML and scanning locally
    - Using the direct Nordstrom product URLs
    - Contacting site administrators for permission

  Rate Limiting:
    Increase delays between requests:
    --delay 3000 --url-delay 5000

For more information, see scraper/README.md
  `);
}

main();
