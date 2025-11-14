#!/usr/bin/env node

/**
 * Command-line interface for the Nordstrom product scraper
 */

import { scrapeNordstromProducts } from './index.js';

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
Nordstrom Product Stock Scraper
================================

Usage:
  npm run scrape <URL> [delay]
  ts-node scraper/cli.ts <URL> [delay]

Arguments:
  URL     - The webpage URL to scrape for Nordstrom product links
  delay   - (Optional) Delay in milliseconds between requests (default: 1000)

Examples:
  npm run scrape https://example.com
  npm run scrape https://example.com 2000
  ts-node scraper/cli.ts https://example.com 1500

Description:
  This tool scans a given webpage for Nordstrom product links and checks
  each product's stock status. It will notify you which products are in
  stock (have a "Buy Now" button) and which are out of stock.

Output:
  - Real-time progress as products are checked
  - Summary showing in-stock and out-of-stock products
  - Product titles and URLs for easy reference
    `);
    process.exit(0);
  }

  const url = args[0];
  const delayMs = args[1] ? parseInt(args[1], 10) : 1000;

  // Validate URL
  try {
    new URL(url);
  } catch {
    console.error('Error: Invalid URL provided');
    console.error('Usage: npm run scrape <URL>');
    process.exit(1);
  }

  // Validate delay
  if (isNaN(delayMs) || delayMs < 0) {
    console.error('Error: Delay must be a positive number');
    process.exit(1);
  }

  try {
    await scrapeNordstromProducts(url, { delay: delayMs });
    console.log('\n✅ Scraping completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Scraping failed:', error);
    process.exit(1);
  }
}

main();
