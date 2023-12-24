import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

import { LogOut } from "lucide-react";

const Actions = () => {
	return (
		<div className="flex items-center justify-end gap-x-2">
			<Button
				size={"sm"}
				variant="ghost"
				className=" text-muted-foreground hover:text-primary"
				asChild
			>
				<Link href={"/"} className="flex">
					<LogOut className="h-5 w-5 mr-2" />
					Exit
				</Link>
			</Button>
			<UserButton afterSignOutUrl="/" />
		</div>
	);
};

export default Actions;
