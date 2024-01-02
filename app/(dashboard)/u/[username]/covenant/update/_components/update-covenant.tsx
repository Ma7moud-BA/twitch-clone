("");
import { updateCovenant } from "@/actions/covenant";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog";
import { db } from "@/lib/db";
import { UploadDropzone } from "@/lib/uploadthing";
import { DialogTitle } from "@radix-ui/react-dialog";
import React from "react";

type UpdateCovenantProps = {
	id: string;
};
const UpdateCovenant = ({ id }: UpdateCovenantProps) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="link" className="text-emerald-600">
					Change logo
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Upload Logo</DialogTitle>
				</DialogHeader>
				<div className="rounded-xl border outline-dashed outline-muted">
					<UploadDropzone
						endpoint="covenantLogo"
						appearance={{
							label: {
								color: "#ffffff",
							},
							allowedContent: {
								color: "#ffffff",
							},
						}}
						onClientUploadComplete={async (res) => {
							updateCovenant(id, { logo: res[0].url });
						}}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default UpdateCovenant;
