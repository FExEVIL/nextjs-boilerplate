import {
  MarketIndex,
  StockData,
  SectorData,
  NewsItem,
  ApiResponse,
  MarketDataResponse,
} from '@/types';
import { API_CONFIG } from '@/lib/constants';

class MarketDataService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = API_CONFIG.ALPHA_VANTAGE.API_KEY;
    this.baseUrl = API_CONFIG.ALPHA_VANTAGE.BASE_URL;
  }

  private async fetchWithTimeout(url: string, timeout: number = 10000): Promise<Response> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(id);
      return response;
    } catch (error) {
      clearTimeout(id);
      throw error;
    }
  }

  private buildUrl(params: Record<string, string>): string {
    const urlParams = new URLSearchParams({
      ...params,
      apikey: this.apiKey,
    });
    return `${this.baseUrl}?${urlParams.toString()}`;
  }

  async getQuote(symbol: string): Promise<ApiResponse<MarketIndex>> {
    try {
      const url = this.buildUrl({
        function: 'GLOBAL_QUOTE',
        symbol,
      });

      const response = await this.fetchWithTimeout(url);
      const data = await response.json();

      if (data['Error Message'] || data['Note']) {
        throw new Error(data['Error Message'] || 'API rate limit exceeded');
      }

      const quote = data['Global Quote'];
      if (!quote || !quote['05. price']) {
        throw new Error('Invalid quote data received');
      }

      const marketIndex: MarketIndex = {
        symbol,
        price: parseFloat(quote['05. price']),
        change: parseFloat(quote['09. change']),
        percentChange: parseFloat(quote['10. change percent'].replace('%', '')),
        timestamp: quote['07. latest trading day'],
      };

      return {
        data: marketIndex,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to fetch quote',
        timestamp: new Date().toISOString(),
      };
    }
  }

  async getMultipleQuotes(symbols: string[]): Promise<MarketIndex[]> {
    const promises = symbols.map(symbol => this.getQuote(symbol));
    const results = await Promise.all(promises);

    return results
      .filter((result): result is ApiResponse<MarketIndex> & { data: MarketIndex } => !!result.data)
      .map(result => result.data);
  }

  async getSectorPerformance(): Promise<ApiResponse<SectorData[]>> {
    try {
      const url = this.buildUrl({
        function: 'SECTOR',
      });

      const response = await this.fetchWithTimeout(url);
      const data = await response.json();

      if (data['Error Message'] || data['Note']) {
        throw new Error(data['Error Message'] || 'API rate limit exceeded');
      }

      const sectors: SectorData[] = [];
      const rankingData = data['Rank A: Real-Time Performance'];

      if (rankingData) {
        Object.entries(rankingData).forEach(([sector, performance]) => {
          const perf = parseFloat((performance as string).replace('%', ''));
          sectors.push({
            name: sector,
            performance: {
              '1day': perf,
              '5day': perf * 0.9,
              '1month': perf * 1.2,
            },
          });
        });
      }

      return {
        data: sectors,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to fetch sector performance',
        timestamp: new Date().toISOString(),
      };
    }
  }

  async getMarketNews(): Promise<ApiResponse<NewsItem[]>> {
    try {
      const url = this.buildUrl({
        function: 'NEWS_SENTIMENT',
        tickers: 'AAPL,MSFT,GOOGL',
        limit: '10',
      });

      const response = await this.fetchWithTimeout(url);
      const data = await response.json();

      if (data['Error Message'] || data['Note']) {
        throw new Error(data['Error Message'] || 'API rate limit exceeded');
      }

      const newsItems: NewsItem[] = [];
      if (data.feed && Array.isArray(data.feed)) {
        data.feed.forEach((item: Record<string, unknown>) => {
          const sentimentScore = item.overall_sentiment_score as number;
          let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';

          if (sentimentScore > 0.15) sentiment = 'positive';
          else if (sentimentScore < -0.15) sentiment = 'negative';

          newsItems.push({
            title: item.title as string,
            source: item.source as string,
            summary: item.summary as string,
            url: item.url as string,
            publishedAt: item.time_published as string,
            sentiment,
            sentimentScore,
          });
        });
      }

      return {
        data: newsItems,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to fetch market news',
        timestamp: new Date().toISOString(),
      };
    }
  }

  async getAllMarketData(): Promise<ApiResponse<MarketDataResponse>> {
    try {
      const [globalQuotes, indianQuotes, sectorPerf, news] = await Promise.all([
        this.getMultipleQuotes(['DIA', 'QQQ']),
        this.getMultipleQuotes(['BSE:SENSEX', 'NSE:NIFTY']),
        this.getSectorPerformance(),
        this.getMarketNews(),
      ]);

      const marketData: MarketDataResponse = {
        indices: [...globalQuotes, ...indianQuotes],
        stocks: [],
        sectors: sectorPerf.data || [],
        news: news.data || [],
        lastUpdated: new Date().toISOString(),
      };

      return {
        data: marketData,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to fetch market data',
        timestamp: new Date().toISOString(),
      };
    }
  }

  // Fallback/mock data for when API fails or rate limit is exceeded
  getFallbackData(): MarketDataResponse {
    return {
      indices: [
        { symbol: 'DIA', price: 340.5, change: 2.3, percentChange: 0.68 },
        { symbol: 'QQQ', price: 367.2, change: -1.5, percentChange: -0.41 },
        { symbol: 'BSE:SENSEX', price: 73840.45, change: 245.67, percentChange: 0.33 },
        { symbol: 'NSE:NIFTY', price: 22356.78, change: -89.23, percentChange: -0.4 },
      ],
      stocks: [
        {
          symbol: 'TCS.NS',
          name: 'TCS',
          price: 3456.78,
          change: 45.23,
          percentChange: 1.32,
        },
        {
          symbol: 'INFY.NS',
          name: 'Infosys',
          price: 1567.89,
          change: -12.34,
          percentChange: -0.78,
        },
        {
          symbol: 'RELIANCE.NS',
          name: 'Reliance',
          price: 2789.45,
          change: 34.56,
          percentChange: 1.25,
        },
      ],
      sectors: [
        { name: 'Technology', performance: { '1day': 1.2, '5day': 2.3, '1month': 5.6 } },
        { name: 'Healthcare', performance: { '1day': 0.8, '5day': 1.5, '1month': 3.2 } },
        { name: 'Financial Services', performance: { '1day': -0.5, '5day': 0.3, '1month': 2.1 } },
      ],
      news: [
        {
          title: 'Markets reach new highs on positive economic data',
          source: 'Market News',
          summary: 'Stock markets continue their upward trajectory...',
          url: '#',
          publishedAt: new Date().toISOString(),
          sentiment: 'positive',
        },
      ],
      lastUpdated: new Date().toISOString(),
    };
  }
}

export const marketDataService = new MarketDataService();
