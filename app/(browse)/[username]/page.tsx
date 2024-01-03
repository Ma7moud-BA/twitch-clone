import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUserName } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { isBlockedBy } from "@/lib/block-service";
import StreamPlayer from "@/components/stream-player";

type UserPageProps = {
	params: {
		username: string;
	};
};

const UserPage = async ({ params }: UserPageProps) => {
	const { username } = params;
	const user = await getUserByUserName(username);
	if (!user || !user.stream) {
		notFound();
	}
	//
	const isFollowing = await isFollowingUser(user.id);
	const isBlocked = await isBlockedBy(user.id);
	if (isBlocked) {
		notFound();
	}

	return (
		<StreamPlayer isFollowing={isFollowing} stream={user.stream} user={user} />
	);
};

export default UserPage;
