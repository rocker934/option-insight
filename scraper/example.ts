/**
 * Example usage of the Nordstrom Product Stock Scraper
 *
 * This file demonstrates how to use the scraper programmatically
 * in your own TypeScript/JavaScript code.
 */

import { scrapeNordstromProducts, ScraperOptions } from './index.js';

/**
 * Example 1: Basic scraping
 */
async function basicExample() {
  console.log('=== Example 1: Basic Scraping ===\n');

  const url = 'https://example.com/nordstrom-product-list';

  try {
    const results = await scrapeNordstromProducts(url);

    console.log(`Found ${results.totalProducts} products`);
    console.log(`In stock: ${results.inStock.length}`);
    console.log(`Out of stock: ${results.outOfStock.length}`);

    // Process in-stock products
    results.inStock.forEach(product => {
      console.log(`✅ ${product.title} - ${product.url}`);
    });

  } catch (error) {
    console.error('Scraping failed:', error);
  }
}

/**
 * Example 2: Custom options
 */
async function customOptionsExample() {
  console.log('\n=== Example 2: Custom Options ===\n');

  const url = 'https://example.com/shopping-guide';

  const options: ScraperOptions = {
    timeout: 60000,  // 60 seconds timeout
    delay: 2000,     // 2 seconds between requests
    userAgent: 'Mozilla/5.0 (compatible; MyBot/1.0)'
  };

  try {
    const results = await scrapeNordstromProducts(url, options);
    return results;
  } catch (error) {
    console.error('Scraping failed:', error);
  }
}

/**
 * Example 3: Filtering and processing results
 */
async function filteringExample() {
  console.log('\n=== Example 3: Filtering Results ===\n');

  const url = 'https://example.com/products';

  try {
    const results = await scrapeNordstromProducts(url);

    // Filter in-stock products by title
    const shoesInStock = results.inStock.filter(product =>
      product.title.toLowerCase().includes('shoe')
    );

    console.log(`Found ${shoesInStock.length} shoes in stock:`);
    shoesInStock.forEach(product => {
      console.log(`- ${product.title}`);
    });

    // Get all product URLs
    const allUrls = [
      ...results.inStock.map(p => p.url),
      ...results.outOfStock.map(p => p.url)
    ];

    return allUrls;

  } catch (error) {
    console.error('Scraping failed:', error);
  }
}

/**
 * Example 4: Monitoring multiple URLs
 */
async function multiUrlExample() {
  console.log('\n=== Example 4: Monitor Multiple URLs ===\n');

  const urls = [
    'https://example.com/blog-post-1',
    'https://example.com/blog-post-2',
    'https://example.com/shopping-guide'
  ];

  const allResults = [];

  for (const url of urls) {
    try {
      console.log(`\nScanning: ${url}`);
      const results = await scrapeNordstromProducts(url, { delay: 1500 });
      allResults.push(results);

      // Wait between URLs
      await new Promise(resolve => setTimeout(resolve, 3000));

    } catch (error) {
      console.error(`Failed to scrape ${url}:`, error);
    }
  }

  // Aggregate results
  const totalProducts = allResults.reduce((sum, r) => sum + r.totalProducts, 0);
  const totalInStock = allResults.reduce((sum, r) => sum + r.inStock.length, 0);

  console.log(`\n=== Aggregate Results ===`);
  console.log(`Total URLs scanned: ${urls.length}`);
  console.log(`Total products found: ${totalProducts}`);
  console.log(`Total in stock: ${totalInStock}`);

  return allResults;
}

/**
 * Example 5: Stock change notifications
 */
async function notificationExample() {
  console.log('\n=== Example 5: Stock Notifications ===\n');

  const url = 'https://example.com/products';

  try {
    const results = await scrapeNordstromProducts(url);

    // Send notifications for in-stock products
    if (results.inStock.length > 0) {
      console.log('\n🔔 STOCK ALERT! The following products are now available:');

      results.inStock.forEach((product, index) => {
        console.log(`\n${index + 1}. ${product.title}`);
        console.log(`   🔗 ${product.url}`);
        console.log(`   ✅ ${product.message}`);

        // Here you could integrate with:
        // - Email service (SendGrid, Mailgun, etc.)
        // - SMS service (Twilio)
        // - Slack webhook
        // - Discord webhook
        // - Push notifications
      });

      // Example: Simple email notification concept
      // await sendEmail({
      //   to: 'user@example.com',
      //   subject: `${results.inStock.length} Nordstrom products back in stock!`,
      //   body: formatEmailBody(results.inStock)
      // });
    } else {
      console.log('No products in stock at this time.');
    }

  } catch (error) {
    console.error('Scraping failed:', error);
  }
}

/**
 * Example 6: Using individual functions
 */
async function individualFunctionsExample() {
  console.log('\n=== Example 6: Using Individual Functions ===\n');

  const { findNordstromProducts, checkNordstromStock } = require('./index');

  const url = 'https://example.com/products';

  try {
    // Step 1: Find all product links
    const productUrls = await findNordstromProducts(url);
    console.log(`Found ${productUrls.length} Nordstrom product links`);

    // Step 2: Check specific products (e.g., just the first 3)
    const productsToCheck = productUrls.slice(0, 3);

    for (const productUrl of productsToCheck) {
      const status = await checkNordstromStock(productUrl);
      console.log(`\n${status.title}`);
      console.log(`Status: ${status.status}`);
      console.log(`Message: ${status.message}`);

      // Add delay between checks
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

// To run examples, uncomment the function you want to run and execute:
// tsx scraper/example.ts

// Uncomment one of these to run:
// basicExample();
// customOptionsExample();
// filteringExample();
// multiUrlExample();
// notificationExample();
// individualFunctionsExample();

// Export for use in other modules
export {
  basicExample,
  customOptionsExample,
  filteringExample,
  multiUrlExample,
  notificationExample,
  individualFunctionsExample
};
