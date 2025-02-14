import React, { useEffect, useMemo, useState } from 'react'
import { useStore } from '../../store/global';
import useDebounce from '../../hooks/use-debounce';
import { History, SearchIcon } from 'lucide-react';

type Props = {}

function SearchBar({ }: Props) {
  const { searchQuery, setSearchQuery, searchHistory } = useStore();
  const [inputValue, setInputValue] = useState(searchQuery);
  const [debouncedValue, clearDebounce] = useDebounce(inputValue, 800);
  const [isRecentSearchOpen, setIsRecentSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const previousSearchHistoryList = useMemo(() => {
    if (!isRecentSearchOpen || searchHistory.size === 0) return [];
    const foundSearchHits = Array.from(searchHistory).filter((query) => query.includes(inputValue));
    return foundSearchHits.slice(0, 10);
  }, [isRecentSearchOpen, searchHistory, inputValue])


  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (selectedIndex >= 0 && previousSearchHistoryList[selectedIndex]) {
        setInputValue(previousSearchHistoryList[selectedIndex]);
        setSearchQuery(previousSearchHistoryList[selectedIndex]);
      } else {
        clearDebounce();
        setSearchQuery(inputValue);
      }
      setIsRecentSearchOpen(false);
      setSelectedIndex(-1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev =>
        prev < previousSearchHistoryList.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > -1 ? prev - 1 : prev);
    }
  }


  useEffect(() => {
    setSearchQuery(debouncedValue);
  }, [debouncedValue]);


  return (
    <div className='border-b border-dashed border-border relative '>
      <div className='container_wrapper p-4'>
        <div className='container_wrapper rounded-3xl border border-input bg-muted px-4 py-2 flex items-center gap-2 relative '>
          <SearchIcon className='w-4 h-4' />
          <input
            type='text'
            placeholder='Search'
            className='w-full bg-transparent outline-none  '
            value={inputValue} onChange={(e) => {
              setInputValue(e.target.value)
              setIsRecentSearchOpen(true)
            }}
            onKeyDown={handleKeyPress}
            onFocus={() => setIsRecentSearchOpen(true)}
            onBlur={() => setIsRecentSearchOpen(false)}
          />
          {isRecentSearchOpen && previousSearchHistoryList.length > 0 && (
            <div className='absolute top-12 left-0 w-full bg-secondary/60 backdrop-blur-md rounded-xl shadow-md overflow-hidden '>
              {previousSearchHistoryList.map((query, index) => (
                <div key={query}
                  className={`p-2 hover:bg-muted-foreground/10 cursor-pointer border-b border-dashed border-border flex items-center gap-2 ${index === selectedIndex ? 'bg-muted-foreground/10' : ''
                    }`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setInputValue(query);
                    setSearchQuery(query);
                    setIsRecentSearchOpen(false);
                  }}
                >
                  <History className='w-4 h-4' />
                  {query}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default SearchBar