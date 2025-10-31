// API Configuration
export const API_CONFIG = {
  ALPHA_VANTAGE: {
    BASE_URL: 'https://www.alphavantage.co/query',
    API_KEY: process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY || '',
    RATE_LIMIT: 25, // calls per day for free tier
    TIMEOUT: 10000, // 10 seconds
  },
};

// Refresh Intervals (in milliseconds)
export const REFRESH_INTERVALS = {
  TIME: 60000, // 1 minute
  MARKET_DATA: 900000, // 15 minutes
  NEWS: 300000, // 5 minutes
};

// Global Indices
export const GLOBAL_INDICES = [
  { symbol: 'DIA', name: 'Dow Jones' },
  { symbol: 'QQQ', name: 'NASDAQ' },
];

// Indian Indices
export const INDIAN_INDICES = [
  { symbol: 'BSE:SENSEX', name: 'Sensex', displaySymbol: 'BSE Sensex' },
  { symbol: 'NSE:NIFTY', name: 'Nifty 50', displaySymbol: 'Nifty 50' },
];

// Indian Stocks
export const INDIAN_STOCKS = [
  { symbol: 'TCS.NS', name: 'TCS' },
  { symbol: 'INFY.NS', name: 'Infosys' },
  { symbol: 'RELIANCE.NS', name: 'Reliance' },
  { symbol: 'HDFCBANK.NS', name: 'HDFC Bank' },
  { symbol: 'WIPRO.NS', name: 'Wipro' },
];

// US Sectors
export const US_SECTORS = [
  'Technology',
  'Healthcare',
  'Financial Services',
  'Consumer Cyclical',
  'Industrials',
  'Communication Services',
  'Consumer Defensive',
  'Energy',
  'Real Estate',
  'Utilities',
  'Basic Materials',
];

// Portfolio Companies
export const PORTFOLIO_COMPANIES = [
  {
    name: 'FinanceFlow',
    description: 'AI-powered financial planning platform',
    stage: 'Series A',
    sector: 'FinTech',
  },
  {
    name: 'DataVault',
    description: 'Enterprise data security solution',
    stage: 'Seed',
    sector: 'Cybersecurity',
  },
  {
    name: 'HealthLink',
    description: 'Telemedicine and patient care platform',
    stage: 'Series B',
    sector: 'HealthTech',
  },
  {
    name: 'CloudCore',
    description: 'Cloud infrastructure optimization',
    stage: 'Series A',
    sector: 'Cloud',
  },
  {
    name: 'TradeTech',
    description: 'Algorithmic trading platform',
    stage: 'Series A',
    sector: 'FinTech',
  },
  {
    name: 'InsureTech',
    description: 'Digital insurance marketplace',
    stage: 'Seed',
    sector: 'InsurTech',
  },
];

// Team Members
export const TEAM_MEMBERS = [
  {
    name: 'Sarah Chen',
    title: 'Managing Partner',
    bio: 'Former Goldman Sachs partner with 15 years in venture capital',
  },
  {
    name: 'Marcus Rodriguez',
    title: 'Investment Partner',
    bio: 'Serial entrepreneur and technology investor',
  },
  {
    name: 'Dr. Emily Watson',
    title: 'Research Director',
    bio: 'PhD in Economics, former Federal Reserve analyst',
  },
];

// Economic Calendar Events
export const ECONOMIC_EVENTS = [
  {
    date: '2025-11-05',
    event: 'RBI Monetary Policy Decision',
    country: 'India',
    importance: 'high' as const,
  },
  {
    date: '2025-11-08',
    event: 'US Non-Farm Payrolls',
    country: 'USA',
    importance: 'high' as const,
  },
  {
    date: '2025-11-12',
    event: 'Indian CPI Release',
    country: 'India',
    importance: 'medium' as const,
  },
];

// Navigation Links
export const NAV_LINKS = [
  { href: '#overview', label: 'Overview' },
  { href: '#markets', label: 'Markets' },
  { href: '#derivatives', label: 'Derivatives' },
  { href: '#news', label: 'News' },
];

// Footer Links
export const FOOTER_LINKS = {
  company: [
    { label: 'About', href: '#' },
    { label: 'Team', href: '#team' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Careers', href: '#' },
  ],
  products: [
    { label: 'Dashboard', href: '#' },
    { label: 'Analytics', href: '#' },
    { label: 'Reports', href: '#' },
    { label: 'API', href: '#' },
  ],
  resources: [
    { label: 'Documentation', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Support', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  legal: [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
};

// Toast Duration
export const TOAST_DURATION = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 7000,
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'orion_auth_token',
  USER_PREFERENCES: 'orion_user_prefs',
  POLL_VOTES: 'orion_poll_votes',
};
