import { Router, Request, Response } from 'express';
import { InstagramScraper } from '../scrapers/instagramScraper';

const router = Router();

/**
 * POST /api/scraper/profile
 * Scrape a single Instagram profile
 *
 * Body:
 * {
 *   "username": "instagram_username",
 *   "sessionId": "your_session_id"
 * }
 */
router.post('/profile', async (req: Request, res: Response) => {
  try {
    const { username, sessionId } = req.body;

    if (!username) {
      return res.status(400).json({
        error: 'Username is required',
      });
    }

    if (!sessionId) {
      return res.status(400).json({
        error: 'Session ID is required',
      });
    }

    const scraper = new InstagramScraper({ sessionId });
    const profileData = await scraper.scrapeProfile(username);

    return res.json(profileData);
  } catch (error: any) {
    console.error('Error scraping profile:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
});

/**
 * POST /api/scraper/profiles
 * Scrape multiple Instagram profiles
 *
 * Body:
 * {
 *   "usernames": ["username1", "username2", "username3"],
 *   "sessionId": "your_session_id",
 *   "delayMs": 2000 (optional, default: 2000)
 * }
 */
router.post('/profiles', async (req: Request, res: Response) => {
  try {
    const { usernames, sessionId, delayMs } = req.body;

    if (!usernames || !Array.isArray(usernames) || usernames.length === 0) {
      return res.status(400).json({
        error: 'Usernames array is required and must not be empty',
      });
    }

    if (!sessionId) {
      return res.status(400).json({
        error: 'Session ID is required',
      });
    }

    const scraper = new InstagramScraper({ sessionId });
    const profilesData = await scraper.scrapeMultipleProfiles(usernames, delayMs);

    return res.json({
      count: profilesData.length,
      profiles: profilesData,
    });
  } catch (error: any) {
    console.error('Error scraping profiles:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
});

/**
 * GET /api/scraper/health
 * Health check endpoint
 */
router.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

export default router;
