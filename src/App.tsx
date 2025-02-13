import { useInfiniteQuery } from "@tanstack/react-query";
import Header from "./components/header"
import { cn } from "./lib/utils"
import { fetchStory, fetchTopStories } from "./lib/api";
import { useStore } from "./store/global";
import { Story } from './types/story';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

function App({className, ...props}: Props) {
  const { itemsPerPage } = useStore();
  const {
    data: stories,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery<Story[]>({
    queryKey: ['stories'],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const ids = await fetchTopStories(itemsPerPage, itemsPerPage);
      const stories = await Promise.all(ids.map(fetchStory)); 
      return stories;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === itemsPerPage ? allPages.length : undefined;
    },
  });

  console.log(stories);
  return (
    <div className={cn(' dark flex justify-center items-center h-screen w-screen bg-background text-primary', className)} {...props}>
   
        <div className="container_wrapper ">
          <Header />
        </div>
   
    </div>
  )
}

export default App