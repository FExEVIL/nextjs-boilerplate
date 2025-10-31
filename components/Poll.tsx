'use client';

import React, { useState } from 'react';
import { Poll as PollType } from '@/types';
import { Button } from './ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { useToast } from '@/contexts/ToastContext';
import { pollService } from '@/services/pollService';

interface PollProps {
  poll: PollType;
  userId: string;
}

export function Poll({ poll, userId }: PollProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    pollService.getUserVoteForPoll(poll.id, userId)
  );
  const [hasVoted, setHasVoted] = useState(pollService.hasUserVoted(poll.id, userId));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { success, error } = useToast();

  const handleVote = async () => {
    if (!selectedOption) {
      error('Please select an option');
      return;
    }

    setIsSubmitting(true);

    try {
      const voteSuccess = pollService.vote(poll.id, selectedOption, userId);

      if (voteSuccess) {
        setHasVoted(true);
        success('Vote submitted successfully!');
      } else {
        error('You have already voted on this poll');
      }
    } catch (err) {
      error('Failed to submit vote. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPercentage = (votes: number) => {
    if (poll.totalVotes === 0) return 0;
    return ((votes / poll.totalVotes) * 100).toFixed(1);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{poll.question}</CardTitle>
        <p className="text-sm text-gray-600 mt-1">
          {poll.totalVotes} {poll.totalVotes === 1 ? 'vote' : 'votes'}
        </p>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {poll.options.map(option => {
            const percentage = getPercentage(option.votes);
            const isSelected = selectedOption === option.id;

            return (
              <div key={option.id} className="relative">
                <button
                  onClick={() => !hasVoted && setSelectedOption(option.id)}
                  disabled={hasVoted}
                  className={`
                    w-full text-left p-4 rounded-sm border-2 transition-all
                    ${hasVoted ? 'cursor-default' : 'cursor-pointer hover:border-black'}
                    ${isSelected ? 'border-black bg-gray-50' : 'border-gray-200 bg-white'}
                  `}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{option.text}</span>
                    {hasVoted && (
                      <span className="text-sm font-bold text-gray-900">{percentage}%</span>
                    )}
                  </div>

                  {hasVoted && (
                    <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-black transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {!hasVoted && (
          <div className="mt-6">
            <Button
              onClick={handleVote}
              disabled={!selectedOption || isSubmitting}
              isLoading={isSubmitting}
              variant="primary"
              className="w-full"
            >
              Submit Vote
            </Button>
          </div>
        )}

        {hasVoted && (
          <p className="mt-4 text-sm text-gray-600 text-center">
            Thanks for voting! Results are shown above.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
