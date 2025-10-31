// Authentication Types
export interface Credentials {
  email: string;
  password: string;
}

export interface ValidationErrors {
  email?: string;
  password?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

// Market Data Types
export interface MarketIndex {
  symbol: string;
  price: number;
  change: number;
  percentChange: number;
  timestamp?: string;
}

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  percentChange: number;
  volume?: number;
  marketCap?: string;
}

export interface SectorData {
  name: string;
  performance: {
    '1day': number;
    '5day': number;
    '1month': number;
  };
}

export interface NewsItem {
  title: string;
  source: string;
  summary: string;
  url: string;
  publishedAt: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  sentimentScore?: number;
}

export interface DerivativeData {
  instrument: string;
  strike?: number;
  expiry?: string;
  price: number;
  change: number;
  volume?: number;
  openInterest?: number;
}

export interface EconomicEvent {
  date: string;
  event: string;
  country: string;
  importance: 'high' | 'medium' | 'low';
}

// Portfolio Types
export interface CompanyData {
  name: string;
  description: string;
  stage: string;
  sector?: string;
  founded?: string;
}

export interface TeamMember {
  name: string;
  title: string;
  bio: string;
  imageUrl?: string;
  linkedin?: string;
}

// Poll Types
export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  createdAt: string;
  expiresAt?: string;
  totalVotes: number;
  allowMultiple?: boolean;
  isActive: boolean;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface PollVote {
  pollId: string;
  optionId: string;
  userId: string;
  timestamp: string;
}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  timestamp: string;
}

export interface MarketDataResponse {
  indices: MarketIndex[];
  stocks: StockData[];
  sectors: SectorData[];
  news: NewsItem[];
  lastUpdated: string;
}

// UI Component Types
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

// Page Types
export type PageType = 'home' | 'orion' | 'dashboard';

// Export Report Types
export interface ExportOptions {
  format: 'pdf' | 'csv' | 'excel';
  dateRange?: {
    start: string;
    end: string;
  };
  includeCharts?: boolean;
}
