# Option Insight

A comprehensive financial market analysis application built with React, TypeScript, and Vite, featuring an advanced Instagram Profile Scraper.

## Features

- Real-time market data visualization
- Portfolio tracking and analysis
- Options strategy analysis
- Market trends and news
- Asset allocation tracking
- Market screener
- API integration capabilities
- Data mapping tools
- **Instagram Profile Scraper** - Extract comprehensive profile data from Instagram

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide Icons

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/rocker934/option-insight.git
cd option-insight
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
option-insight/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── providers/     # Context providers
│   └── lib/          # Utility functions
├── server/           # Instagram scraper backend
│   ├── scrapers/     # Scraper implementations
│   ├── routes/       # API routes
│   ├── types/        # TypeScript interfaces
│   └── utils/        # Utility scripts
├── public/           # Static assets
└── index.html        # Entry HTML file
```

---

# Instagram Profile Scraper

A powerful Instagram profile scraper that extracts comprehensive profile information using cookie-based authentication.

## Scraper Features

The scraper extracts the following data from Instagram profiles:

### Profile Information
- Profile URL
- Username (profileName)
- Full Name
- Biography
- Profile Picture URL (high resolution)
- Instagram ID
- Verification status
- Account type (Business/Personal)
- Privacy status

### Statistics
- Followers count
- Following count
- Posts count
- Mutual followers count

### Relationship Data
- Blocked by viewer
- Followed by viewer
- Follows viewer
- Requested by viewer
- Joined recently status

### Business Information
- Business account status
- Business category
- Category name
- Phone number
- Business city
- Public email
- Website

### Additional Features
- Email extraction from bio
- Error handling and validation
- Rate limiting protection
- Timestamp tracking
- Multi-profile scraping with delays

## Getting Started with the Scraper

### 1. Get Your Instagram Session ID

To use the scraper, you need your Instagram session ID:

1. Open Instagram in your browser and log in
2. Open Developer Tools (Press F12 or right-click → Inspect)
3. Go to the **Application** tab (Chrome) or **Storage** tab (Firefox)
4. Navigate to **Cookies** → `https://www.instagram.com`
5. Find the cookie named `sessionid` and copy its value

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your session ID:

```env
PORT=3001
INSTAGRAM_SESSION_ID=your_actual_session_id_here
```

### 3. Usage Options

#### Option A: Run the Example Script (Simplest)

```bash
# Scrape a single profile
INSTAGRAM_SESSION_ID=your_session_id npm run scrape -- instagram

# The data will be saved to output/ directory
```

#### Option B: Start the API Server

```bash
# Start the server
npm run server

# Or with auto-reload during development
npm run server:dev
```

The server will start on `http://localhost:3001`

#### Option C: Use the API Endpoints

Once the server is running, you can make API requests:

**Scrape a single profile:**

```bash
curl -X POST http://localhost:3001/api/scraper/profile \
  -H "Content-Type: application/json" \
  -d '{
    "username": "instagram",
    "sessionId": "your_session_id_here"
  }'
```

**Scrape multiple profiles:**

```bash
curl -X POST http://localhost:3001/api/scraper/profiles \
  -H "Content-Type: application/json" \
  -d '{
    "usernames": ["instagram", "natgeo", "nasa"],
    "sessionId": "your_session_id_here",
    "delayMs": 2000
  }'
```

**Health check:**

```bash
curl http://localhost:3001/api/scraper/health
```

## API Endpoints

### POST `/api/scraper/profile`

Scrape a single Instagram profile.

**Request Body:**
```json
{
  "username": "instagram_username",
  "sessionId": "your_session_id"
}
```

**Response:**
```json
{
  "error": null,
  "query": "instagram",
  "timestamp": "2025-11-11T10:00:00.000Z",
  "profileUrl": "https://www.instagram.com/instagram/",
  "profileName": "instagram",
  "fullName": "Instagram",
  "bio": "Discover what's next on Instagram 📷",
  "followersCount": 650000000,
  "followingCount": 75,
  "postsCount": 7500,
  "isVerified": true,
  "isPrivate": false,
  "isBusinessAccount": true,
  "imageUrl": "https://...",
  ...
}
```

### POST `/api/scraper/profiles`

Scrape multiple Instagram profiles with rate limiting.

**Request Body:**
```json
{
  "usernames": ["username1", "username2"],
  "sessionId": "your_session_id",
  "delayMs": 2000
}
```

**Response:**
```json
{
  "count": 2,
  "profiles": [...]
}
```

### GET `/api/scraper/health`

Check if the scraper API is running.

## Programmatic Usage

You can also use the scraper directly in your TypeScript/JavaScript code:

```typescript
import { InstagramScraper } from './server/scrapers/instagramScraper';

const scraper = new InstagramScraper({
  sessionId: 'your_session_id',
});

// Scrape a single profile
const profile = await scraper.scrapeProfile('instagram');
console.log(profile);

// Scrape multiple profiles
const profiles = await scraper.scrapeMultipleProfiles(
  ['instagram', 'natgeo', 'nasa'],
  2000 // 2 second delay between requests
);
console.log(profiles);
```

## Output Format

All scraped data is returned in the following format:

```typescript
interface InstagramProfileData {
  error: string | null;
  query: string;
  timestamp: string;
  profileUrl: string;
  profileName: string;
  fullName: string;
  bio: string;
  blockedByViewer: boolean;
  followersCount: number;
  followingCount: number;
  followedByViewer: boolean;
  followsViewer: boolean;
  instagramID: string;
  isBusinessAccount: boolean;
  joinedRecently: boolean;
  category: string;
  businessCategory: string;
  phoneNumber: string;
  isPrivate: boolean;
  isVerified: boolean;
  mutualFollowersCount: number;
  imageUrl: string;
  requestedByViewer: boolean;
  postsCount: number;
  website: string;
  mailFound: string;
  businessCity: string;
  publicEmail: string;
}
```

## Important Notes

### Rate Limiting
- Instagram has rate limits to prevent abuse
- Use delays between requests (recommended: 2-3 seconds)
- The scraper includes automatic rate limiting protection
- Excessive requests may result in temporary IP blocks

### Session ID Security
- Never commit your session ID to version control
- Keep your `.env` file secure and private
- Session IDs expire after some time; you'll need to refresh them
- Don't share your session ID with others

### Legal and Ethical Considerations
- This tool is for educational and research purposes
- Always respect Instagram's Terms of Service
- Don't use this tool for spam or harassment
- Be mindful of privacy and data protection laws
- Use responsibly and ethically

## Troubleshooting

### "Authentication failed"
- Your session ID may have expired
- Get a fresh session ID from your browser
- Make sure you're logged into Instagram

### "Rate limit exceeded"
- Wait a few minutes before trying again
- Increase the delay between requests
- Consider using a different IP address

### "Profile not found"
- Check that the username is correct
- The profile may have been deleted or suspended
- The account may be private and blocking your account

## Available Scripts

```bash
# Start the development server (React app)
npm run dev

# Start the scraper API server
npm run server

# Start the scraper API server with auto-reload
npm run server:dev

# Run the example scraper script
npm run scrape -- username

# Build the frontend
npm run build

# Lint the code
npm run lint
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
