import React, { useEffect, useMemo, useState } from 'react'
import { useStore } from '../../store/global';
import useDebounce from '../../hooks/use-debounce';
import { History, SearchIcon } from 'lucide-react';

type Props = {}

function SearchBar({ }: Props) {
  const { searchQuery, setSearchQuery, searchHistory } = useStore();
  const [inputValue, setInputValue] = useState(searchQuery);
  const [debouncedValue, clearDebounce] = useDebounce(inputValue, 800);
  const [searchInputFocused, setSearchInputFocused] = useState(false);


  const previousSearchHistoryList = useMemo(() => {
    if (!searchInputFocused || searchHistory.size === 0) return [];
    const foundSearchHits = Array.from(searchHistory).filter((query) => query.includes(inputValue));
    return foundSearchHits.slice(0, 10);
  }, [searchInputFocused, searchHistory, inputValue])


  // if user pressed enter while typing
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      clearDebounce();
      setSearchQuery(inputValue);
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
              setSearchInputFocused(true)
            }}
            onKeyDown={handleKeyPress}
            onFocus={() => setSearchInputFocused(true)}
            onBlur={() => setSearchInputFocused(false)}
          />
          {searchInputFocused && previousSearchHistoryList.length > 0 && (
            <div className='absolute top-12 left-0 w-full bg-secondary/60 backdrop-blur-md rounded-xl shadow-md overflow-hidden '>
              {previousSearchHistoryList.map((query) => (
                <div key={query} className='p-2 hover:bg-muted-foreground/10 cursor-pointer border-b border-dashed border-border flex items-center gap-2'
                onMouseDown={(e) => {
                  e.preventDefault();
                  setInputValue(query);
                  setSearchQuery(query);
                  setSearchInputFocused(false);
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