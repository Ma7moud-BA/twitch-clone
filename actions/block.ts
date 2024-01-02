"use server";

import { getSelf } from "@/lib/auth-service";
import { blockUser, unblockUser } from "@/lib/block-service";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
	process.env.LIVEKIT_API_URL!,
	process.env.LIVEKIT_API_KEY!,
	process.env.LIVEKIT_API_SECRET!
);
export const onBlock = async (id: string) => {
	const self = await getSelf();
	let blockedUser;
	try {
		blockedUser = await blockUser(id);
	} catch (error) {
		//this means user is a guest
	}

	try {
		// this will work for both loggedIn and loggedOut users because it doesn't care about the db it just kicks the user
		await roomService.removeParticipant(self.id, id);
	} catch (error) {
		// this means user is not in the room
	}
	revalidatePath(`/u/${self.username}/community`);
	if (blockedUser) {
		revalidatePath(`/${blockedUser.blocking.username}`);
	}

	return blockedUser;
};

export const onUnblock = async (id: string) => {
	const self = await getSelf();
	const unblockedUser = await unblockUser(id);

	revalidatePath(`/u/${self.username}/community`);

	return unblockedUser;
};
