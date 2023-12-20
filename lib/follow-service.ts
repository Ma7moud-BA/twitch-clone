import { db } from "./db";
import { getSelf } from "./auth-service";

export const isFollowingUser = async (id: string) => {
	try {
		const self = await getSelf();
		const otherUser = await db.user.findUnique({
			where: { id },
		});
		if (!otherUser) {
			throw new Error("User Not Found");
		}
		if (otherUser.id === self.id) {
			return true;
		}
		const existingFollow = await db.follow.findFirst({
			where: {
				followerId: self.id,
				followingId: otherUser.id,
			},
		});
		return !!existingFollow;
	} catch (error) {
		return false;
	}
};
export const followUser = async (id: string) => {
	const self = await getSelf();
	const otherUser = await db.user.findUnique({
		where: { id },
	});
	if (!otherUser) {
		throw new Error("User Not Found");
	}
	if (otherUser.id === self.id) {
		throw new Error("Cannot Follow Your Self");
	}
	const existingFollow = await db.follow.findFirst({
		where: {
			followerId: self.id,
			followingId: otherUser.id,
		},
	});
	if (existingFollow) {
		throw new Error("Already Following");
	}

	const follow = await db.follow.create({
		data: {
			followerId: self.id,
			followingId: otherUser.id,
		},
		include: {
			follower: true,
			following: true,
		},
	});
	return follow;
};
export const unFollowUser = async (id: string) => {
	const self = await getSelf();
	const otherUser = await db.user.findUnique({
		where: { id },
	});
	if (!otherUser) {
		throw new Error("User Not Found");
	}
	if (otherUser.id === self.id) {
		throw new Error("Cannot UnFollow Your Self");
	}
	const existingFollow = await db.follow.findFirst({
		where: {
			followerId: self.id,
			followingId: otherUser.id,
		},
	});
	if (!existingFollow) {
		throw new Error("Already UnFollowing");
	}

	const unFollow = await db.follow.delete({
		where: {
			id: existingFollow.id,
		},
		include: {
			following: true,
		},
	});
	return unFollow;
};
