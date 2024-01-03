import { db } from "@/lib/db";

// this function is to load any user at all
export const getUserByUserName = async (username: string) => {
	const user = await db.user.findUnique({
		where: {
			username,
		},
		select: {
			id: true,
			username: true,
			bio: true,
			imageUrl: true,
			externalUserId: true,
			Covenant: true,
			covenantId: true,
			// its dangerous to include the entire stream here so select what is necessary only
			stream: {
				select: {
					id: true,
					isLive: true,
					isChatDelayed: true,
					isChatEnabled: true,
					isChatFollowersOnly: true,
					thumbnailUrl: true,
					name: true,
				},
			},
			// this will return the number of the followedBy for this user
			_count: {
				select: {
					followedBy: true,
				},
			},
		},
	});
	return user;
};

export const getUserById = async (id: string) => {
	const user = await db.user.findUnique({
		where: {
			id,
		},
		include: {
			stream: true,
		},
	});
	return user;
};
