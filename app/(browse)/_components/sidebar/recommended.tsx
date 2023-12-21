"use client";
import { useSideBar } from "@/store/use-sidebar";
import { User } from "@prisma/client";
import UserItem, { UserItemSkeleton } from "./user-item";

type RecommendedProps = {
	data: User[];
};
const Recommended = ({ data }: RecommendedProps) => {
	const { collapsed } = useSideBar((state) => state);
	const showLabel = !collapsed && data.length;

	return (
		<div>
			{!!showLabel && (
				<div className="pl-6 mb-4">
					<p className="text-muted-foreground text-sm">Recommended</p>
				</div>
			)}
			<ul className="space-y-2 px-2">
				{data.map((user) => (
					<UserItem
						username={user.username}
						imageUrl={user.imageUrl}
						key={user.id}
						isLive={true}
					/>
				))}
			</ul>
		</div>
	);
};

export default Recommended;

export const RecommendedSkeleton = () => {
	return (
		<ul className="px-2">
			{[...Array(3)].map((g, i) => (
				<UserItemSkeleton key={i} />
			))}
		</ul>
	);
};
