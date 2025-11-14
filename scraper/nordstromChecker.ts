import axios from 'axios';
import * as cheerio from 'cheerio';
import { ProductStatus, ScraperOptions } from './types';

/**
 * Checks the stock status of a Nordstrom product
 * @param productUrl - The Nordstrom product URL to check
 * @param options - Scraper configuration options
 * @returns Product status information
 */
export async function checkNordstromStock(
  productUrl: string,
  options: ScraperOptions = {}
): Promise<ProductStatus> {
  const {
    timeout = 30000,
    userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  } = options;

  try {
    console.log(`Checking stock for: ${productUrl}`);

    const response = await axios.get(productUrl, {
      timeout,
      headers: {
        'User-Agent': userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      }
    });

    const $ = cheerio.load(response.data);

    // Extract product title
    const title = extractProductTitle($);

    // Check for stock status indicators
    const stockStatus = determineStockStatus($);

    return {
      url: productUrl,
      title,
      status: stockStatus.status,
      message: stockStatus.message,
      timestamp: new Date()
    };

  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        url: productUrl,
        title: 'Error fetching product',
        status: 'error',
        message: `Failed to fetch product: ${error.message}`,
        timestamp: new Date()
      };
    }
    return {
      url: productUrl,
      title: 'Unknown error',
      status: 'error',
      message: `Unknown error: ${error}`,
      timestamp: new Date()
    };
  }
}

/**
 * Extracts the product title from the page
 */
function extractProductTitle($: cheerio.CheerioAPI): string {
  // Try multiple selectors for product title
  const selectors = [
    'h1[data-test="product-title"]',
    'h1.product-title',
    'h1[itemprop="name"]',
    'meta[property="og:title"]',
    'title',
    'h1'
  ];

  for (const selector of selectors) {
    const element = $(selector).first();
    if (element.length > 0) {
      const text = selector === 'meta[property="og:title"]'
        ? element.attr('content')
        : element.text().trim();
      if (text) {
        return text;
      }
    }
  }

  return 'Product title not found';
}

/**
 * Determines the stock status based on page content
 */
function determineStockStatus($: cheerio.CheerioAPI): { status: 'in_stock' | 'out_of_stock'; message: string } {
  const pageText = $('body').text().toLowerCase();
  const html = $.html().toLowerCase();

  // Check for "Add to Bag" or "Buy Now" button (in stock indicators)
  const addToBagButton = $('button:contains("Add to Bag"), button:contains("add to bag"), button:contains("Buy Now"), button:contains("buy now")');

  // Check for out of stock indicators
  const outOfStockIndicators = [
    'out of stock',
    'sold out',
    'currently unavailable',
    'no longer available',
    'notify me when available',
    'waitlist',
    'back in stock'
  ];

  const isOutOfStock = outOfStockIndicators.some(indicator =>
    pageText.includes(indicator) || html.includes(indicator)
  );

  // Check for disabled or unavailable add to bag button
  const addToBagDisabled = addToBagButton.is(':disabled') ||
                           addToBagButton.attr('disabled') !== undefined ||
                           addToBagButton.hasClass('disabled');

  // Look for specific data attributes or classes that indicate stock status
  const stockStatusElement = $('[data-stock-status], [data-availability], .stock-status, .availability');
  if (stockStatusElement.length > 0) {
    const stockText = stockStatusElement.text().toLowerCase();
    const stockData = stockStatusElement.attr('data-stock-status')?.toLowerCase() ||
                      stockStatusElement.attr('data-availability')?.toLowerCase() || '';

    if (stockText.includes('out of stock') || stockData.includes('out of stock') ||
        stockText.includes('sold out') || stockData.includes('sold out')) {
      return {
        status: 'out_of_stock',
        message: 'Product is out of stock'
      };
    }
  }

  // Determine final status
  if (isOutOfStock || addToBagDisabled) {
    return {
      status: 'out_of_stock',
      message: 'Product is out of stock'
    };
  }

  if (addToBagButton.length > 0 && !addToBagDisabled) {
    return {
      status: 'in_stock',
      message: 'Product is in stock - Buy Now button available'
    };
  }

  // Default to in stock if we find typical product page elements
  const hasProductElements = $('[data-test="product-price"], .price, [itemprop="price"]').length > 0;
  if (hasProductElements && !isOutOfStock) {
    return {
      status: 'in_stock',
      message: 'Product appears to be available'
    };
  }

  // If we can't determine, assume out of stock for safety
  return {
    status: 'out_of_stock',
    message: 'Stock status unclear - may be out of stock'
  };
}

/**
 * Adds a delay between requests to avoid rate limiting
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
