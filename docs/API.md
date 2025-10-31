# API Documentation

## Alpha Vantage API Integration

This application integrates with the Alpha Vantage API to fetch real-time financial market data.

### Configuration

The API is configured through environment variables:

```env
NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY=your_api_key_here
```

### Rate Limits

**Free Tier:**

- 25 API calls per day
- 5 API calls per minute

**Premium Tiers:**

- See [Alpha Vantage pricing](https://www.alphavantage.co/premium/) for details

### Market Data Service API

Located in `services/marketDataService.ts`

#### `getQuote(symbol: string)`

Fetches real-time quote for a single symbol.

**Parameters:**

- `symbol` (string): Stock symbol (e.g., 'AAPL', 'DIA', 'QQQ')

**Returns:**

```typescript
ApiResponse<MarketIndex> {
  data?: {
    symbol: string;
    price: number;
    change: number;
    percentChange: number;
    timestamp?: string;
  };
  error?: string;
  timestamp: string;
}
```

**Example:**

```typescript
const result = await marketDataService.getQuote('AAPL');
if (result.data) {
  console.log(`AAPL: $${result.data.price}`);
}
```

#### `getMultipleQuotes(symbols: string[])`

Fetches quotes for multiple symbols concurrently.

**Parameters:**

- `symbols` (string[]): Array of stock symbols

**Returns:**

```typescript
MarketIndex[]
```

**Example:**

```typescript
const quotes = await marketDataService.getMultipleQuotes(['AAPL', 'GOOGL', 'MSFT']);
```

#### `getSectorPerformance()`

Fetches real-time US sector performance data.

**Returns:**

```typescript
ApiResponse<SectorData[]> {
  data?: Array<{
    name: string;
    performance: {
      '1day': number;
      '5day': number;
      '1month': number;
    };
  }>;
  error?: string;
  timestamp: string;
}
```

**Example:**

```typescript
const sectors = await marketDataService.getSectorPerformance();
if (sectors.data) {
  sectors.data.forEach(sector => {
    console.log(`${sector.name}: ${sector.performance['1day']}%`);
  });
}
```

#### `getMarketNews()`

Fetches latest market news with sentiment analysis.

**Returns:**

```typescript
ApiResponse<NewsItem[]> {
  data?: Array<{
    title: string;
    source: string;
    summary: string;
    url: string;
    publishedAt: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    sentimentScore?: number;
  }>;
  error?: string;
  timestamp: string;
}
```

**Example:**

```typescript
const news = await marketDataService.getMarketNews();
if (news.data) {
  news.data.forEach(item => {
    console.log(`${item.title} - ${item.sentiment}`);
  });
}
```

#### `getAllMarketData()`

Fetches comprehensive market data including indices, stocks, sectors, and news.

**Returns:**

```typescript
ApiResponse<MarketDataResponse> {
  data?: {
    indices: MarketIndex[];
    stocks: StockData[];
    sectors: SectorData[];
    news: NewsItem[];
    lastUpdated: string;
  };
  error?: string;
  timestamp: string;
}
```

**Example:**

```typescript
const marketData = await marketDataService.getAllMarketData();
if (marketData.data) {
  console.log('Indices:', marketData.data.indices);
  console.log('News:', marketData.data.news);
}
```

#### `getFallbackData()`

Returns mock/fallback data for when API calls fail or rate limits are exceeded.

**Returns:**

```typescript
MarketDataResponse;
```

**Example:**

```typescript
const fallbackData = marketDataService.getFallbackData();
```

## Poll Service API

Located in `services/pollService.ts`

### Methods

#### `getAllPolls()`

Returns all active polls.

**Returns:** `Poll[]`

#### `getPollById(pollId: string)`

Returns a specific poll by ID.

**Returns:** `Poll | undefined`

#### `vote(pollId: string, optionId: string, userId: string)`

Submit a vote for a poll option.

**Returns:** `boolean` - Success status

#### `hasUserVoted(pollId: string, userId: string)`

Check if a user has already voted on a poll.

**Returns:** `boolean`

#### `getUserVoteForPoll(pollId: string, userId: string)`

Get the option ID that a user voted for.

**Returns:** `string | null`

#### `createPoll(question, options, allowMultiple?, expiresInDays?)`

Create a new poll.

**Parameters:**

- `question` (string): Poll question
- `options` (string[]): Array of option texts
- `allowMultiple` (boolean, optional): Allow multiple votes per user
- `expiresInDays` (number, optional): Days until poll expires

**Returns:** `Poll`

**Example:**

```typescript
const poll = pollService.createPoll(
  'What is your favorite programming language?',
  ['TypeScript', 'JavaScript', 'Python', 'Go'],
  false,
  30
);
```

## Export Service API

Located in `services/exportService.ts`

### Methods

#### `exportReport(format, indices, stocks)`

Export market data to PDF or CSV format.

**Parameters:**

- `format` ('pdf' | 'csv'): Export format
- `indices` (MarketIndex[]): Market indices data
- `stocks` (StockData[]): Stock data

**Returns:** `Promise<void>`

**Example:**

```typescript
await exportService.exportReport('pdf', indices, stocks);
```

#### `generatePDFReport(indices, stocks, options?)`

Generate a detailed PDF report.

**Parameters:**

- `indices` (MarketIndex[]): Market indices
- `stocks` (StockData[]): Stock data
- `options` (ExportOptions, optional): Export configuration

**Example:**

```typescript
exportService.generatePDFReport(indices, stocks);
```

#### `generateCSVReport(indices, stocks)`

Generate a CSV file with market data.

**Example:**

```typescript
exportService.generateCSVReport(indices, stocks);
```

## Error Handling

All service methods return errors in a consistent format:

```typescript
{
  error?: string;
  timestamp: string;
}
```

**Example error handling:**

```typescript
const result = await marketDataService.getQuote('INVALID');
if (result.error) {
  console.error('Error:', result.error);
  // Use fallback data
  const fallback = marketDataService.getFallbackData();
}
```

## Best Practices

### 1. Rate Limit Management

```typescript
// Bad: Multiple sequential calls
const aapl = await getQuote('AAPL');
const googl = await getQuote('GOOGL');
const msft = await getQuote('MSFT');

// Good: Batch calls
const quotes = await getMultipleQuotes(['AAPL', 'GOOGL', 'MSFT']);
```

### 2. Error Handling

```typescript
try {
  const data = await marketDataService.getAllMarketData();
  if (data.error) {
    // Use fallback data
    return marketDataService.getFallbackData();
  }
  return data.data;
} catch (error) {
  console.error('Market data fetch failed:', error);
  return marketDataService.getFallbackData();
}
```

### 3. Caching

Implement caching to reduce API calls:

```typescript
let cachedData: MarketDataResponse | null = null;
let lastFetch: number = 0;
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

async function getMarketDataWithCache() {
  const now = Date.now();
  if (cachedData && now - lastFetch < CACHE_DURATION) {
    return cachedData;
  }

  const result = await marketDataService.getAllMarketData();
  if (result.data) {
    cachedData = result.data;
    lastFetch = now;
  }
  return cachedData || marketDataService.getFallbackData();
}
```

## TypeScript Types

All API types are defined in `types/index.ts`:

```typescript
// Market Data
MarketIndex;
StockData;
SectorData;
NewsItem;
MarketDataResponse;

// API Response
ApiResponse<T>;

// Polls
Poll;
PollOption;
PollVote;

// Export
ExportOptions;
```

See the types file for complete type definitions.
