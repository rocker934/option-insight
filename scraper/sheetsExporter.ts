import { google } from 'googleapis';
import { MultiUrlResult } from './multiUrlScanner.js';
import { ScraperResult } from './types.js';

/**
 * Export scraping results to Google Sheets
 * @param spreadsheetId - The ID of the Google Spreadsheet
 * @param results - The scraping results to export
 * @param credentialsPath - Path to Google API credentials JSON file
 */
export async function exportToGoogleSheets(
  spreadsheetId: string,
  results: MultiUrlResult | ScraperResult,
  credentialsPath: string
): Promise<void> {
  try {
    // Load credentials
    const auth = await authorize(credentialsPath);
    const sheets = google.sheets({ version: 'v4', auth });

    // Prepare data
    const data = isMultiUrlResult(results)
      ? prepareMultiUrlData(results)
      : prepareSingleUrlData(results);

    // Clear existing data
    await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range: 'Sheet1!A:Z',
    });

    // Write headers and data
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Sheet1!A1',
      valueInputOption: 'RAW',
      requestBody: {
        values: data,
      },
    });

    console.log(`\n✅ Results exported to Google Sheets successfully!`);
    console.log(`   Spreadsheet ID: ${spreadsheetId}`);
    console.log(`   View at: https://docs.google.com/spreadsheets/d/${spreadsheetId}`);
  } catch (error) {
    console.error('\n❌ Failed to export to Google Sheets:', error);
    throw error;
  }
}

/**
 * Authorizes with Google API using service account credentials
 */
async function authorize(credentialsPath: string) {
  const { promises: fs } = await import('fs');
  const credentials = JSON.parse(await fs.readFile(credentialsPath, 'utf-8'));

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return auth;
}

/**
 * Checks if the result is a MultiUrlResult
 */
function isMultiUrlResult(result: MultiUrlResult | ScraperResult): result is MultiUrlResult {
  return 'results' in result && 'summary' in result;
}

/**
 * Prepares data for a single URL result
 */
function prepareSingleUrlData(result: ScraperResult): string[][] {
  const data: string[][] = [];

  // Title
  data.push(['Nordstrom Product Stock Check Results']);
  data.push(['']);

  // Summary
  data.push(['Summary']);
  data.push(['Source URL', result.sourceUrl]);
  data.push(['Scanned At', result.scannedAt.toISOString()]);
  data.push(['Total Products', result.totalProducts.toString()]);
  data.push(['In Stock', result.inStock.length.toString()]);
  data.push(['Out of Stock', result.outOfStock.length.toString()]);
  data.push(['Errors', result.errors.length.toString()]);
  data.push(['']);

  // In Stock Products
  if (result.inStock.length > 0) {
    data.push(['In Stock Products']);
    data.push(['#', 'Product Title', 'URL', 'Status', 'Checked At']);
    result.inStock.forEach((product, index) => {
      data.push([
        (index + 1).toString(),
        product.title,
        product.url,
        product.message,
        product.timestamp.toISOString()
      ]);
    });
    data.push(['']);
  }

  // Out of Stock Products
  if (result.outOfStock.length > 0) {
    data.push(['Out of Stock Products']);
    data.push(['#', 'Product Title', 'URL', 'Status', 'Checked At']);
    result.outOfStock.forEach((product, index) => {
      data.push([
        (index + 1).toString(),
        product.title,
        product.url,
        product.message,
        product.timestamp.toISOString()
      ]);
    });
    data.push(['']);
  }

  // Errors
  if (result.errors.length > 0) {
    data.push(['Errors']);
    data.push(['#', 'Product Title', 'URL', 'Error Message', 'Checked At']);
    result.errors.forEach((product, index) => {
      data.push([
        (index + 1).toString(),
        product.title,
        product.url,
        product.message,
        product.timestamp.toISOString()
      ]);
    });
  }

  return data;
}

/**
 * Prepares data for multiple URL results
 */
function prepareMultiUrlData(multiResult: MultiUrlResult): string[][] {
  const data: string[][] = [];

  // Title
  data.push(['Nordstrom Product Stock Check Results - Multiple URLs']);
  data.push(['']);

  // Overall Summary
  data.push(['Overall Summary']);
  data.push(['Scanned At', multiResult.scannedAt.toISOString()]);
  data.push(['Total URLs', multiResult.summary.totalUrls.toString()]);
  data.push(['Total Products', multiResult.summary.totalProducts.toString()]);
  data.push(['Total In Stock', multiResult.summary.totalInStock.toString()]);
  data.push(['Total Out of Stock', multiResult.summary.totalOutOfStock.toString()]);
  data.push(['Total Errors', multiResult.summary.totalErrors.toString()]);
  data.push(['']);

  // All In-Stock Products (consolidated)
  const allInStock = multiResult.results.flatMap(r =>
    r.inStock.map(product => ({ ...product, sourceUrl: r.sourceUrl }))
  );

  if (allInStock.length > 0) {
    data.push(['All In-Stock Products']);
    data.push(['#', 'Product Title', 'Product URL', 'Status', 'Found On', 'Checked At']);
    allInStock.forEach((product, index) => {
      data.push([
        (index + 1).toString(),
        product.title,
        product.url,
        product.message,
        product.sourceUrl,
        product.timestamp.toISOString()
      ]);
    });
    data.push(['']);
  }

  // All Out-of-Stock Products (consolidated)
  const allOutOfStock = multiResult.results.flatMap(r =>
    r.outOfStock.map(product => ({ ...product, sourceUrl: r.sourceUrl }))
  );

  if (allOutOfStock.length > 0) {
    data.push(['All Out-of-Stock Products']);
    data.push(['#', 'Product Title', 'Product URL', 'Status', 'Found On', 'Checked At']);
    allOutOfStock.forEach((product, index) => {
      data.push([
        (index + 1).toString(),
        product.title,
        product.url,
        product.message,
        product.sourceUrl,
        product.timestamp.toISOString()
      ]);
    });
    data.push(['']);
  }

  // Per-URL Details
  data.push(['Detailed Results by URL']);
  data.push(['']);

  multiResult.results.forEach((result, urlIndex) => {
    data.push([`URL ${urlIndex + 1}: ${result.sourceUrl}`]);
    data.push(['Total Products', result.totalProducts.toString()]);
    data.push(['In Stock', result.inStock.length.toString()]);
    data.push(['Out of Stock', result.outOfStock.length.toString()]);
    data.push(['Errors', result.errors.length.toString()]);
    data.push(['']);
  });

  return data;
}
