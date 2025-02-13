export interface Story {
  objectID: string;
  title: string;
  author: string;
  url?: string;

  created_at: string;
  story_text?: string;
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