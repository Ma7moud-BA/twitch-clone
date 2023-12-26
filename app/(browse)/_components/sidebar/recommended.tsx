"use client";
import { useSideBar } from "@/store/use-sidebar";
import { Stream, User } from "@prisma/client";
import UserItem, { UserItemSkeleton } from "./user-item";

type RecommendedProps = {
	// include the stream because its included when retrieving the data from the db
	data: (User & { stream: { isLive: boolean } | null })[];
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
						isLive={user.stream?.isLive}
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
