import React, { ElementRef, useRef, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { UploadDropzone } from "@/lib/uploadthing";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { updateStream } from "@/actions/stream";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Hint from "@/components/hint";
import { Trash } from "lucide-react";
import Image from "next/image";
type InfoModalProps = {
	initialName: string;
	initialThumbnailUrl: string | null;
};
const InfoModal = ({ initialThumbnailUrl, initialName }: InfoModalProps) => {
	const [name, setName] = useState(initialName);
	const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);
	const [isPending, startTransition] = useTransition();
	const closeRef = useRef<ElementRef<"button">>(null);
	const router = useRouter();
	const handleOnChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};
	const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		startTransition(() => {
			updateStream({ name: name })
				.then(() => {
					toast.success("Ripples in the stream: Updates made successfully.");
					closeRef?.current?.click();
				})
				.catch(() => {
					toast.error("Embers dim: Error encountered, please try again");
				});
		});
	};
	const handleOnRemoveThumbnail = () => {
		startTransition(() => {
			updateStream({ thumbnailUrl: null })
				.then(() => {
					toast.success("Image extinguished: Thumbnail successfully removed.");
					setThumbnailUrl("");
					closeRef?.current?.click();
				})
				.catch(() => {
					toast.error("Embers dim: Error encountered, please try again");
				});
		});
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="ml-auto" size="sm" variant="link">
					Edit
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit your stream info</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmitForm} className="space-y-14">
					<div className="space-y-2">
						<Label>Name</Label>
						<Input
							placeholder="Stream name"
							onChange={handleOnChangeName}
							value={name}
							disabled={isPending}
						/>
					</div>
					<div className="space-y-2">
						<Label>Thumbnail</Label>
						{thumbnailUrl ? (
							<div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
								<div className="absolute top-2 right-2 z-10">
									<Hint label="Remove Thumbnail" asChild>
										<Button
											type="button"
											disabled={isPending}
											onClick={handleOnRemoveThumbnail}
											className="h-auto w-auto p-1.5"
										>
											<Trash className="h-4 w-4" />
										</Button>
									</Hint>
								</div>
								<Image
									src={thumbnailUrl}
									fill
									alt="thumbnail img"
									className="object-cover"
								/>
							</div>
						) : (
							<div className="rounded-xl border outline-dashed outline-muted">
								<UploadDropzone
									endpoint="thumbnailUploader"
									appearance={{
										label: {
											color: "#ffffff",
										},
										allowedContent: {
											color: "#ffffff",
										},
									}}
									onClientUploadComplete={(res) => {
										setThumbnailUrl(res?.[0]?.url);
										router.refresh();
										closeRef?.current?.click();
									}}
								/>
							</div>
						)}
					</div>
					<div className="flex justify-between">
						<DialogClose asChild>
							<Button type="button" variant="ghost" ref={closeRef}>
								Cancel
							</Button>
						</DialogClose>
						<Button type="submit" variant="primary" disabled={isPending}>
							Save
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default InfoModal;
