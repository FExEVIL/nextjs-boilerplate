import React from 'react';
import { NewsItem } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { getSentimentColor, formatDateTime, truncate } from '@/lib/utils';

interface NewsCardProps {
  news: NewsItem;
}

export function NewsCard({ news }: NewsCardProps) {
  const sentimentColor = getSentimentColor(news.sentiment);

  return (
    <Card hover>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-base leading-tight flex-1">{news.title}</CardTitle>
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${sentimentColor} bg-gray-100`}
          >
            {news.sentiment}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-3">{truncate(news.summary, 150)}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{news.source}</span>
          <span>{formatDateTime(news.publishedAt)}</span>
        </div>
        {news.url && news.url !== '#' && (
          <a
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-black hover:underline mt-2 inline-block"
          >
            Read more →
          </a>
        )}
      </CardContent>
    </Card>
  );
}
