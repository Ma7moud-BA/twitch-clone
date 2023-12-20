"use server";

import { followUser, unFollowUser } from "@/lib/follow-service";
import { revalidatePath } from "next/cache";

export const onFollow = async (id: string) => {
	try {
		const followedUser = await followUser(id);

		revalidatePath("/");
		if (followedUser) {
			revalidatePath(`/${followedUser.following.username}`);
		}
		return followedUser;
	} catch (error) {
		throw new Error("Internal Error");
	}
};

export const onUnFollow = async (id: string) => {
	try {
		const UnFollowedUser = await unFollowUser(id);

		revalidatePath("/");
		if (UnFollowedUser) {
			revalidatePath(`/${UnFollowedUser.following.username}`);
		}
		return UnFollowedUser;
	} catch (error) {
		throw new Error("Internal Error");
	}
};
