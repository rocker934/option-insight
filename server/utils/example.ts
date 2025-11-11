/**
 * Example usage of Instagram Scraper
 *
 * This file demonstrates how to use the Instagram scraper directly
 * without running the Express server.
 */

import { InstagramScraper } from '../scrapers/instagramScraper';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  // Replace with your actual Instagram session ID
  const SESSION_ID = process.env.INSTAGRAM_SESSION_ID || 'your_session_id_here';

  if (SESSION_ID === 'your_session_id_here') {
    console.error('❌ Please provide a valid Instagram session ID');
    console.log('\nTo get your session ID:');
    console.log('1. Login to Instagram in your browser');
    console.log('2. Open Developer Tools (F12)');
    console.log('3. Go to Application/Storage -> Cookies -> https://www.instagram.com');
    console.log('4. Find the cookie named "sessionid" and copy its value');
    console.log('\nSet it in .env file or pass it as an environment variable:');
    console.log('INSTAGRAM_SESSION_ID=your_session_id npm run scrape\n');
    process.exit(1);
  }

  // Initialize the scraper
  const scraper = new InstagramScraper({
    sessionId: SESSION_ID,
  });

  console.log('🔍 Starting Instagram profile scraping...\n');

  try {
    // Example 1: Scrape a single profile
    console.log('Example 1: Scraping a single profile');
    console.log('═══════════════════════════════════════\n');

    const username = process.argv[2] || 'instagram'; // Default to 'instagram' if no username provided
    console.log(`Scraping profile: @${username}`);

    const profileData = await scraper.scrapeProfile(username);

    if (profileData.error) {
      console.error(`❌ Error: ${profileData.error}`);
    } else {
      console.log('✅ Profile scraped successfully!\n');
      console.log('Profile Details:');
      console.log('─────────────────────────────────────');
      console.log(`Username: @${profileData.profileName}`);
      console.log(`Full Name: ${profileData.fullName}`);
      console.log(`Bio: ${profileData.bio}`);
      console.log(`Followers: ${profileData.followersCount.toLocaleString()}`);
      console.log(`Following: ${profileData.followingCount.toLocaleString()}`);
      console.log(`Posts: ${profileData.postsCount.toLocaleString()}`);
      console.log(`Verified: ${profileData.isVerified ? '✓' : '✗'}`);
      console.log(`Private: ${profileData.isPrivate ? '✓' : '✗'}`);
      console.log(`Business Account: ${profileData.isBusinessAccount ? '✓' : '✗'}`);
      if (profileData.website) console.log(`Website: ${profileData.website}`);
      if (profileData.publicEmail) console.log(`Email: ${profileData.publicEmail}`);
      if (profileData.phoneNumber) console.log(`Phone: ${profileData.phoneNumber}`);
      if (profileData.businessCity) console.log(`City: ${profileData.businessCity}`);
      if (profileData.category) console.log(`Category: ${profileData.category}`);
      console.log('─────────────────────────────────────\n');

      // Save to JSON file
      const outputDir = path.join(__dirname, '../../output');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      const filename = `${username}_${Date.now()}.json`;
      const filepath = path.join(outputDir, filename);
      fs.writeFileSync(filepath, JSON.stringify(profileData, null, 2));
      console.log(`💾 Data saved to: ${filepath}\n`);
    }

    // Example 2: Scrape multiple profiles (uncomment to use)
    /*
    console.log('\nExample 2: Scraping multiple profiles');
    console.log('═══════════════════════════════════════\n');

    const usernames = ['instagram', 'natgeo', 'nasa'];
    console.log(`Scraping profiles: ${usernames.join(', ')}`);

    const profilesData = await scraper.scrapeMultipleProfiles(usernames, 3000);

    console.log('\n✅ All profiles scraped!\n');

    profilesData.forEach((profile, index) => {
      console.log(`${index + 1}. @${profile.profileName}`);
      console.log(`   Followers: ${profile.followersCount.toLocaleString()}`);
      console.log(`   ${profile.error ? `Error: ${profile.error}` : '✓ Success'}\n`);
    });

    // Save to JSON file
    const multiFilename = `multiple_profiles_${Date.now()}.json`;
    const multiFilepath = path.join(outputDir, multiFilename);
    fs.writeFileSync(multiFilepath, JSON.stringify(profilesData, null, 2));
    console.log(`💾 Data saved to: ${multiFilepath}\n`);
    */

  } catch (error: any) {
    console.error('❌ Unexpected error:', error.message);
    process.exit(1);
  }

  console.log('✅ Scraping completed!\n');
}

// Run the main function
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
