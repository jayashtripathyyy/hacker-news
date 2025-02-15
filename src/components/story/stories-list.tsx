import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";

import StoryItem from "./story-item";
import { useStore } from "../../store/global";
import { fetchStories } from "../../lib/api";
import { Story } from "../../types/story";
import VirtualList from "../virtual-list";

interface StoriesListProps {
  onStoryClick: (story: Story) => void;
}

export default function StoriesList({ onStoryClick }: StoriesListProps) {
  const { itemsPerPage, searchQuery, searchHistory, addToSearchHistory, setTotalResults, setIsLoading } = useStore();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['stories', searchQuery, itemsPerPage],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      return fetchStories(pageParam, itemsPerPage, searchQuery);
    },
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.nbPages - 1 ? lastPage.page + 1 : undefined,
  });
  
  const updatetotalResults = useCallback(() => {
    if (data) {
      const totalResults = data.pages.reduce((acc, page) => acc + page.hits.length, 0);
      setTotalResults(totalResults);
    }
  }, [data, setTotalResults]);

  useEffect(() => {
    updatetotalResults();
  }, [data])

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  return (
    <div className="flex flex-col flex-1 overflow-auto ">
      {isLoading && Array.from({ length: itemsPerPage }).map((_, index) => (
        <div className="animate-pulse  bg-muted/10 p-10 md:px-4  hover:bg-muted/40 cursor-pointer transition-colors border-b border-border "></div>
      ))}

      <VirtualList
        data={data?.pages.flatMap(page => page.hits) || []}
        rowHeight={150}
        renderItem={(item, index) => (
          <StoryItem key={item.objectID} story={item} onClick={() => onStoryClick(item)} />
        )}
        footer={hasNextPage && 
                <div className="p-4 text-center text-muted-foreground animate-pulse  bg-muted/10 hover:bg-muted/40 transition-colors">Loading more stories...</div>}
      />

    </div>
  );
}