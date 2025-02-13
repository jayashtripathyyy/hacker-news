export interface Story {
    id: number;
    title: string;
    url?: string;
    text?: string;
    by: string;
    time: number;
    score: number;
    descendants: number; // number of comments
    kids?: number[]; // comment IDs
    type: 'story' | 'job' | 'comment' | 'poll' | 'pollopt';
    localVote?: 'up' | 'down' | null;
}

export interface SearchHistory {
    query: string;
    timestamp: number;
}