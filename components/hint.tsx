import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
type HintProps = {
	label: string;
	children: React.ReactNode;
	asChild?: boolean;
	side?: "top" | "right" | "bottom" | "left";
	align?: "center" | "end" | "start";
	sideOffset?: number;
};

const Hint = ({
	label,
	children,
	align,
	asChild,
	side,
	sideOffset,
}: HintProps) => {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={0}>
				{/* enable asChild when wrapping a button to overcome the hydration errors */}
				<TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
				<TooltipContent
					className="text-black bg-white"
					sideOffset={sideOffset}
					side={side}
					align={align}
				>
					<p>{label}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default Hint;
