"use client";
import { format } from "date-fns";
import { stringToColor } from "@/lib/utils";
import { ReceivedChatMessage } from "@livekit/components-react";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import CovenantLogo from "@/app/(dashboard)/u/[username]/covenant/_components/covenant-logo";
import { Flame, Sword } from "lucide-react";
type ChatMessageProps = {
	data: ReceivedChatMessage;
};
const ChatMessage = ({ data }: ChatMessageProps) => {
	const self = useUser();
	const pathName = usePathname();
	const isHost = self.user?.username === pathName.slice(3);
	const color = stringToColor(data.from?.name || "");

	return (
		<div className="flex gap-2 p-2 rounded-md hover:bg-white/5">
			<p className="text-sm text-white/40">{format(data.timestamp, "HH:MM")}</p>
			<div className="flex flex-wrap items-center gap-1 grow  ">
				<p className="text-sm font-semibold whitespace-nowrap">
					<span
						className="truncate flex items-center justify-center gap-x-2"
						style={{ color: isHost ? "#50C878" : color }}
					>
						<Flame />
						{data.from?.name}:
					</span>
				</p>
				<p className="text-sm break-all">{data.message}</p>
			</div>
		</div>
	);
};

export default ChatMessage;
