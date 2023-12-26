import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const getRecommended = async () => {
	let userId;
	try {
		const self = await getSelf();
		userId = self.id;
		console.log("selfId: ", self.id);
	} catch {
		userId = null;
	}
	let users = [];
	if (userId) {
		users = await db.user.findMany({
			where: {
				AND: [
					// don't recommend the user it self
					{ NOT: { id: userId } },
					//don't recommend the already followed users
					{ NOT: { followedBy: { some: { followerId: userId } } } },
					//don't recommend the users that are blocking the currently loggedIn user
					{
						NOT: {
							blocking: {
								some: {
									blockedId: userId,
								},
							},
						},
					},
				],
			},
			include: {
				stream: {
					// this data is passed to a client component so iam only getting the isLive entity from the stream model because i don't want to pass other entities from the model in the client side
					select: {
						isLive: true,
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});
	} else {
		users = await db.user.findMany({
			orderBy: {
				createdAt: "desc",
			},
			include: {
				stream: {
					// this data is passed to a client component so iam only getting the isLive entity from the stream model because i don't want to pass other entities from the model in the client side
					select: {
						isLive: true,
					},
				},
			},
		});
	}
	return users;
};
