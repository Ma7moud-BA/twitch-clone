import { useMemo } from "react";
import { Info } from "lucide-react";
import Hint from "@/components/hint";
type ChatInfoProps = {
	isChatDelayed: boolean;
	isChatFollowersOnly: boolean;
};

const ChatInfo = ({ isChatDelayed, isChatFollowersOnly }: ChatInfoProps) => {
	const hint = useMemo(() => {
		if (isChatFollowersOnly && !isChatDelayed) {
			return "Only followers chat";
		}
		if (!isChatFollowersOnly && isChatDelayed) {
			return "chat is delayed by 3 seconds";
		}
		if (isChatFollowersOnly && isChatDelayed) {
			return " Only followers chat, chat is delayed by 3 seconds";
		}
		return "";
	}, [isChatDelayed, isChatFollowersOnly]);
	const label = useMemo(() => {
		if (isChatFollowersOnly && !isChatDelayed) {
			return "Followers only";
		}
		if (!isChatFollowersOnly && isChatDelayed) {
			return "Slow mode active";
		}
		if (isChatFollowersOnly && isChatDelayed) {
			return " Followers only chat, Slow mode active ";
		}
	}, [isChatDelayed, isChatFollowersOnly]);
	if (!isChatDelayed && !isChatFollowersOnly) {
		return null;
	}

	return (
		<div className="p-2 text-muted-foreground bg-white/5  border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
			<Hint label={hint}>
				<Info className="w-4 h-4" />
			</Hint>
			<p className="text-xs font-semibold">{label}</p>
		</div>
	);
};

export default ChatInfo;
