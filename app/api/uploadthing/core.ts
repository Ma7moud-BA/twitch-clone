import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { dark } from "@clerk/themes";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	thumbnailUploader: f({
		image: {
			maxFileSize: "4MB",
			maxFileCount: 1,
		},
	})
		.middleware(async () => {
			// This code runs on your server before upload
			const self = await getSelf();
			if (!self) throw new Error("Unauthorized");

			// Whatever is returned here is accessible in onUploadComplete as `metadata`
			return { user: self };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			await db.stream.update({
				where: {
					userId: metadata.user.id,
				},
				data: {
					thumbnailUrl: file.url,
				},
			});
			// ! Whatever is returned here is sent to the clientSide `onClientUploadComplete` callback

			return { fileUrl: file.url };
		}),
	covenantLogo: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
		.middleware(async (req) => {
			// This code runs on your server before upload
			const self = await getSelf();
			console.log("reqGG", req);
			if (!self) throw new Error("Unauthorized");

			// Whatever is returned here is accessible in onUploadComplete as `metadata`
			return { user: self };
		})
		.onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
