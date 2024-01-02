"use client";
import { onUnblock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
type UnblockButtonProps = {
	userId: string;
};

export const UnblockButton = ({ userId }: UnblockButtonProps) => {
	const [isPending, startTransition] = useTransition();
	const handleUnblock = () => {
		startTransition(() => {
			onUnblock(userId)
				.then((result) => {
					toast.success(
						`Freed from the abyss: ${result.blocking.username} is now unblocked.`
					);
				})
				.catch(() => {
					toast.error("Embers dim. Error encountered, please try again");
				});
		});
	};

	return (
		<Button
			disabled={isPending}
			size="sm"
			variant="link"
			onClick={handleUnblock}
			className="text-emerald-600 w-full"
		>
			Unblock
		</Button>
	);
};
