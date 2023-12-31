"use server";

import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateUser = async (values: Partial<User>) => {
	const self = await getSelf();
	const validData = {
		// to prevent the change by mistake of the username because that action is handled by clerk
		bio: values.bio,
	};
	const updatedUser = await db.user.update({
		where: { id: self.id },
		data: { ...validData },
	});

	revalidatePath(`/u/${self.username}`);
	revalidatePath(`/${self.username}`);
	return updatedUser;
};
