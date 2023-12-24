import { create } from "zustand";

type CreatorSideBarStore = {
	collapsed: boolean;
	onExpand: () => void;
	onCollapse: () => void;
};
export const useCreatorSideBar = create<CreatorSideBarStore>((set) => ({
	collapsed: false,
	onExpand: () => set(() => ({ collapsed: false })),
	onCollapse: () => set(() => ({ collapsed: true })),
}));
