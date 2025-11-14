# Quick Start Guide for Your Spreadsheet

Your Google Spreadsheet ID: `1iHolu-3YN0wv9Q7h7hrinJvmE0s5nUJGNz_3e1jdZM0`

## Step-by-Step Setup

### 1. Set Up Google Cloud (One-Time Setup)

#### Create Service Account Credentials:

1. Go to https://console.cloud.google.com/
2. Create a new project or select existing one
3. Enable Google Sheets API:
   - Menu → "APIs & Services" → "Library"
   - Search "Google Sheets API" → Click "Enable"
4. Create Service Account:
   - Menu → "IAM & Admin" → "Service Accounts"
   - Click "CREATE SERVICE ACCOUNT"
   - Name: `nordstrom-scraper`
   - Role: "Editor"
   - Click "Done"
5. Download Credentials:
   - Click on your service account
   - "Keys" tab → "ADD KEY" → "Create new key" → "JSON"
   - Save file as `credentials.json` in project root

### 2. Share Your Spreadsheet

1. Open `credentials.json` and find the `client_email` (looks like: `nordstrom-scraper@your-project.iam.gserviceaccount.com`)
2. Open your spreadsheet: https://docs.google.com/spreadsheets/d/1iHolu-3YN0wv9Q7h7hrinJvmE0s5nUJGNz_3e1jdZM0/edit
3. Click "Share" button
4. Paste the service account email
5. Set permission to "Editor"
6. **Uncheck "Notify people"**
7. Click "Share"

### 3. Handling the Elfster URL (403 Error)

The Elfster URL blocks automated requests. Here's how to work around it:

#### Option A: Save HTML and Scan Locally (Recommended)

1. **Save the Elfster page**:
   - Open https://www.elfster.com/shop/gift-guides/742/ in your browser
   - Right-click anywhere → "Save Page As"
   - Choose "Webpage, HTML Only"
   - Save as `elfster-page.html` in your project root

2. **Scan the saved HTML file**:
   ```bash
   npm run scrape:html ./elfster-page.html \
     --spreadsheet-id 1iHolu-3YN0wv9Q7h7hrinJvmE0s5nUJGNz_3e1jdZM0 \
     --credentials ./credentials.json
   ```

#### Option B: Direct Nordstrom URLs

If you know the Nordstrom product URLs from the Elfster page:

1. **Create/Edit `scraper/urls.txt`**:
   ```
   https://www.nordstrom.com/s/product-url-1
   https://www.nordstrom.com/s/product-url-2
   https://www.nordstrom.com/s/product-url-3
   ```

2. **Run the advanced scraper**:
   ```bash
   npm run scrape:advanced \
     --urls-file scraper/urls.txt \
     --spreadsheet-id 1iHolu-3YN0wv9Q7h7hrinJvmE0s5nUJGNz_3e1jdZM0 \
     --credentials ./credentials.json
   ```

### 4. Adding More URLs

To scan multiple pages that contain Nordstrom links:

1. **Edit `scraper/urls.txt`**:
   ```
   https://www.elfster.com/shop/gift-guides/742/
   https://example.com/holiday-shopping-guide
   https://example.com/nordstrom-deals
   # Add as many URLs as you want
   ```

2. **For URLs that work (no 403 errors)**:
   ```bash
   npm run scrape:advanced \
     --urls-file scraper/urls.txt \
     --spreadsheet-id 1iHolu-3YN0wv9Q7h7hrinJvmE0s5nUJGNz_3e1jdZM0 \
     --credentials ./credentials.json
   ```

3. **For URLs that are blocked (like Elfster)**:
   - Save each page as HTML
   - Scan them one by one with `npm run scrape:html`
   - Or manually extract the Nordstrom product URLs and add them to urls.txt

## Commands Reference

### Scan saved HTML file
```bash
npm run scrape:html ./elfster-page.html
```

### Scan HTML file and export to Google Sheets
```bash
npm run scrape:html ./elfster-page.html \
  --spreadsheet-id 1iHolu-3YN0wv9Q7h7hrinJvmE0s5nUJGNz_3e1jdZM0 \
  --credentials ./credentials.json
```

### Scan multiple URLs from file
```bash
npm run scrape:advanced \
  --urls-file scraper/urls.txt \
  --spreadsheet-id 1iHolu-3YN0wv9Q7h7hrinJvmE0s5nUJGNz_3e1jdZM0 \
  --credentials ./credentials.json
```

### Scan specific URLs from command line
```bash
npm run scrape:advanced \
  --url https://www.nordstrom.com/s/product-1 \
  --url https://www.nordstrom.com/s/product-2 \
  --spreadsheet-id 1iHolu-3YN0wv9Q7h7hrinJvmE0s5nUJGNz_3e1jdZM0 \
  --credentials ./credentials.json
```

### Custom delays (slower, more polite)
```bash
npm run scrape:advanced \
  --urls-file scraper/urls.txt \
  --delay 3000 \
  --url-delay 5000 \
  --spreadsheet-id 1iHolu-3YN0wv9Q7h7hrinJvmE0s5nUJGNz_3e1jdZM0 \
  --credentials ./credentials.json
```

## What You'll See in Your Spreadsheet

The scraper will populate your spreadsheet with:

1. **Summary**:
   - Total URLs scanned
   - Total products found
   - In stock vs out of stock counts
   - Timestamp

2. **In-Stock Products**:
   - Product title
   - Product URL
   - Stock status message
   - Which page it was found on
   - When it was checked

3. **Out-of-Stock Products**:
   - Same details for unavailable products

4. **Detailed Breakdown**:
   - Results organized by source URL

## Troubleshooting

### "The caller does not have permission"
- Make sure you shared the spreadsheet with the service account email
- Check that the permission is set to "Editor"

### "API has not been enabled"
- Go to Google Cloud Console
- Enable the Google Sheets API for your project

### "Invalid credentials"
- Make sure credentials.json is valid
- Try downloading a new credentials file

### 403 Errors from websites
- Save the page as HTML and use `npm run scrape:html`
- Or extract Nordstrom URLs manually and add to urls.txt

## Example Workflow

Here's a complete example workflow:

1. **Save the Elfster page**:
   - Open https://www.elfster.com/shop/gift-guides/742/
   - Save as `elfster-page.html`

2. **Set up credentials** (one-time):
   - Follow steps 1-2 above
   - Save `credentials.json` in project root

3. **Run the scraper**:
   ```bash
   npm run scrape:html ./elfster-page.html \
     --spreadsheet-id 1iHolu-3YN0wv9Q7h7hrinJvmE0s5nUJGNz_3e1jdZM0 \
     --credentials ./credentials.json
   ```

4. **Check your spreadsheet**:
   - Open https://docs.google.com/spreadsheets/d/1iHolu-3YN0wv9Q7h7hrinJvmE0s5nUJGNz_3e1jdZM0/edit
   - View the results!

5. **Add more URLs**:
   - Find more pages with Nordstrom products
   - Add them to `scraper/urls.txt`
   - Re-run the scraper

## Need Help?

- See `scraper/README.md` for detailed documentation
- See `scraper/GOOGLE_SHEETS_GUIDE.md` for Google Sheets setup details
- Run `npm run scrape:help` for CLI help
