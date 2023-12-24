"use client";

import { cn } from "@/lib/utils";
import { useCreatorSideBar } from "@/store/use-creator-sidebar";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

type ContainerProps = {
	children: React.ReactNode;
};
const Container = ({ children }: ContainerProps) => {
	const { collapsed, onCollapse, onExpand } = useCreatorSideBar();
	const matches = useMediaQuery("(max-width:1024px)");
	useEffect(() => {
		if (matches) {
			onCollapse();
		} else {
			onExpand();
		}
	}, [matches, onCollapse, onExpand]);
	return (
		<div
			className={cn("flex-1", collapsed ? "ml-[70px]" : "ml-[70px] lg:ms-60")}
		>
			{children}
		</div>
	);
};

export default Container;
