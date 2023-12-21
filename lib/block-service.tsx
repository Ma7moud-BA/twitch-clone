import { db } from "./db";
import { getSelf } from "./auth-service";

export const isBlockedBy = async (id: string) => {
	try {
		const self = await getSelf();
		const otherUser = await db.user.findUnique({ where: { id } });

		if (!otherUser) {
			throw new Error("User Not Found");
		}
		if (otherUser.id == self.id) {
			return false;
		}

		//using findUnique is faster than findFirst because it uses the index that is created in the from the @@unique constraint added in the schema model

		const existingBlock = await db.block.findUnique({
			where: {
				blockerId_blockedId: {
					blockerId: otherUser.id,
					blockedId: self.id,
				},
			},
		});

		return !!existingBlock;
	} catch (error) {}
};

export const blockUser = async (id: string) => {
	const self = await getSelf();

	if (self.id === id) {
		throw new Error("Cannot block yourself");
	}

	const otherUser = await db.user.findUnique({
		where: { id },
	});
	if (!otherUser) {
		throw new Error("User Not Found");
	}

	const existingBlock = await db.block.findUnique({
		where: {
			blockerId_blockedId: {
				blockerId: self.id,
				blockedId: otherUser.id,
			},
		},
	});
	if (existingBlock) {
		throw new Error("Already blocked");
	}
	const block = await db.block.create({
		data: {
			blockerId: self.id,
			blockedId: otherUser.id,
		},
		include: { blocking: true },
	});

	return block;
};

export const unblockUser = async (id: string) => {
	const self = await getSelf();

	if (self.id === id) {
		throw new Error("Cannot Unblock yourself");
	}

	const otherUser = await db.user.findUnique({
		where: { id },
	});
	if (!otherUser) {
		throw new Error("User Not Found");
	}

	const existingBlock = await db.block.findUnique({
		where: {
			blockerId_blockedId: {
				blockerId: self.id,
				blockedId: otherUser.id,
			},
		},
	});
	if (!existingBlock) {
		throw new Error("Not blocked");
	}

	const unblock = await db.block.delete({
		where: {
			blockerId_blockedId: {
				blockerId: self.id,
				blockedId: otherUser.id,
			},
		},
		include: { blocking: true },
	});
	return unblock;
};

export const isBlocking = async (id: string) => {
	const self = await getSelf();
	const otherUser = await db.user.findUnique({
		where: { id },
	});
	if (!otherUser) {
		throw new Error("User Not Found");
	}
	if (otherUser.id == self.id) {
		return false;
	}
	const existingBlock = await db.block.findUnique({
		where: {
			blockerId_blockedId: {
				blockerId: self.id,
				blockedId: otherUser.id,
			},
		},
	});
	return !!existingBlock;
};
