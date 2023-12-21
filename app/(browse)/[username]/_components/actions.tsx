"use client";
import { useTransition } from "react";

import { onFollow, onUnFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { onBlock, onUnblock } from "@/actions/block";

type ActionsProps = {
	isFollowing: boolean;
	userId: string;
	isBlocking: boolean;
};
export const Actions = ({ isFollowing, userId, isBlocking }: ActionsProps) => {
	const [isPending, startTransition] = useTransition();
	const handleFollow = () => {
		startTransition(() => {
			onFollow(userId)
				.then((data) =>
					toast.success(`Your are now following ${data.following.username}`)
				)
				.catch(() => {
					toast.error("Something went wrong");
				});
		});
	};
	const handleUnFollow = () => {
		startTransition(() => {
			onUnFollow(userId)
				.then((data) =>
					toast.success(`Your unFollowed ${data.following.username}`)
				)
				.catch(() => {
					toast.error("Something went wrong");
				});
		});
	};
	const handleClickFollow = () => {
		if (isFollowing) {
			handleUnFollow();
		} else {
			handleFollow();
		}
	};
	const handleBlock = () => {
		startTransition(() => {
			onBlock(userId)
				.then((data) => {
					toast.success(`Blocked the user ${data.blocking.username}`);
				})
				.catch((err) => {
					toast.error("Something went wrong");
				});
		});
	};
	// ADD-ONS
	const handleUnBlock = () => {
		startTransition(() => {
			onUnblock(userId)
				.then((data) => {
					toast.success(`unBlocked the user ${data.blocking.username}`);
				})
				.catch((err) => {
					toast.error("Something went wrong");
				});
		});
	};
	const handleClickBlock = () => {
		if (isBlocking) {
			handleUnBlock();
		} else {
			handleBlock();
		}
	};
	return (
		<>
			<Button
				disabled={isPending}
				onClick={handleClickFollow}
				variant={"primary"}
			>
				{isFollowing ? "UnFollow" : "Follow"}
			</Button>
			<Button
				onClick={handleClickBlock}
				disabled={isPending}
				variant="destructive"
			>
				{isBlocking ? "UnBlock" : "Block"}
			</Button>
		</>
	);
};
