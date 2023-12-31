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
					toast.success(
						`Bonds forged: Following ${data.following.username} in the firelight`
					)
				)
				.catch(() => {
					toast.error("Embers dim: Error encountered, please try again");
				});
		});
	};
	const handleUnFollow = () => {
		startTransition(() => {
			onUnFollow(userId)
				.then((data) =>
					toast.success(
						`Bonds severed: No longer journeying with ${data.following.username}`
					)
				)
				.catch(() => {
					toast.error("Embers dim: Error encountered, please try again");
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
					toast.success(
						`Sealed in the abyss: ${data.blocking.username} is now blocked.`
					);
				})
				.catch((err) => {
					toast.error("Embers dim: Error encountered, please try again");
				});
		});
	};
	// ADD-ONS
	const handleUnBlock = () => {
		startTransition(() => {
			onUnblock(userId)
				.then((data) => {
					toast.success(
						`Forgiveness in the flames: ${data.blocking.username} unblocked.`
					);
				})
				.catch((err) => {
					toast.error("Embers dim: Error encountered, please try again");
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
