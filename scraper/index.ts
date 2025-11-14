import { findNordstromProducts } from './urlScraper';
import { checkNordstromStock, delay } from './nordstromChecker';
import { ScraperResult, ScraperOptions } from './types';

/**
 * Main scraper function that finds and checks Nordstrom products
 * @param url - The URL to scrape for Nordstrom product links
 * @param options - Scraper configuration options
 * @returns Complete scraper results with stock status for all products
 */
export async function scrapeNordstromProducts(
  url: string,
  options: ScraperOptions = {}
): Promise<ScraperResult> {
  const startTime = new Date();
  const { delay: delayMs = 1000 } = options;

  console.log('\n=== Nordstrom Product Stock Scraper ===\n');
  console.log(`Source URL: ${url}`);
  console.log(`Started at: ${startTime.toISOString()}\n`);

  // Step 1: Find all Nordstrom product links
  console.log('Step 1: Finding Nordstrom product links...');
  const productUrls = await findNordstromProducts(url, options);

  if (productUrls.length === 0) {
    console.log('\nNo Nordstrom product links found on this page.');
    return {
      sourceUrl: url,
      totalProducts: 0,
      inStock: [],
      outOfStock: [],
      errors: [],
      scannedAt: startTime
    };
  }

  console.log(`\nStep 2: Checking stock status for ${productUrls.length} products...\n`);

  // Step 2: Check stock status for each product
  const results: ScraperResult = {
    sourceUrl: url,
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

    // Add delay between requests to be respectful to the server
    if (i < productUrls.length - 1) {
      await delay(delayMs);
    }
  }

  // Print summary
  printSummary(results);

  return results;
}

/**
 * Prints a formatted summary of the scraping results
 */
function printSummary(results: ScraperResult): void {
  console.log('\n' + '='.repeat(60));
  console.log('SCRAPING SUMMARY');
  console.log('='.repeat(60));
  console.log(`Source URL: ${results.sourceUrl}`);
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

  if (results.errors.length > 0) {
    console.log('\n' + '-'.repeat(60));
    console.log('ERRORS:');
    console.log('-'.repeat(60));
    results.errors.forEach((product, index) => {
      console.log(`${index + 1}. ${product.url}`);
      console.log(`   Error: ${product.message}`);
      console.log('');
    });
  }

  console.log('='.repeat(60) + '\n');
}

// Export all functions
export * from './types';
export * from './urlScraper';
export * from './nordstromChecker';

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: ts-node scraper/index.ts <URL>');
    console.error('Example: ts-node scraper/index.ts https://example.com');
    process.exit(1);
  }

  const url = args[0];
  const delayMs = args[1] ? parseInt(args[1], 10) : 1000;

  scrapeNordstromProducts(url, { delay: delayMs })
    .then(() => {
      console.log('Scraping completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Scraping failed:', error);
      process.exit(1);
    });
}
