import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback } from "react";

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

  const lastStoryRef = useCallback(
    (node: HTMLElement | null) => {
      if (!node) return;
      
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      observer.observe(node);
      return () => observer.disconnect();
    },
    [fetchNextPage, hasNextPage]
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col flex-1 overflow-auto ">
      {data?.pages.map((page, pageIndex) => (
        page.hits.map((story, storyIndex) => (
          <StoryItem 
            key={story.objectID}
            ref={pageIndex === data.pages.length - 1 && 
                 storyIndex === page.hits.length - 1 ? 
                 lastStoryRef : undefined}
            story={story}
            onClick={() => onStoryClick(story)}
          />
        ))
      ))}
    </div>
  );
}