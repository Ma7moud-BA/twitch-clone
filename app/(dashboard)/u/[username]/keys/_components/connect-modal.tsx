"use client";
import { ElementRef, useRef, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";

import { IngressInput } from "livekit-server-sdk";
import { createIngress } from "@/actions/ingress";
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
import { toast } from "sonner";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;
const ConnectModal = () => {
	const closeRef = useRef<ElementRef<"button">>(null);
	const [isPending, startTransition] = useTransition();
	const [ingressType, setIngressType] = useState<IngressType>(RTMP);

	const onSubmit = () => {
		startTransition(() => {
			createIngress(parseInt(ingressType))
				.then(() => {
					toast.success("Gateway forged. Ingress successfully created.");
					closeRef?.current?.click();
				})
				.catch((err) => {
					console.log("error", err.message);
					toast.error("Embers dim. Error encountered, please try again");
				});
		});
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="primary"> Generate Connection</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle> Generate connection</DialogTitle>
				</DialogHeader>
				<Select
					disabled={isPending}
					value={ingressType}
					onValueChange={(value) => setIngressType(value)}
				>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Ingress Type" />
					</SelectTrigger>
					<SelectContent>
						{/* RTMP used for streaming */}
						<SelectItem value={RTMP}>RTMP</SelectItem>
						<SelectItem value={WHIP}>WHIP</SelectItem>
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
					<DialogClose ref={closeRef} asChild>
						<Button variant="ghost">Cancel</Button>
					</DialogClose>
					<Button disabled={isPending} onClick={onSubmit} variant="primary">
						Generate
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ConnectModal;
