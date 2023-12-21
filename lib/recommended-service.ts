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
				],
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
		});
	}
	return users;
};
