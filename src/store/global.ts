import { create } from 'zustand';

interface GlobalStore {
  itemsPerPage: number;
  setItemsPerPage: (count: number) => void;
}

export const useStore = create<GlobalStore>()((set) => ({
  itemsPerPage: 5,
  setItemsPerPage: (count) => set({ itemsPerPage: count }),
}));
