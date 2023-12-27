import StreamPlayer from "@/components/stream-player";
import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { getUserByUserName } from "@/lib/user-service";
import { currentUser } from "@clerk/nextjs";
type CreatorPageProps = {
	params: {
		username: string;
	};
};

const CreatorPage = async ({ params }: CreatorPageProps) => {
	const externalUser = await currentUser();
	const user = await getUserByUserName(params.username);

	if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
		throw new Error("UnAuthorized");
	}
	return (
		<div className="h-full">
			{/* since this is the creator dashboard isFollowing should always be true since the user is himself */}
			<StreamPlayer user={user} stream={user.stream} isFollowing />
		</div>
	);
};

export default CreatorPage;
