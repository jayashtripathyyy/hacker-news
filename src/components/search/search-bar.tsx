import React, { useEffect, useState } from 'react'
import { useStore } from '../../store/global';
import useDebounce from '../../hooks/use-debounce';

type Props = {}

function SearchBar({ }: Props) {
  const { searchQuery, setSearchQuery } = useStore();
  const [inputValue, setInputValue] = useState(searchQuery);
  const debouncedValue = useDebounce(inputValue, 800);

  useEffect(() => {
    setSearchQuery(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className='border-b border-dashed border-border '>
      <div className='container_wrapper p-4'>
        <div className='container_wrapper rounded-3xl border border-input bg-muted px-4 py-2 flex items-center gap-2'>
          <input type='text' placeholder='Search' className='w-full bg-transparent outline-none' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        </div>
      </div>
    </div>
  )
}

export default SearchBar