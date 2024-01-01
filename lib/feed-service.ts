import { db } from "./db";
import { getSelf } from "./auth-service";
export const getStreams = async () => {
	let userId;
	try {
		const self = await getSelf();
		userId = self.id;
	} catch (error) {
		userId == null;
	}
	let streams = [];

	if (userId) {
		streams = await db.stream.findMany({
			where: {
				// making sure that this user "we are trying to query" is not blocking the logged in user
				user: {
					NOT: {
						blocking: {
							some: {
								blockedId: userId,
							},
						},
					},
				},
			},

			select: {
				user: true,
				isLive: true,
				thumbnailUrl: true,
				name: true,
				id: true,
			},

			orderBy: [{ isLive: "desc" }, { updatedAt: "desc" }],
		});
	} else {
		streams = await db.stream.findMany({
			select: {
				user: true,
				isLive: true,
				thumbnailUrl: true,
				name: true,
				id: true,
			},
			orderBy: [{ isLive: "desc" }, { updatedAt: "desc" }],
		});
	}
	return streams;
};
