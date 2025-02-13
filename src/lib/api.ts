import axios from 'axios';
import { Story } from '../types/story';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export async function fetchTopStories(page: number, limit: number): Promise<number[]> {
  const response = await axios.get<number[]>(`${BASE_URL}/topstories.json`);
  const stories = response.data;
  const start = page * limit;
  return stories.slice(start, start + limit);
}

export async function fetchStory(id: number): Promise<Story> {
  const response = await axios.get<Story>(`${BASE_URL}/item/${id}.json`);
  return response.data;
}

