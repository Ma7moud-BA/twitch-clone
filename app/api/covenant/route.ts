import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextResponse) {
	const userId = await req.text();
	console.log(userId);
}
