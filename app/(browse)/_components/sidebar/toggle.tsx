"use client";

import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSideBar } from "@/store/use-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

const Toggle = () => {
	const { collapsed, onCollapse, onExpand } = useSideBar((state) => state);
	const label = collapsed ? "Expand" : "Collapse";
	return (
		<>
			{collapsed && (
				<div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4 ">
					<Button onClick={onExpand} variant="ghost" className="h-auto p-2">
						<Hint label={label} side="right" asChild sideOffset={10}>
							<ArrowRightFromLine className="h-4 w-4" />
						</Hint>
					</Button>
				</div>
			)}
			{!collapsed && (
				<div className="flex items-center p-3 pl-6 w-full ">
					<p className="font-semibold text-primary">For you</p>
					<Button
						onClick={onCollapse}
						className="ml-auto h-auto p-2"
						variant="ghost"
					>
						<Hint label={label} side="right" asChild sideOffset={10}>
							<ArrowLeftFromLine />
						</Hint>
					</Button>
				</div>
			)}
		</>
	);
};

export default Toggle;

//!note: the collapsed state from the useSideBar is causing a hydration error on mobile because its default state is false and its accessed only on the client side, and since we render thing depending on it, it will cause a hydration error,
//! so a solution to this is to make a skeleton for this component that will be rendered on  the server and only then we gonna proceed to the client and render the actual thing
export const ToggleSkeleton = () => (
	<div className="p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full">
		<Skeleton className=" h-6 w-[100px]" />
		<Skeleton className=" h-6 w-6" />
	</div>
);
