"use client";

import { Fullscreen, Maximize, Minimize } from "lucide-react";

import Hint from "@/components/hint";

type FullScreenControlProps = {
	isFullScreen: boolean;
	onToggle: () => void;
};

const FullScreenControl = ({
	isFullScreen,
	onToggle,
}: FullScreenControlProps) => {
	const Icon = isFullScreen ? Minimize : Maximize;

	const label = isFullScreen ? "Exit fullscreen" : "Fullscreen";
	return (
		<div className="flex items-center justify-center gap-4">
			<Hint label={label} asChild>
				<button
					onClick={onToggle}
					className="text-white p-1.5 hover:bg-white/10 rounded-lg"
				>
					<Icon size={16} />
				</button>
			</Hint>
		</div>
	);
};

export default FullScreenControl;
