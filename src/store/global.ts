import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StoriesVoteList } from '../types/story';

interface GlobalStore {
  //states
  itemsPerPage: number;
  searchQuery: string;
  searchHistory: Set<string>;
  totalResults: number;
  storiesVoteList: StoriesVoteList;
  //actions
  setItemsPerPage: (count: number) => void;
  setSearchQuery: (query: string) => void;
  addToSearchHistory: (query: string) => void;
  setTotalResults: (count: number) => void;
  setStoriesVoteList: (voteList: StoriesVoteList) => void;
}


const createPersistedStore = persist<Pick<GlobalStore, 'searchHistory' | 'storiesVoteList'> & { 
  setStoriesVoteList: (voteList: StoriesVoteList) => void 
}>(
  (set) => ({
    searchHistory: new Set() as Set<string>,
    storiesVoteList: {} as StoriesVoteList,
    setStoriesVoteList: (voteList) => set({ storiesVoteList: voteList }),
  }),
  {
    name: 'persistent-store',
    storage: {
      getItem: (name) => {
        const str = localStorage.getItem(name);
        if (!str) return null;
        const { state } = JSON.parse(str);
        return {
          state: {
            ...state,
            searchHistory: new Set(state.searchHistory),
            storiesVoteList: state.storiesVoteList || {}
          }
        };
      },
      setItem: (name, value) => {
        const serializedValue = {
          ...value,
          state: {
            ...value.state,
            searchHistory: Array.from(value.state.searchHistory),
            storiesVoteList: value.state.storiesVoteList
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
  totalResults: 0,
  setItemsPerPage: (count) => args[0]({ itemsPerPage: count, totalResults: 0 }),
  setSearchQuery: (query) => args[0]({ searchQuery: query }),
  setTotalResults: (count) => args[0]({ totalResults: count }),
  addToSearchHistory: (query: string) => args[0]((state) => ({
    searchHistory: new Set([...state.searchHistory, query])
  })),
  ...createPersistedStore(...args),
}));
