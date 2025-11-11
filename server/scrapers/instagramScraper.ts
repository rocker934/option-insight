import axios, { AxiosInstance } from 'axios';
import { InstagramProfileData, ScraperConfig } from '../types/instagram';

export class InstagramScraper {
  private axiosInstance: AxiosInstance;
  private sessionId: string;

  constructor(config: ScraperConfig) {
    this.sessionId = config.sessionId;

    this.axiosInstance = axios.create({
      baseURL: 'https://www.instagram.com',
      timeout: config.timeout || 30000,
      headers: {
        'User-Agent': config.userAgent || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'X-IG-App-ID': '936619743392459',
        'X-ASBD-ID': '198387',
        'X-IG-WWW-Claim': '0',
        'X-Requested-With': 'XMLHttpRequest',
        'Referer': 'https://www.instagram.com/',
        'Cookie': `sessionid=${this.sessionId}`,
      },
    });
  }

  /**
   * Scrape Instagram profile data
   * @param username - Instagram username to scrape
   * @returns Promise with profile data
   */
  async scrapeProfile(username: string): Promise<InstagramProfileData> {
    const timestamp = new Date().toISOString();
    const profileUrl = `https://www.instagram.com/${username}/`;

    const result: InstagramProfileData = {
      error: null,
      query: username,
      timestamp,
      profileUrl,
      profileName: '',
      fullName: '',
      bio: '',
      blockedByViewer: false,
      followersCount: 0,
      followingCount: 0,
      followedByViewer: false,
      followsViewer: false,
      instagramID: '',
      isBusinessAccount: false,
      joinedRecently: false,
      category: '',
      businessCategory: '',
      phoneNumber: '',
      isPrivate: false,
      isVerified: false,
      mutualFollowersCount: 0,
      imageUrl: '',
      requestedByViewer: false,
      postsCount: 0,
      website: '',
      mailFound: '',
      businessCity: '',
      publicEmail: '',
    };

    try {
      // First, try the GraphQL API endpoint
      const response = await this.axiosInstance.get(`/api/v1/users/web_profile_info/`, {
        params: { username },
      });

      if (response.data && response.data.data && response.data.data.user) {
        const user = response.data.data.user;

        // Extract all available data
        result.profileName = user.username || username;
        result.fullName = user.full_name || '';
        result.bio = user.biography || '';
        result.blockedByViewer = user.blocked_by_viewer || false;
        result.followersCount = user.edge_followed_by?.count || 0;
        result.followingCount = user.edge_follow?.count || 0;
        result.followedByViewer = user.followed_by_viewer || false;
        result.followsViewer = user.follows_viewer || false;
        result.instagramID = user.id || '';
        result.isBusinessAccount = user.is_business_account || false;
        result.joinedRecently = user.is_joined_recently || false;
        result.category = user.category_name || '';
        result.businessCategory = user.business_category_name || '';
        result.phoneNumber = user.business_phone_number || '';
        result.isPrivate = user.is_private || false;
        result.isVerified = user.is_verified || false;
        result.mutualFollowersCount = user.edge_mutual_followed_by?.count || 0;
        result.imageUrl = user.profile_pic_url_hd || user.profile_pic_url || '';
        result.requestedByViewer = user.requested_by_viewer || false;
        result.postsCount = user.edge_owner_to_timeline_media?.count || 0;
        result.website = user.external_url || '';
        result.publicEmail = user.public_email || '';
        result.businessCity = user.city_name || '';

        // Extract email from bio if available
        const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
        const emailMatch = result.bio.match(emailRegex);
        if (emailMatch && emailMatch.length > 0) {
          result.mailFound = emailMatch[0];
        }

        // If public_email is available, prioritize it
        if (result.publicEmail) {
          result.mailFound = result.publicEmail;
        }

      } else {
        result.error = 'Unable to fetch profile data. The response format is unexpected.';
      }

    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 404) {
          result.error = `Profile not found: ${username}`;
        } else if (error.response.status === 401 || error.response.status === 403) {
          result.error = 'Authentication failed. Please check your session ID.';
        } else if (error.response.status === 429) {
          result.error = 'Rate limit exceeded. Please try again later.';
        } else {
          result.error = `HTTP Error ${error.response.status}: ${error.response.statusText}`;
        }
      } else if (error.request) {
        // The request was made but no response was received
        result.error = 'No response received from Instagram. Please check your internet connection.';
      } else {
        // Something happened in setting up the request that triggered an Error
        result.error = `Error: ${error.message}`;
      }

      console.error('Instagram scraping error:', error.message);
    }

    return result;
  }

  /**
   * Scrape multiple profiles
   * @param usernames - Array of Instagram usernames
   * @param delayMs - Delay between requests in milliseconds (default: 2000)
   * @returns Promise with array of profile data
   */
  async scrapeMultipleProfiles(
    usernames: string[],
    delayMs: number = 2000
  ): Promise<InstagramProfileData[]> {
    const results: InstagramProfileData[] = [];

    for (const username of usernames) {
      try {
        const data = await this.scrapeProfile(username);
        results.push(data);

        // Add delay to avoid rate limiting
        if (usernames.indexOf(username) < usernames.length - 1) {
          await this.delay(delayMs);
        }
      } catch (error: any) {
        console.error(`Failed to scrape ${username}:`, error.message);
        results.push({
          error: error.message,
          query: username,
          timestamp: new Date().toISOString(),
          profileUrl: `https://www.instagram.com/${username}/`,
          profileName: username,
          fullName: '',
          bio: '',
          blockedByViewer: false,
          followersCount: 0,
          followingCount: 0,
          followedByViewer: false,
          followsViewer: false,
          instagramID: '',
          isBusinessAccount: false,
          joinedRecently: false,
          category: '',
          businessCategory: '',
          phoneNumber: '',
          isPrivate: false,
          isVerified: false,
          mutualFollowersCount: 0,
          imageUrl: '',
          requestedByViewer: false,
          postsCount: 0,
          website: '',
          mailFound: '',
          businessCity: '',
          publicEmail: '',
        });
      }
    }

    return results;
  }

  /**
   * Delay helper function
   * @param ms - Milliseconds to delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
