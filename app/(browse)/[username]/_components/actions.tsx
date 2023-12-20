"use client";
import { useTransition } from "react";

import { onFollow, onUnFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type ActionsProps = {
	isFollowing: boolean;
	userId: string;
};
export const Actions = ({ isFollowing, userId }: ActionsProps) => {
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
	const handleClick = () => {
		if (isFollowing) {
			handleUnFollow();
		} else {
			handleFollow();
		}
	};
	return (
		<Button disabled={isPending} onClick={handleClick} variant={"primary"}>
			{isFollowing ? "UnFollow" : "Follow"}
		</Button>
	);
};
