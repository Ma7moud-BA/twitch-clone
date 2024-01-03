"use client";

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import {
	useChat,
	useConnectionState,
	useRemoteParticipant,
} from "@livekit/components-react";
import { useMediaQuery } from "usehooks-ts";
import { ConnectionState } from "livekit-client";
import { useEffect, useMemo, useState } from "react";
import ChatHeader, { ChatHeaderSkeleton } from "./chat-header";
import ChatForm, { ChatFormSkeleton } from "./chat-form";
import ChatList, { ChatListSkeleton } from "./chat-list";
import ChatCommunity from "./chat-community";
import { Covenant, User } from "@prisma/client";
import { Shield } from "lucide-react";

type ChatProps = {
	viewerName: string;
	hostName: string;
	hostIdentity: string;
	isFollowing: boolean;
	isChatEnabled: boolean;
	isChatDelayed: boolean;
	isChatFollowersOnly: boolean;
};

const Chat = ({
	hostIdentity,
	hostName,
	isChatDelayed,
	isChatEnabled,
	isChatFollowersOnly,
	isFollowing,

	viewerName,
}: ChatProps) => {
	const matches = useMediaQuery("(max-width:1024px)");
	const { onExpand, variant } = useChatSidebar((state) => state);
	const connectionState = useConnectionState();
	const participant = useRemoteParticipant(hostIdentity);
	const isOnline = participant && connectionState === ConnectionState.Connected;

	const isHidden = !isChatEnabled || !isOnline;
	const [value, setValue] = useState("");
	// !important: the useChat hook takes an options in which you can define the room to let it know where to send and receive messages, but i didn't pass anything, the reason it knows that its in this viewer token because its wrapped in a liveKitRoom component with the token and the serverURl in the index.tsx file
	const { chatMessages: messages, send } = useChat();
	useEffect(() => {
		if (matches) {
			onExpand();
		}
	}, [matches, onExpand]);

	const reversedMessages = useMemo(() => {
		return messages.sort((a, b) => b.timestamp - a.timestamp);
	}, [messages]);

	const onSubmit = () => {
		if (!send) return;
		send(value);
		setValue("");
	};
	const onChange = (value: string) => {
		setValue(value);
	};

	return (
		<div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
			<ChatHeader />
			{variant === ChatVariant.CHAT && (
				<>
					<ChatList messages={reversedMessages} isHidden={isHidden} />
					<ChatForm
						onSubmit={onSubmit}
						value={value}
						onChange={onChange}
						isHidden={isHidden}
						isChatFollowersOnly={isChatFollowersOnly}
						isChatDelayed={isChatDelayed}
						isChatEnabled={isChatEnabled}
						isFollowing={true}
					/>
				</>
			)}
			{variant === ChatVariant.COMMUNITY && (
				<p>
					<ChatCommunity
						viewerName={viewerName}
						hostName={hostName}
						isHidden={isHidden}
					/>
				</p>
			)}
		</div>
	);
};

export default Chat;

export const ChatSkeleton = () => {
	return (
		<div className="flex flex-col border-1 border-b pt-0 h-[calc(100vh-80px)] border-2">
			<ChatHeaderSkeleton />
			<ChatListSkeleton />
			<ChatFormSkeleton />
		</div>
	);
};
