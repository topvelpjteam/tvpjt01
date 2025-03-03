import { create } from "zustand";

const useStore = create((set) => ({
  tabData: [
    { title: "메뉴", path: "/menu", active: true },
    { title: "서브메뉴", path: "/sub", active: false },
    { title: "서브메뉴2", path: "/sub2", active: false },
    { title: "서브메뉴3", path: "/sub3", active: false },
  ],
  setTabData: (value: any) => set({ tabData: value }),
}));

export default useStore;
