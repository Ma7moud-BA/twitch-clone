import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

const receiver = new WebhookReceiver(
	process.env.LIVEKIT_API_KEY!,
	process.env.LIVEKIT_API_SECRET!
);

export async function POST(req: Request) {
	const body = await req.text();
	const headerPayload = headers();
	const authorization = headerPayload.get("Authorization");
	console.log("gg", 1);
	if (!authorization) {
		return new Response("No authorization header", { status: 400 });
	}

	const event = receiver.receive(body, authorization);
	console.log(event.event);
	if (event.event === "ingress_ended") {
		await db.stream.update({
			where: {
				ingressId: event.ingressInfo?.ingressId,
			},
			data: {
				isLive: false,
			},
		});
	}
	console.log(event.event);
	if (event.event === "ingress_started") {
		console.log("gg", 2);
		await db.stream.update({
			where: {
				ingressId: event.ingressInfo?.ingressId,
			},
			data: {
				isLive: true,
			},
		});
	}
	return new NextResponse(JSON.stringify(`${event.event}`), { status: 200 });
}
