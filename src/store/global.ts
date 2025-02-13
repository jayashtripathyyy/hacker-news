import { create } from 'zustand';

interface GlobalStore {
  itemsPerPage: number;
  setItemsPerPage: (count: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useStore = create<GlobalStore>()((set) => ({
  itemsPerPage: 20,
  setItemsPerPage: (count) => set({ itemsPerPage: count }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
