import { useInfiniteQuery } from "@tanstack/react-query";

import StoryItem from "./story-item";
import { useStore } from "../../store/global";
import { fetchStories } from "../../lib/api";
import { Story } from "../../types/story";

interface StoriesListProps {
  searchQuery: string;
  onStoryClick: (story: Story) => void;
}

export default function StoriesList({ searchQuery, onStoryClick }: StoriesListProps) {
  const { itemsPerPage } = useStore();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['stories', searchQuery],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      return fetchStories(pageParam, itemsPerPage, searchQuery);
    },
    getNextPageParam: (lastPage) => 
      lastPage.page < lastPage.nbPages - 1 ? lastPage.page + 1 : undefined,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-4 py-4">
      {data?.pages.map((page) => (
        page.hits.map((story) => (
          <StoryItem 
            key={story.objectID}
            story={story}
            onClick={() => onStoryClick(story)}
          />
        ))
      ))}
    </div>
  );
}