import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GlobalStore {
  //states
  itemsPerPage: number;
  searchQuery: string;
  searchHistory: Set<string>;
  //actions
  setItemsPerPage: (count: number) => void;
  setSearchQuery: (query: string) => void;
  addToSearchHistory: (query: string) => void;
}


const createPersistedSearchHistory = persist<Pick<GlobalStore, 'searchHistory'> & { addToSearchHistory: (query: string) => void }>(
  (set) => ({
    searchHistory: new Set() as Set<string>,
    addToSearchHistory: (query: string) => set((state) => {
      const newHistory = new Set(state.searchHistory);
      newHistory.add(query);
      return { searchHistory: newHistory };
    }),
  }),
  {
    name: 'search-history',
    storage: {
      getItem: (name) => {
        const str = localStorage.getItem(name);
        if (!str) return null;
        const { state } = JSON.parse(str);
        return {
          state: {
            ...state,
            searchHistory: new Set(state.searchHistory)
          }
        };
      },
      setItem: (name, value) => {
        const serializedValue = {
          ...value,
          state: {
            ...value.state,
            searchHistory: Array.from(value.state.searchHistory)
          }
        };
        localStorage.setItem(name, JSON.stringify(serializedValue));
      },
      removeItem: (name) => localStorage.removeItem(name),
    },
  }
);

export const useStore = create<GlobalStore>()((...args) => ({
  itemsPerPage: 20,
  searchQuery: '',
  setItemsPerPage: (count) => args[0]({ itemsPerPage: count }),
  setSearchQuery: (query) => args[0]({ searchQuery: query }),
  ...createPersistedSearchHistory(...args),
}));
