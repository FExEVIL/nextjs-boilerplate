import { Poll, PollOption, PollVote } from '@/types';
import { generateId } from '@/lib/utils';
import { STORAGE_KEYS } from '@/lib/constants';

class PollService {
  private polls: Poll[] = [];

  constructor() {
    this.initializeDefaultPolls();
  }

  private initializeDefaultPolls() {
    this.polls = [
      {
        id: generateId(),
        question: 'Which sector do you think will perform best in 2025?',
        options: [
          { id: '1', text: 'Technology', votes: 245 },
          { id: '2', text: 'Healthcare', votes: 167 },
          { id: '3', text: 'Financial Services', votes: 198 },
          { id: '4', text: 'Energy', votes: 89 },
        ],
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        totalVotes: 699,
        allowMultiple: false,
        isActive: true,
      },
      {
        id: generateId(),
        question: 'What is your primary investment strategy?',
        options: [
          { id: '1', text: 'Long-term growth', votes: 456 },
          { id: '2', text: 'Value investing', votes: 234 },
          { id: '3', text: 'Day trading', votes: 123 },
          { id: '4', text: 'Dividend income', votes: 178 },
        ],
        createdAt: new Date().toISOString(),
        totalVotes: 991,
        allowMultiple: false,
        isActive: true,
      },
    ];
  }

  getAllPolls(): Poll[] {
    return this.polls.filter(poll => poll.isActive);
  }

  getPollById(pollId: string): Poll | undefined {
    return this.polls.find(poll => poll.id === pollId);
  }

  vote(pollId: string, optionId: string, userId: string): boolean {
    const poll = this.getPollById(pollId);
    if (!poll) return false;

    // Check if user has already voted (from localStorage)
    const existingVotes = this.getUserVotes(userId);
    const hasVoted = existingVotes.some(vote => vote.pollId === pollId);

    if (hasVoted && !poll.allowMultiple) {
      return false; // User has already voted
    }

    // Find the option and increment vote count
    const option = poll.options.find(opt => opt.id === optionId);
    if (!option) return false;

    option.votes += 1;
    poll.totalVotes += 1;

    // Save vote to localStorage
    this.saveVote({ pollId, optionId, userId, timestamp: new Date().toISOString() });

    return true;
  }

  private getUserVotes(userId: string): PollVote[] {
    if (typeof window === 'undefined') return [];

    const votesJson = localStorage.getItem(STORAGE_KEYS.POLL_VOTES);
    if (!votesJson) return [];

    try {
      const allVotes: PollVote[] = JSON.parse(votesJson);
      return allVotes.filter(vote => vote.userId === userId);
    } catch {
      return [];
    }
  }

  private saveVote(vote: PollVote) {
    if (typeof window === 'undefined') return;

    const votesJson = localStorage.getItem(STORAGE_KEYS.POLL_VOTES);
    const votes: PollVote[] = votesJson ? JSON.parse(votesJson) : [];
    votes.push(vote);
    localStorage.setItem(STORAGE_KEYS.POLL_VOTES, JSON.stringify(votes));
  }

  hasUserVoted(pollId: string, userId: string): boolean {
    const votes = this.getUserVotes(userId);
    return votes.some(vote => vote.pollId === pollId);
  }

  getUserVoteForPoll(pollId: string, userId: string): string | null {
    const votes = this.getUserVotes(userId);
    const vote = votes.find(v => v.pollId === pollId);
    return vote ? vote.optionId : null;
  }

  createPoll(
    question: string,
    options: string[],
    allowMultiple: boolean = false,
    expiresInDays?: number
  ): Poll {
    const poll: Poll = {
      id: generateId(),
      question,
      options: options.map((text, index) => ({
        id: (index + 1).toString(),
        text,
        votes: 0,
      })),
      createdAt: new Date().toISOString(),
      expiresAt: expiresInDays
        ? new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000).toISOString()
        : undefined,
      totalVotes: 0,
      allowMultiple,
      isActive: true,
    };

    this.polls.push(poll);
    return poll;
  }

  deletePoll(pollId: string): boolean {
    const index = this.polls.findIndex(poll => poll.id === pollId);
    if (index === -1) return false;

    this.polls.splice(index, 1);
    return true;
  }

  deactivatePoll(pollId: string): boolean {
    const poll = this.getPollById(pollId);
    if (!poll) return false;

    poll.isActive = false;
    return true;
  }

  getPollResults(pollId: string): { question: string; results: PollOption[] } | null {
    const poll = this.getPollById(pollId);
    if (!poll) return null;

    return {
      question: poll.question,
      results: poll.options.map(option => ({
        ...option,
        percentage: poll.totalVotes > 0 ? (option.votes / poll.totalVotes) * 100 : 0,
      })) as PollOption[],
    };
  }
}

export const pollService = new PollService();
