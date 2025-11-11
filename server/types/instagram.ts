export interface InstagramProfileData {
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

export interface ScraperConfig {
  sessionId: string;
  userAgent?: string;
  timeout?: number;
}
