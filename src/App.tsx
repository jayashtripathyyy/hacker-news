import Header from "./components/header"
import { cn } from "./lib/utils"
import { useStore } from "./store/global"
import StoriesList from "./components/story/stories-list"
import { Story } from "./types/story"
import SearchBar from "./components/search/search-bar"
import SearchController from "./components/search/serch-controller"

interface Props extends React.HTMLAttributes<HTMLDivElement> { }

function App({ className, ...props }: Props) {
  const { searchQuery } = useStore();

  const handleStoryClick = (story: Story) => {
    if (story.url) {
      window.open(story.url, '_blank');
    }
  };

  return (
    <main className={cn('h-screen bg-background text-foreground dark overflow-hidden flex flex-col', className)} {...props}>
      <Header />
      <SearchBar />
      <SearchController/>
      <div className="container_wrapper flex flex-1 overflow-hidden ">
        <StoriesList
          onStoryClick={handleStoryClick}
        />
      </div>

    </main>
  );
}

export default App;