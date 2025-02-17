import { create } from "zustand";

const useStore = create((set) => ({
  isblock: "flex",
  setIsBlock: (value: string) => set({ isblock: value }),
}));

export default useStore;
