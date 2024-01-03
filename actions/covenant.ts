"use server";

import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";

// import { getSelf } from "@/lib/auth-service";
// import { db } from "@/lib/db";
// import { Covenant } from "@prisma/client";
// import { revalidatePath } from "next/cache";

// export const updateCovenant = async (id: string, values: Partial<Covenant>) => {
// 	const self = await getSelf();
// 	const validData = {
// 		name: values.name,
// 		logo: values.logo,
// 	};
// 	try {
// 		const covenant = await db.covenant.update({
// 			where: { id },
// 			data: { ...validData },
// 		});

// 		revalidatePath(`/u/${self.username}/covenant/update`);

// 		revalidatePath(`/u/${self.username}`);
// 		revalidatePath(`/${self.username}`);
// 		return covenant;
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// export const getCovenantName = async (userId: string | undefined) => {
// 	console.log("userIDIDID", userId);
// 	let self;
// 	let covenantName;
// 	try {
// 		self = await getSelf();
// 		covenantName = await db.user.fin;
// 	} catch (error) {
// 		self = null;
// 	}

// 	return userId;
// };
