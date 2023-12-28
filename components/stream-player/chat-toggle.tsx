"use client";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import Hint from "@/components/hint";

import { Button } from "@/components/ui/button";
import { useChatSidebar } from "@/store/use-chat-sidebar";

const ChatToggle = () => {
	const { collapsed, onExpand, onCollapse } = useChatSidebar((state) => state);

	const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;

	const onToggle = () => {
		if (collapsed) {
			onExpand();
		} else {
			onCollapse();
		}
	};
	const label = collapsed ? "Expand" : "Collapse";
	return (
		<Hint label={label} side="left" asChild>
			<Button
				variant="ghost"
				onClick={onToggle}
				className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
			>
				<Icon size={16} />
			</Button>
		</Hint>
	);
};

export default ChatToggle;
