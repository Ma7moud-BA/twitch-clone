"use client";

import { useSideBar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ToggleSkeleton } from "./toggle";
import { RecommendedSkeleton } from "./recommended";
import { useIsClient } from "usehooks-ts";
type WrapperProps = {
	children: React.ReactNode;
};
const Wrapper = ({ children }: WrapperProps) => {
	const { collapsed } = useSideBar((state) => state);
	//!  using a combination of useEffect and useState to make sure to render the actual content only on the client to overcome the hydration error
	//! useEffect is only accessible on the client
	//! or use the useIsClient hook from the usehooks-ts lib which does the same exact thing
	// const [isClient, setIsClient] = useState(false);
	// useEffect(() => {
	// 	setIsClient(true);
	// }, []);

	const isClient = useIsClient();
	// rendering a skeleton on the server
	if (!isClient)
		return (
			<aside className="fixed w-[70px] lg:w-60 left-0 flex flex-col bg-background h-full border-r border-[#2D2E35] z-50">
				<ToggleSkeleton />
				<RecommendedSkeleton />
			</aside>
		);
	return (
		<aside
			className={cn(
				"fixed left-0 flex flex-col bg-background h-full border-r border-[#2D2E35] z-50",
				collapsed ? " w-[70px]" : " w-[70px] lg:w-60"
			)}
		>
			{children}
		</aside>
	);
};

export default Wrapper;
//!note: the collapsed state from the useSideBar is causing a hydration error on mobile because its default state is false and its accessed only on the client side, and since we render thing depending on it, it will cause a hydration error,
//! so a solution to this is to render a skeleton on the server then render the actual content on the client
