import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUserName } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";

type UserPageProps = {
	params: {
		username: string;
	};
};

const UserPage = async ({ params }: UserPageProps) => {
	const { username } = params;
	const user = await getUserByUserName(username);
	if (!user) {
		notFound();
	}
	const isFollowing = await isFollowingUser(user.id);
	return (
		<div className="flex flex-col gap-y-4">
			<p>username:{user.username}</p>
			<p>userId:{user.id}</p>
			<p>is following:{`${isFollowing}`}</p>
			<Actions userId={user.id} isFollowing={isFollowing} />
		</div>
	);
};

export default UserPage;
