"use client";
import { cn } from "@/lib/utils";
import { useCreatorSideBar } from "@/store/use-creator-sidebar";

type WrapperProps = {
	children: React.ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
	const { collapsed } = useCreatorSideBar((state) => state);
	return (
		<div
			className={cn(
				"fixed left-0 h-full  bg-background flex flex-col border-r border-[#2D2E35] z-50",
				collapsed ? "w-[70px]" : "w-[70px] lg:w-60"
			)}
		>
			{children}
		</div>
	);
};

export default Wrapper;
