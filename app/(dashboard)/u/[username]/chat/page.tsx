import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";
import React from "react";
import ToggleCard from "./_components/toggle-card";

type ChatPageProps = {
	params: { username: string };
};
const ChatPage = async ({ params }: ChatPageProps) => {
	const self = await getSelf();
	const stream = await getStreamByUserId(self.id);
	const { username } = params;

	if (!stream) {
		throw new Error("Stream not found");
	}
	return (
		<div className="p-6">
			<div className="mb-4">
				<h1 className=" text-2xl font-bold">Chat Setting</h1>
			</div>
			<div className="space-y-4">
				<ToggleCard
					field="isChatEnabled"
					label="Enable chat"
					value={stream.isChatEnabled}
				/>
				<ToggleCard
					field="isChatFollowersOnly"
					label="Followers only chat"
					value={stream.isChatFollowersOnly}
				/>
				<ToggleCard
					field="isChatDelayed"
					label="Delay chat"
					value={stream.isChatDelayed}
				/>
			</div>
		</div>
	);
};

export default ChatPage;
