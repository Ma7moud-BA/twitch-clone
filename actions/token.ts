"use server";
import { v4 } from "uuid";
import { AccessToken } from "livekit-server-sdk";

import { getSelf } from "@/lib/auth-service";
import { getUserById } from "@/lib/user-service";
import { isBlockedBy } from "@/lib/block-service";

export const createViewerToken = async (hostIdentity: string) => {
	let self;
	try {
		self = await getSelf();
	} catch {
		const id = v4();
		const username = `guest#${Math.floor(Math.random() * 1000)}`;
		self = { id, username };
	}
	const host = await getUserById(hostIdentity);

	if (!host) {
		throw new Error("User not found");
	}
	const isBlocked = await isBlockedBy(host.id);
	if (isBlocked) {
		throw new Error("User is blocked");
	}

	const isHost = self.id === host.id;

	const token = new AccessToken(
		process.env.LIVEKIT_API_KEY,
		process.env.LIVEKIT_API_SECRET,
		{
			// modifying the hostId because when creating the ingress we set the participantIdentity as self.id and that is the host id, and we can't have the same id twice in the room
			identity: isHost ? `host-${self.id}` : self.id,
			name: self.username,
		}
	);
	token.addGrant({
		room: host.id,
		roomJoin: true,
		canPublish: false,
		canPublishData: true,
	});

	return await Promise.resolve(token.toJwt());
};
