"use client";

import { Button } from "@/components/ui/button";
import { CheckCheck, Copy } from "lucide-react";
import { useState } from "react";

type CopyButtonProps = {
	value?: string;
};
const CopyButton = ({ value }: CopyButtonProps) => {
	const [isCopied, setIsCopied] = useState(false);
	const onCopy = () => {
		if (!value) return;
		setIsCopied(true);
		// to write the value data in the system clipboard  using the navigator API
		navigator.clipboard.writeText(value);
		setTimeout(() => {
			setIsCopied(false);
		}, 1000);
	};
	const Icon = isCopied ? CheckCheck : Copy;
	return (
		<Button
			disabled={isCopied || !value}
			onClick={onCopy}
			variant="ghost"
			size="sm"
		>
			<Icon className="w-4 h-4" />
		</Button>
	);
};

export default CopyButton;
