import { currentUser } from "@clerk/nextjs";

import { db } from "./db";

export const getSelf = async () => {
	const self = await currentUser();

	if (!self || !self.username) {
		throw new Error("UnAuthorized");
	}

	const user = await db.user.findUnique({
		where: {
			externalUserId: self?.id,
		},
		include: {
			Covenant: true,
		},
	});
	if (!user) {
		throw new Error("Not Found");
	}

	return user;
};

// to load the creator dashboard using the username
// another way of doing it is just to user /dashboard, but using the username allow modularity in the future, like you can enable some moderator which can modify specific username and more
export const getSelfByUsername = async (username: string) => {
	const self = await currentUser();
	if (!self || !self.username) {
		throw new Error("Unauthorized");
	}
	const user = await db.user.findUnique({ where: { username } });
	if (!user) {
		throw new Error("User Not Found");
	}

	// to make sure you the user is the logged in, and to prevent any user to access another user's dashboard
	if (self.username !== user.username) {
		throw new Error("Unauthorized");
	}

	return user;
};
