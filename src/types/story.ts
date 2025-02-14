export interface Story {
  objectID: string;
  title: string;
  author: string;
  url?: string;
  created_at: string;
  story_text?: string;
  points: number
}

export interface SearchResponse {
  hits: Story[];
  page: number;
  nbHits: number;
  nbPages: number;
  hitsPerPage: number;
}

export interface SearchHistory {
  query: string;
  timestamp: number;
}

export const VoteType = {
  UPVOTE: 'upvote',
  DOWNVOTE: 'downvote',
} as const;

export type VoteType = typeof VoteType[keyof typeof VoteType];

export interface StoriesVoteList {
  [objectId: Story['objectID']]: VoteType;
}