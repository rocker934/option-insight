import { promises as fs } from 'fs';
import * as cheerio from 'cheerio';
import { checkNordstromStock, delay } from './nordstromChecker.js';
import { ScraperResult, ScraperOptions } from './types.js';

/**
 * Scans a local HTML file for Nordstrom product links and checks their stock
 * Useful when websites block automated requests
 * @param htmlFilePath - Path to the HTML file to scan
 * @param options - Scraper configuration options
 * @returns Scraper results
 */
export async function scanHtmlFile(
  htmlFilePath: string,
  options: ScraperOptions = {}
): Promise<ScraperResult> {
  const startTime = new Date();
  const { delay: delayMs = 1000 } = options;

  console.log('\n=== Nordstrom Product Stock Scraper (HTML File Mode) ===\n');
  console.log(`HTML File: ${htmlFilePath}`);
  console.log(`Started at: ${startTime.toISOString()}\n`);

  // Read the HTML file
  console.log('Reading HTML file...');
  const html = await fs.readFile(htmlFilePath, 'utf-8');
  const $ = cheerio.load(html);

  // Find all Nordstrom product links
  console.log('Finding Nordstrom product links...');
  const nordstromLinks = new Set<string>();

  $('a[href]').each((_, element) => {
    const href = $(element).attr('href');
    if (href && isNordstromProductUrl(href)) {
      const normalizedUrl = normalizeUrl(href);
      nordstromLinks.add(normalizedUrl);
    }
  });

  const productUrls = Array.from(nordstromLinks);

  if (productUrls.length === 0) {
    console.log('\nNo Nordstrom product links found in this file.');
    return {
      sourceUrl: htmlFilePath,
      totalProducts: 0,
      inStock: [],
      outOfStock: [],
      errors: [],
      scannedAt: startTime
    };
  }

  console.log(`Found ${productUrls.length} unique Nordstrom product links\n`);
  console.log('Checking stock status...\n');

  // Check stock status for each product
  const results: ScraperResult = {
    sourceUrl: htmlFilePath,
    totalProducts: productUrls.length,
    inStock: [],
    outOfStock: [],
    errors: [],
    scannedAt: startTime
  };

  for (let i = 0; i < productUrls.length; i++) {
    const productUrl = productUrls[i];
    console.log(`[${i + 1}/${productUrls.length}] Checking: ${productUrl}`);

    const status = await checkNordstromStock(productUrl, options);

    // Categorize the result
    if (status.status === 'error') {
      results.errors.push(status);
      console.log(`  ❌ Error: ${status.message}`);
    } else if (status.status === 'in_stock') {
      results.inStock.push(status);
      console.log(`  ✅ IN STOCK: ${status.title}`);
    } else {
      results.outOfStock.push(status);
      console.log(`  ⚠️  OUT OF STOCK: ${status.title}`);
    }

    // Add delay between requests
    if (i < productUrls.length - 1) {
      await delay(delayMs);
    }
  }

  // Print summary
  printSummary(results);

  return results;
}

/**
 * Checks if a URL is a Nordstrom product URL
 */
function isNordstromProductUrl(url: string): boolean {
  const nordstromPattern = /nordstrom\.com.*\/s\//i;
  const productPattern = /nordstrom\.com.*\/product/i;
  return nordstromPattern.test(url) || productPattern.test(url);
}

/**
 * Normalizes a URL to ensure consistency
 */
function normalizeUrl(url: string): string {
  try {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return url.startsWith('//') ? `https:${url}` : url;
  } catch {
    return url;
  }
}

/**
 * Prints a formatted summary of the scraping results
 */
function printSummary(results: ScraperResult): void {
  console.log('\n' + '='.repeat(60));
  console.log('SCRAPING SUMMARY');
  console.log('='.repeat(60));
  console.log(`Source File: ${results.sourceUrl}`);
  console.log(`Total Products Found: ${results.totalProducts}`);
  console.log(`In Stock: ${results.inStock.length}`);
  console.log(`Out of Stock: ${results.outOfStock.length}`);
  console.log(`Errors: ${results.errors.length}`);
  console.log(`Scanned at: ${results.scannedAt.toISOString()}`);

  if (results.inStock.length > 0) {
    console.log('\n' + '-'.repeat(60));
    console.log('IN STOCK PRODUCTS:');
    console.log('-'.repeat(60));
    results.inStock.forEach((product, index) => {
      console.log(`${index + 1}. ${product.title}`);
      console.log(`   URL: ${product.url}`);
      console.log(`   Status: ${product.message}`);
      console.log('');
    });
  }

  if (results.outOfStock.length > 0) {
    console.log('\n' + '-'.repeat(60));
    console.log('OUT OF STOCK PRODUCTS:');
    console.log('-'.repeat(60));
    results.outOfStock.forEach((product, index) => {
      console.log(`${index + 1}. ${product.title}`);
      console.log(`   URL: ${product.url}`);
      console.log('');
    });
  }

  console.log('='.repeat(60) + '\n');
}
