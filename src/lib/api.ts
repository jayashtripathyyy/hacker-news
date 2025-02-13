import axios from 'axios';
import { SearchResponse } from '../types/story';

const BASE_URL = 'https://hn.algolia.com/api/v1';

export async function fetchStories(page: number, itemsPerPage: number = 20, query: string = '') {
  const response = await axios.get<SearchResponse>(`${BASE_URL}/search`, {
    params: {
      query,
      page,
      tags: 'story',
      hitsPerPage: itemsPerPage
    }
  });
  return response.data;
}

