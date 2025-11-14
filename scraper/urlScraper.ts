import axios from 'axios';
import * as cheerio from 'cheerio';
import { ScraperOptions } from './types.js';

/**
 * Extracts all Nordstrom product URLs from a given webpage
 * @param url - The URL to scrape for Nordstrom product links
 * @param options - Scraper configuration options
 * @returns Array of unique Nordstrom product URLs
 */
export async function findNordstromProducts(
  url: string,
  options: ScraperOptions = {}
): Promise<string[]> {
  const {
    timeout = 30000,
    userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
  } = options;

  try {
    console.log(`Fetching URL: ${url}`);

    const response = await axios.get(url, {
      timeout,
      headers: {
        'User-Agent': userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Cache-Control': 'max-age=0'
      }
    });

    const $ = cheerio.load(response.data);
    const nordstromLinks = new Set<string>();

    // Find all links (a tags with href)
    $('a[href]').each((_, element) => {
      const href = $(element).attr('href');
      if (href) {
        // Check if the link is a Nordstrom product URL
        if (isNordstromProductUrl(href)) {
          // Normalize the URL
          const normalizedUrl = normalizeUrl(href);
          nordstromLinks.add(normalizedUrl);
        }
      }
    });

    console.log(`Found ${nordstromLinks.size} unique Nordstrom product links`);
    return Array.from(nordstromLinks);

  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch URL: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Checks if a URL is a Nordstrom product URL
 */
function isNordstromProductUrl(url: string): boolean {
  // Check for nordstrom.com domain and typical product URL patterns
  const nordstromPattern = /nordstrom\.com.*\/s\//i;
  const productPattern = /nordstrom\.com.*\/product/i;

  return nordstromPattern.test(url) || productPattern.test(url);
}

/**
 * Normalizes a URL to ensure consistency
 */
function normalizeUrl(url: string): string {
  try {
    // If it's a relative URL, we can't fully normalize it without a base
    if (url.startsWith('http://') || url.startsWith('https://')) {
      const urlObj = new URL(url);
      // Remove query parameters and fragments for cleaner URLs (optional)
      // return `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}`;
      return urlObj.href;
    }
    // Return as-is if it's already a full URL or handle relative URLs
    return url.startsWith('//') ? `https:${url}` : url;
  } catch {
    return url;
  }
}
