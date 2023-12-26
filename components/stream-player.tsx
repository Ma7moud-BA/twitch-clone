"use client";
import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";

type StreamPlayerProps = {
	user: User & { stream: Stream | null };
	stream: Stream;
	isFollowing: boolean;
};
const StreamPlayer = ({ stream, user, isFollowing }: StreamPlayerProps) => {
	const { identity, name, token } = useViewerToken(user.id);
	if (!token || !name || !identity) {
		return (
			//todo:modify this
			<div>Cannot watch the stream</div>
		);
	}
	return <div>Allowed to watch the stream</div>;
};

export default StreamPlayer;
