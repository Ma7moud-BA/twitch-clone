"use client";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { onFollow, onUnFollow } from "@/actions/follow";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
type ActionsProps = {
	isFollowing: boolean;
	isHost: boolean;
	hostIdentity: string;
};
const Actions = ({ hostIdentity, isFollowing, isHost }: ActionsProps) => {
	const { userId } = useAuth();
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const handleFollow = () => {
		startTransition(() => {
			onFollow(hostIdentity)
				.then((data) =>
					toast.success(`You are now following ${data.following.username}`)
				)
				.catch(() => {
					toast.error("Something went wrong");
				});
		});
	};
	const handleUnFollow = () => {
		startTransition(() => {
			onUnFollow(hostIdentity)
				.then((data) =>
					toast.success(`You have unFollowed ${data.following.username}`)
				)
				.catch(() => {
					toast.error("Something went wrong");
				});
		});
	};
	const handleToggleFollow = () => {
		if (!userId) {
			return router.push("/sign-in");
		}
		if (isHost) return;

		if (isFollowing) {
			handleUnFollow();
		} else {
			handleFollow();
		}
	};
	return (
		<Button
			disabled={isPending || isHost}
			variant="primary"
			onClick={handleToggleFollow}
			size="sm"
			className="w-full lg:w-auto"
		>
			<Heart
				className={cn("h-4 w-4 mr-2", isFollowing ? "fill-white" : "fill-none")}
			/>
			{isFollowing ? "UnFollow" : "Follow"}
		</Button>
	);
};

export default Actions;

export const ActionSkeleton = () => {
	return <Skeleton className="h-10 w-full lg:w-24" />;
};
