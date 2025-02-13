import Header from "./components/header"
import { cn } from "./lib/utils"
import { useStore } from "./store/global"
import StoriesList from "./components/story/stories-list"
import { Story } from "./types/story"

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

function App({ className, ...props }: Props) {
  const { searchQuery } = useStore();

  const handleStoryClick = (story: Story) => {
    if (story.url) {
      window.open(story.url, '_blank');
    }
  };

  return (
    <main className={cn('min-h-screen bg-background text-foreground dark', className)} {...props}>
      <div className="container_wrapper">
        <Header />
    
          <StoriesList 
            searchQuery={searchQuery} 
            onStoryClick={handleStoryClick} 
          />
      
      </div>
    </main>
  );
}

export default App;