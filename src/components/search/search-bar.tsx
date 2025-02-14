import React, { useEffect, useState } from 'react'
import { useStore } from '../../store/global';
import useDebounce from '../../hooks/use-debounce';
import { SearchIcon } from 'lucide-react';

type Props = {}

function SearchBar({ }: Props) {
  const { searchQuery, setSearchQuery } = useStore();
  const [inputValue, setInputValue] = useState(searchQuery);
  const [debouncedValue, clearDebounce] = useDebounce(inputValue, 800);

  useEffect(() => {
    setSearchQuery(debouncedValue);
  }, [debouncedValue]);


  // if user pressed enter while typing
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      clearDebounce();
      setSearchQuery(inputValue);
    }
  }

  return (
    <div className='border-b border-dashed border-border '>
      <div className='container_wrapper p-4'>
        <div className='container_wrapper rounded-3xl border border-input bg-muted px-4 py-2 flex items-center gap-2 '>
          <SearchIcon className='w-4 h-4' />
          <input type='text' placeholder='Search' className='w-full bg-transparent outline-none  ' value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyPress} />
        </div>
      </div>
    </div>
  )
}

export default SearchBar