import { scrapeNordstromProducts } from './index.js';
import { ScraperResult, ScraperOptions } from './types.js';
import { delay } from './nordstromChecker.js';
import { promises as fs } from 'fs';

export interface MultiUrlResult {
  urls: string[];
  results: ScraperResult[];
  summary: {
    totalUrls: number;
    totalProducts: number;
    totalInStock: number;
    totalOutOfStock: number;
    totalErrors: number;
  };
  scannedAt: Date;
}

/**
 * Scrapes multiple URLs for Nordstrom products
 * @param urls - Array of URLs to scrape
 * @param options - Scraper configuration options
 * @param urlDelay - Delay between scanning different URLs (default: 3000ms)
 * @returns Aggregated results from all URLs
 */
export async function scrapeMultipleUrls(
  urls: string[],
  options: ScraperOptions = {},
  urlDelay: number = 3000
): Promise<MultiUrlResult> {
  const startTime = new Date();
  const results: ScraperResult[] = [];

  console.log('\n' + '='.repeat(70));
  console.log('MULTI-URL NORDSTROM PRODUCT STOCK SCRAPER');
  console.log('='.repeat(70));
  console.log(`Scanning ${urls.length} URLs...`);
  console.log(`Started at: ${startTime.toISOString()}\n`);

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.log(`\n${'='.repeat(70)}`);
    console.log(`URL ${i + 1}/${urls.length}: ${url}`);
    console.log('='.repeat(70));

    try {
      const result = await scrapeNordstromProducts(url, options);
      results.push(result);

      // Add delay between URLs (except for the last one)
      if (i < urls.length - 1) {
        console.log(`\nWaiting ${urlDelay}ms before next URL...`);
        await delay(urlDelay);
      }
    } catch (error) {
      console.error(`\n❌ Failed to scrape ${url}:`, error);
      // Create an error result
      results.push({
        sourceUrl: url,
        totalProducts: 0,
        inStock: [],
        outOfStock: [],
        errors: [{
          url,
          title: 'URL Fetch Error',
          status: 'error',
          message: error instanceof Error ? error.message : String(error),
          timestamp: new Date()
        }],
        scannedAt: new Date()
      });
    }
  }

  // Calculate summary
  const summary = {
    totalUrls: urls.length,
    totalProducts: results.reduce((sum, r) => sum + r.totalProducts, 0),
    totalInStock: results.reduce((sum, r) => sum + r.inStock.length, 0),
    totalOutOfStock: results.reduce((sum, r) => sum + r.outOfStock.length, 0),
    totalErrors: results.reduce((sum, r) => sum + r.errors.length, 0)
  };

  printMultiUrlSummary(urls, results, summary);

  return {
    urls,
    results,
    summary,
    scannedAt: startTime
  };
}

/**
 * Reads URLs from a text file (one URL per line)
 * @param filePath - Path to the file containing URLs
 * @returns Array of URLs
 */
export async function readUrlsFromFile(filePath: string): Promise<string[]> {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const urls = content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0 && !line.startsWith('#')); // Skip empty lines and comments

    return urls;
  } catch (error) {
    throw new Error(`Failed to read URLs from file: ${error}`);
  }
}

/**
 * Prints a formatted summary of multi-URL scraping results
 */
function printMultiUrlSummary(
  urls: string[],
  results: ScraperResult[],
  summary: { totalUrls: number; totalProducts: number; totalInStock: number; totalOutOfStock: number; totalErrors: number }
): void {
  console.log('\n' + '='.repeat(70));
  console.log('MULTI-URL SCRAPING SUMMARY');
  console.log('='.repeat(70));
  console.log(`URLs Scanned: ${summary.totalUrls}`);
  console.log(`Total Products Found: ${summary.totalProducts}`);
  console.log(`Total In Stock: ${summary.totalInStock}`);
  console.log(`Total Out of Stock: ${summary.totalOutOfStock}`);
  console.log(`Total Errors: ${summary.totalErrors}`);

  console.log('\n' + '-'.repeat(70));
  console.log('RESULTS BY URL:');
  console.log('-'.repeat(70));

  results.forEach((result, index) => {
    console.log(`\n${index + 1}. ${result.sourceUrl}`);
    console.log(`   Products: ${result.totalProducts} | In Stock: ${result.inStock.length} | Out of Stock: ${result.outOfStock.length} | Errors: ${result.errors.length}`);
  });

  // Show all in-stock products across all URLs
  const allInStock = results.flatMap(r => r.inStock);
  if (allInStock.length > 0) {
    console.log('\n' + '-'.repeat(70));
    console.log('ALL IN-STOCK PRODUCTS:');
    console.log('-'.repeat(70));
    allInStock.forEach((product, index) => {
      console.log(`\n${index + 1}. ${product.title}`);
      console.log(`   URL: ${product.url}`);
      console.log(`   Status: ${product.message}`);
      console.log(`   Found on: ${results.find(r => r.inStock.includes(product))?.sourceUrl}`);
    });
  }

  console.log('\n' + '='.repeat(70) + '\n');
}
