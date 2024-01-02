import { db } from "@/lib/db";
import { UploadDropzone } from "@/lib/uploadthing";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Flame, LucideIcon, Shield, Skull, Sun } from "lucide-react";
import CovenantLogo from "./_components/covenant-logo";

const CovenantPage = async () => {
	const covenants = await db.covenant.findMany();

	return (
		<div className="p-6 text-2xl text-foreground space-y-4">
			<h1>Choose your covenant</h1>
			<Select>
				<SelectTrigger className="w-[300px]">
					<SelectValue placeholder="Covenant" />
				</SelectTrigger>
				<SelectContent>
					{covenants.map((covenant) => (
						<SelectItem
							value={covenant.id}
							key={covenant.id}
							className="flex w-[300px]"
						>
							<div className="flex gap-10  ">
								<span>{covenant.name}</span>
								<CovenantLogo name={covenant.name} />
							</div>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};

export default CovenantPage;
