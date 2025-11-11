# Instagram Profile Scraper - Quick Start Guide

## Overview

This Instagram Profile Scraper allows you to extract comprehensive profile data from Instagram accounts using cookie-based authentication. It supports both single and batch profile scraping with built-in rate limiting and error handling.

## Prerequisites

- Node.js (v18 or higher)
- An active Instagram account
- Instagram session ID (cookie)

## Quick Setup (5 minutes)

### Step 1: Get Your Session ID

1. Open your browser and go to [Instagram.com](https://www.instagram.com)
2. Log in to your account
3. Press `F12` to open Developer Tools
4. Click on the **Application** tab (Chrome) or **Storage** tab (Firefox)
5. Expand **Cookies** → `https://www.instagram.com`
6. Find and copy the value of the `sessionid` cookie

### Step 2: Configure the Scraper

```bash
# Create environment file
cp .env.example .env

# Edit .env and add your session ID
# Replace 'your_session_id_here' with your actual session ID
```

### Step 3: Install Dependencies (if not already done)

```bash
npm install
```

## Usage Methods

### Method 1: Command Line Script (Recommended for Beginners)

Scrape a single profile directly from the command line:

```bash
# Set your session ID and scrape a profile
INSTAGRAM_SESSION_ID=your_session_id npm run scrape -- instagram

# Or use the .env file
npm run scrape -- username
```

**Output:** Results will be saved to the `output/` directory as JSON files.

### Method 2: API Server

Start a REST API server for more complex integrations:

```bash
# Start the server
npm run server

# Or with auto-reload for development
npm run server:dev
```

#### API Examples

**Scrape a single profile:**
```bash
curl -X POST http://localhost:3001/api/scraper/profile \
  -H "Content-Type: application/json" \
  -d '{
    "username": "instagram",
    "sessionId": "your_session_id"
  }'
```

**Scrape multiple profiles:**
```bash
curl -X POST http://localhost:3001/api/scraper/profiles \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["instagram", "natgeo", "nasa"],
    "sessionId": "your_session_id",
    "delayMs": 2000
  }'
```

### Method 3: Programmatic Usage

Use the scraper in your own TypeScript/JavaScript code:

```typescript
import { InstagramScraper } from './server/scrapers/instagramScraper';

const scraper = new InstagramScraper({
  sessionId: 'your_session_id',
});

// Scrape single profile
const profile = await scraper.scrapeProfile('instagram');
console.log(profile);

// Scrape multiple profiles with 3-second delays
const profiles = await scraper.scrapeMultipleProfiles(
  ['instagram', 'natgeo', 'nasa'],
  3000
);
```

## Data Fields Extracted

### Basic Information
- `profileName` - Username
- `fullName` - Display name
- `bio` - Biography text
- `imageUrl` - Profile picture URL (HD)
- `profileUrl` - Full Instagram URL
- `instagramID` - Unique Instagram ID

### Statistics
- `followersCount` - Number of followers
- `followingCount` - Number of following
- `postsCount` - Number of posts
- `mutualFollowersCount` - Mutual followers with your account

### Account Status
- `isVerified` - Verified badge status
- `isPrivate` - Private account
- `isBusinessAccount` - Business account
- `joinedRecently` - Recently joined flag

### Relationship Data
- `followedByViewer` - You follow this account
- `followsViewer` - This account follows you
- `blockedByViewer` - You blocked this account
- `requestedByViewer` - You requested to follow

### Business Information
- `website` - External website link
- `publicEmail` - Public email address
- `phoneNumber` - Business phone number
- `businessCity` - Business location
- `category` - Account category
- `businessCategory` - Business category name

### Additional
- `mailFound` - Email extracted from bio
- `timestamp` - Scrape timestamp
- `error` - Error message (if any)

## Example Output

```json
{
  "error": null,
  "query": "instagram",
  "timestamp": "2025-11-11T10:30:00.000Z",
  "profileUrl": "https://www.instagram.com/instagram/",
  "profileName": "instagram",
  "fullName": "Instagram",
  "bio": "Discover what's next on Instagram 📷",
  "blockedByViewer": false,
  "followersCount": 650000000,
  "followingCount": 75,
  "followedByViewer": false,
  "followsViewer": false,
  "instagramID": "25025320",
  "isBusinessAccount": true,
  "joinedRecently": false,
  "category": "App",
  "businessCategory": "App",
  "phoneNumber": "",
  "isPrivate": false,
  "isVerified": true,
  "mutualFollowersCount": 0,
  "imageUrl": "https://instagram.com/profiles/...",
  "requestedByViewer": false,
  "postsCount": 7500,
  "website": "https://about.instagram.com",
  "mailFound": "",
  "businessCity": "",
  "publicEmail": ""
}
```

## Best Practices

### Rate Limiting
- Use 2-3 second delays between requests
- Don't scrape more than 50-100 profiles per session
- If you get rate limited, wait 15-30 minutes

### Session ID Management
- Session IDs expire periodically (every few weeks)
- Store your session ID securely (use .env file)
- Never commit .env to version control
- Get a fresh session ID if authentication fails

### Error Handling
The scraper includes comprehensive error handling:
- **404**: Profile not found
- **401/403**: Authentication failed (session expired)
- **429**: Rate limit exceeded
- Network errors and timeouts

### Privacy & Ethics
- Only scrape public data
- Respect Instagram's Terms of Service
- Don't use for spam or harassment
- Be mindful of rate limits
- Use for research/educational purposes only

## Troubleshooting

### Common Issues

**"Authentication failed"**
- Your session ID has expired
- Get a new session ID from your browser
- Make sure you're logged into Instagram

**"Rate limit exceeded"**
- You're making too many requests
- Wait 15-30 minutes
- Increase delay between requests
- Try with a different IP/account

**"Profile not found"**
- Check the username spelling
- The account may be deleted or suspended
- The account may be private and blocking you

**"No response received"**
- Check your internet connection
- Instagram may be down
- Try again in a few minutes

### Server Won't Start
```bash
# Check if port 3001 is already in use
lsof -i :3001

# Use a different port
PORT=3002 npm run server
```

## Advanced Configuration

### Custom User Agent
```typescript
const scraper = new InstagramScraper({
  sessionId: 'your_session_id',
  userAgent: 'Custom User Agent String',
});
```

### Custom Timeout
```typescript
const scraper = new InstagramScraper({
  sessionId: 'your_session_id',
  timeout: 60000, // 60 seconds
});
```

## File Locations

- **Server code**: `server/`
- **Scraper logic**: `server/scrapers/instagramScraper.ts`
- **API routes**: `server/routes/scraper.ts`
- **Example script**: `server/utils/example.ts`
- **Output files**: `output/`
- **Configuration**: `.env`

## Need Help?

1. Check the main [README.md](README.md) for full documentation
2. Review the example script at `server/utils/example.ts`
3. Look at the TypeScript interfaces in `server/types/instagram.ts`
4. Check Instagram's API documentation for field meanings

## Legal Notice

This tool is provided for educational and research purposes only. Users are responsible for:
- Complying with Instagram's Terms of Service
- Respecting privacy and data protection laws
- Using the tool ethically and responsibly
- Not engaging in spam, harassment, or abuse

The developers assume no liability for misuse of this tool.
