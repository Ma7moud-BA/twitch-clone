"use server";

import { blockUser, unblockUser } from "@/lib/block-service";
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
	// todo: Adapt to disconnect from liveStream
	//todo: Allow ability to kick the guest
	const blockedUser = await blockUser(id);

	revalidatePath("/");
	if (blockedUser) {
		revalidatePath(`/${blockedUser.blocking.username}`);
	}

	return blockedUser;
};

export const onUnblock = async (id: string) => {
	const unblockedUser = await unblockUser(id);

	revalidatePath("/");
	if (unblockedUser) {
		revalidatePath(`/${unblockedUser.blocking.username}`);
	}

	return unblockedUser;
};
