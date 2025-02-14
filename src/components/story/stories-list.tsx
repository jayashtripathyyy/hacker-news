import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback } from "react";

import StoryItem from "./story-item";
import { useStore } from "../../store/global";
import { fetchStories } from "../../lib/api";
import { Story } from "../../types/story";

interface StoriesListProps {
  onStoryClick: (story: Story) => void;
}

export default function StoriesList({ onStoryClick }: StoriesListProps) {
  const { itemsPerPage, searchQuery } = useStore();
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


  return (
    <div className="flex flex-col flex-1 overflow-auto ">
      {isLoading && Array.from({ length: itemsPerPage }).map((_, index) => (
        <div className="animate-pulse  bg-muted/10 p-10 md:px-4  hover:bg-muted/40 cursor-pointer transition-colors border-b border-border "></div>
      ))}
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

      {hasNextPage && <div className="p-4 text-center text-muted-foreground">Loading more stories...</div>}
      {!hasNextPage && <div className="p-4 text-center text-muted-foreground">You reached the end of the list</div>}
    </div>
  );
}