"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTitle,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from "@/components/ui/select";
const ConnectModal = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="primary"> Generate Connection</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle> Generate connection</DialogTitle>
				</DialogHeader>
				<Select>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Ingress Type" />
					</SelectTrigger>
					<SelectContent>
						{/* RTMP used for streaming */}
						<SelectItem value="RTMP">RTMP</SelectItem>
						<SelectItem value="WHIP">WHIP</SelectItem>
					</SelectContent>
				</Select>
				<Alert>
					<AlertTriangle size={16} />
					<AlertTitle> Warning!</AlertTitle>
					<AlertDescription>
						This action will reset all active stream using the current
						connection
					</AlertDescription>
				</Alert>
				<div className="flex justify-between">
					<DialogClose>
						<Button variant="ghost">Cancel</Button>
					</DialogClose>
					<Button onClick={() => {}} variant="primary">
						{" "}
						Generate
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ConnectModal;
