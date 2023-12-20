"use client";

import { cn } from "@/lib/utils";
import { useSideBar } from "@/store/use-sidebar";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

// !important note the children that are being rendered in this component will stay as server components, using the children is not affected by use client
// this container i used to move the content of the main page with the sidebar when it expand or collapse

const Container = ({ children }: { children: React.ReactNode }) => {
	const { collapsed, onCollapse, onExpand } = useSideBar((state) => state);
	//1024px is used because the lg breakpoint in tailwind is 1024
	const matches = useMediaQuery("(max-width:1024px)");
	useEffect(() => {
		if (matches) {
			// if we on mobile mode
			onCollapse();
		} else {
			onExpand();
		}
	}, [matches, onCollapse, onExpand]);
	return (
		<div
			className={cn("flex-1", collapsed ? "ml-[70px]" : "  ml-[70px] lg:ml-60")}
		>
			{children}
		</div>
	);
};

export default Container;
