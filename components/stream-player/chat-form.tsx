"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ChatInfo from "./chat-info";

type ChatFormProps = {
	onSubmit: () => void;
	value: string;
	onChange: (value: string) => void;
	isHidden: boolean;
	isChatFollowersOnly: boolean;
	isChatDelayed: boolean;
	isChatEnabled: boolean;
	isFollowing: boolean;
};

const ChatForm = ({
	isChatDelayed,
	isChatEnabled,
	isChatFollowersOnly,
	isHidden,
	onChange,
	onSubmit,
	isFollowing,
	value,
}: ChatFormProps) => {
	const delayTime = 3000;
	const [isDelayBlocked, setIsDelayBlocked] = useState(false);
	const isFollowersOnlyAndNotFollowing = isChatFollowersOnly && !isFollowing;
	const isDisabled =
		isHidden || isDelayBlocked || isFollowersOnlyAndNotFollowing;

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();
		if (!value || isDisabled) return;

		if (isChatDelayed && !isDelayBlocked) {
			setIsDelayBlocked(true);
			setTimeout(() => {
				setIsDelayBlocked(false);
				onSubmit();
			}, delayTime);
		} else {
			onSubmit();
		}
	};
	if (isHidden) {
		return null;
	}
	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col items-center gap-y-4"
		>
			<div className="w-full">
				<ChatInfo
					isChatDelayed={isChatDelayed}
					isChatFollowersOnly={isChatFollowersOnly}
				/>
				<Input
					onChange={(e) => {
						onChange(e.target.value);
					}}
					value={value}
					disabled={isDisabled}
					placeholder="Send a message"
					className={cn(
						"border-white/10 ",
						(isChatFollowersOnly || isChatDelayed) &&
							"rounded-t-none border-t-0 "
					)}
				/>
			</div>
			<div className="ml-auto">
				<Button type="submit" value="primary" size="sm" disabled={isDisabled}>
					Chat
				</Button>
			</div>
		</form>
	);
};

export default ChatForm;

export const ChatFormSkeleton = () => {
	return (
		<div className=" flex flex-col items-center gapy4 p-3">
			<Skeleton className="h-10 w-full" />
			<div className="flex items-center gap-x-2 ml-auto">
				<Skeleton className="h-7 w-7" />
				<Skeleton className="h-7 w-12" />
			</div>
		</div>
	);
};
