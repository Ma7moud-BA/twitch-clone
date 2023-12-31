"use client";

import { useState, useTransition, useRef, ElementRef } from "react";
import { useRouter } from "next/navigation";

import {
	Dialog,
	DialogHeader,
	DialogContent,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";

type BioModalProps = {
	initialValue: string | null;
};
const BioModal = ({ initialValue }: BioModalProps) => {
	const [bio, setBio] = useState(initialValue || "");
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const closeRef = useRef<ElementRef<"button">>(null);
	const handleOnUpdateBio = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		startTransition(() => {
			updateUser({ bio: bio })
				.then(() => {
					toast.success(
						"Darkness revealed. Your bio has been updated at Firelink Stream. "
					);

					closeRef?.current?.click();
				})
				.catch(() => {
					toast.error("Embers dim. Error encountered, please try again");
				});
		});
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="link" className="ml-auto" size="sm">
					Edit
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit your bio</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleOnUpdateBio} className="space-y-4">
					<Textarea
						value={bio}
						onChange={(e) => setBio(e.target.value)}
						disabled={isPending}
						placeholder="Craft thy legend at Firelink Stream. Shape thy bio narrative anew."
						className="resize-none"
					/>
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

export default BioModal;
