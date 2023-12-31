"use client";
import { Switch } from "@/components/ui/switch";
import { ToastT, toast } from "sonner";
import { updateStream } from "@/actions/stream";
import { useTransition } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type ToggleCardProps = {
	field: "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";
	label: string;
	value: boolean;
};
const ToggleCard = ({ field, label, value }: ToggleCardProps) => {
	const [isPending, startTransition] = useTransition();
	const handleOnChange = () => {
		startTransition(() => {
			// field used in square brackets because its part of the Partial<Stream> values
			updateStream({ [field]: !value })
				.then(() => {
					toast.success(
						"Conversations kindled: Your chat settings have been updated."
					);
				})
				.catch(() => {
					toast.error("Embers dim: Error encountered, please try again");
				});
		});
	};
	return (
		<div className="rounded-xl bg-muted p-6">
			<div className="flex items-center justify-between">
				<p className="font-semibold shrink-0">{label}</p>
				<div className="space-y-2">
					<Switch
						disabled={isPending}
						onCheckedChange={handleOnChange}
						checked={value}
					>
						{" "}
						{value ? "On" : "Off"}
					</Switch>
				</div>
			</div>
		</div>
	);
};

export default ToggleCard;

export const ToggleCardSkeleton = () => {
	return <Skeleton className="rounded-xl p-10 w-full" />;
};
