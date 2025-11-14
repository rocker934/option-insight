# Google Sheets Export Guide

This guide will help you set up Google Sheets export for your Nordstrom product scraping results.

## Complete Setup Process

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" at the top
3. Click "NEW PROJECT"
4. Enter a project name (e.g., "Nordstrom Scraper")
5. Click "CREATE"
6. Wait for the project to be created (you'll see a notification)

### Step 2: Enable Google Sheets API

1. Make sure your new project is selected at the top
2. Click the hamburger menu (☰) on the left
3. Navigate to "APIs & Services" > "Library"
4. Search for "Google Sheets API"
5. Click on "Google Sheets API"
6. Click "ENABLE"

### Step 3: Create Service Account

1. Click the hamburger menu (☰) on the left
2. Navigate to "IAM & Admin" > "Service Accounts"
3. Click "CREATE SERVICE ACCOUNT" at the top
4. Enter service account details:
   - Name: `nordstrom-scraper-sa` (or any name you prefer)
   - Description: "Service account for Nordstrom product scraper"
5. Click "CREATE AND CONTINUE"
6. For the role, select "Editor" (or "Basic" > "Editor")
7. Click "CONTINUE"
8. Skip the optional third step, click "DONE"

### Step 4: Create and Download Credentials

1. Find your newly created service account in the list
2. Click on the service account email
3. Go to the "KEYS" tab at the top
4. Click "ADD KEY" > "Create new key"
5. Select "JSON" as the key type
6. Click "CREATE"
7. A JSON file will be downloaded automatically
8. **IMPORTANT**: Save this file securely. Rename it to something like `credentials.json`
9. Move it to your project directory (you can put it in the root of `option-insight/`)

### Step 5: Create Your Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Click the "+ Blank" button to create a new spreadsheet
3. Give it a name (e.g., "Nordstrom Stock Tracker")
4. Copy the Spreadsheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit
   ```
   The SPREADSHEET_ID is the long string between `/d/` and `/edit`

   Example:
   ```
   https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
   ```
   The ID is: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`

### Step 6: Share Spreadsheet with Service Account

1. In your Google Spreadsheet, click the "Share" button (top right)
2. Open the `credentials.json` file you downloaded
3. Find the `client_email` field - it will look like:
   ```json
   "client_email": "nordstrom-scraper-sa@your-project.iam.gserviceaccount.com"
   ```
4. Copy this email address
5. Paste it into the "Add people and groups" field in the Share dialog
6. Make sure the permission is set to "Editor"
7. **IMPORTANT**: Uncheck "Notify people" (the service account doesn't need an email notification)
8. Click "Share" or "Done"

## Usage Examples

### Example 1: Basic Multi-URL Scan with Google Sheets Export

1. Edit `scraper/urls.txt` with your URLs:
   ```
   https://www.elfster.com/shop/gift-guides/742/
   https://example.com/nordstrom-deals
   https://example.com/holiday-gifts
   ```

2. Run the scraper:
   ```bash
   npm run scrape:advanced \
     --urls-file scraper/urls.txt \
     --spreadsheet-id 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms \
     --credentials ./credentials.json
   ```

### Example 2: Single URL with Export

```bash
npm run scrape:advanced \
  --url https://www.elfster.com/shop/gift-guides/742/ \
  --spreadsheet-id YOUR_SPREADSHEET_ID \
  --credentials ./credentials.json
```

### Example 3: Multiple URLs from Command Line

```bash
npm run scrape:advanced \
  --url https://example.com/page1 \
  --url https://example.com/page2 \
  --url https://example.com/page3 \
  --spreadsheet-id YOUR_SPREADSHEET_ID \
  --credentials ./credentials.json \
  --delay 2000 \
  --url-delay 5000
```

### Example 4: For Your Specific Case

Since you mentioned the Elfster URL, here's how to use it:

1. Create `scraper/urls.txt`:
   ```
   https://www.elfster.com/shop/gift-guides/742/
   # Add more URLs below as you find them
   ```

2. Run:
   ```bash
   npm run scrape:advanced \
     --urls-file scraper/urls.txt \
     --spreadsheet-id YOUR_SPREADSHEET_ID \
     --credentials ./credentials.json \
     --delay 2000
   ```

## What Gets Exported

The Google Sheet will contain:

1. **Summary Section**:
   - Total URLs scanned
   - Total products found
   - Total in stock
   - Total out of stock
   - Scan timestamp

2. **In-Stock Products Table**:
   - Product number
   - Product title
   - Product URL
   - Stock status message
   - Source URL where it was found
   - Timestamp

3. **Out-of-Stock Products Table**:
   - Same format as in-stock table

4. **Detailed Results by URL**:
   - Breakdown of results for each scanned URL

## Troubleshooting

### Error: "The caller does not have permission"

- Make sure you shared the spreadsheet with the service account email
- Check that the permission is set to "Editor"
- Verify the spreadsheet ID is correct

### Error: "Unable to parse range"

- The spreadsheet might not have a "Sheet1"
- Create a sheet named "Sheet1" or let the scraper create it

### Error: "Access not granted or expired"

- Make sure the Google Sheets API is enabled in your project
- Verify the credentials.json file is valid and not corrupted

### Error: "Invalid grant"

- The service account credentials might be incorrect
- Try creating a new service account and downloading new credentials

## Security Best Practices

1. **Never commit credentials.json to git**:
   - Add `credentials.json` to your `.gitignore` file
   - Keep the file in a secure location

2. **Use different service accounts** for different projects

3. **Regularly review** service account permissions

4. **Delete unused** service accounts and keys

## Alternative: Manual CSV Export

If you prefer not to use Google Sheets API, you can:

1. Run the scraper without the `--spreadsheet-id` option
2. Copy the console output
3. Manually paste into Google Sheets or Excel

## Getting Help

If you encounter issues:

1. Check the error message carefully
2. Verify all steps were completed
3. Make sure the service account email is correct
4. Ensure the spreadsheet is shared properly
5. Check that the Google Sheets API is enabled

For more information, see the main [README.md](./README.md)
