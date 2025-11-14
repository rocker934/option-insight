#!/usr/bin/env node

/**
 * Scan a local HTML file and export to Google Sheets
 * Use this when websites block automated requests (403 errors)
 */

import { scanHtmlFile } from './htmlFileScanner.js';
import { exportToGoogleSheets } from './sheetsExporter.js';

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.log(`
Scan Local HTML File and Export to Google Sheets
=================================================

Usage:
  tsx scraper/scanHtmlWithSheets.ts <HTML_FILE> [OPTIONS]

Arguments:
  HTML_FILE                 Path to the HTML file to scan

Options:
  --spreadsheet-id <ID>     Google Spreadsheet ID
  --credentials <PATH>      Path to Google API credentials JSON
  --delay <MS>              Delay between product checks (default: 1500)

Example:
  # Scan HTML file only
  tsx scraper/scanHtmlWithSheets.ts ./elfster-page.html

  # Scan and export to Google Sheets
  tsx scraper/scanHtmlWithSheets.ts ./elfster-page.html \\
    --spreadsheet-id 1iHolu-3YN0wv9Q7h7hrinJvmE0s5nUJGNz_3e1jdZM0 \\
    --credentials ./credentials.json

How to Save HTML:
  1. Open the webpage in your browser
  2. Right-click anywhere on the page
  3. Select "Save Page As" or "Save As"
  4. Choose "Webpage, HTML Only" or "HTML File"
  5. Save it to your project directory
  6. Run this script with the saved file path
    `);
    process.exit(0);
  }

  const htmlFile = args[0];
  let spreadsheetId: string | undefined;
  let credentials: string | undefined;
  let delay = 1500;

  // Parse arguments
  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case '--spreadsheet-id':
        spreadsheetId = args[++i];
        break;
      case '--credentials':
        credentials = args[++i];
        break;
      case '--delay':
        delay = parseInt(args[++i], 10);
        break;
    }
  }

  try {
    // Scan the HTML file
    console.log(`\nScanning HTML file: ${htmlFile}\n`);
    const results = await scanHtmlFile(htmlFile, { delay });

    // Export to Google Sheets if requested
    if (spreadsheetId) {
      if (!credentials) {
        console.error('\n❌ Error: --credentials required for Google Sheets export');
        process.exit(1);
      }

      console.log('\n📤 Exporting results to Google Sheets...');
      await exportToGoogleSheets(spreadsheetId, results, credentials);
    }

    console.log('\n✅ Completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Failed:', error);
    process.exit(1);
  }
}

main();
