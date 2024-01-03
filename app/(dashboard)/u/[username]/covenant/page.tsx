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
import { useState } from "react";
import SelectCovenant from "./_components/select-covenant";
import { getSelf } from "@/lib/auth-service";

const CovenantPage = async () => {
	const covenants = await db.covenant.findMany();
	const self = await getSelf();

	return (
		<div className="p-6  text-foreground space-y-4">
			<h1 className="text-2xl font-semibold ">
				Welcome to Covenant Selection Page
			</h1>
			<p className="text-muted-foreground">
				Embark on a journey shaping destiny. Choose a covenant aligning with
				your character.
			</p>
			<h2>Covenant Highlights:</h2>
			<p className="text-muted-foreground">
				<span className="text-foreground">Chat Badges/Emotes:</span> Exclusive
				symbols for unique communication.
			</p>
			<ul className="text-muted-foreground list-disc   ">
				<h2 className="text-foreground">Coming Soon to covenants:</h2>
				<li>
					<span className="text-foreground">Challenges & Goals: </span> Unlock
					rewards with covenant-exclusive tasks.
				</li>
				<li>
					<span className="text-foreground">Inter-Covenant Events:</span> Forge
					alliances in battles, raids, and cooperative challenges.
				</li>
				<li>
					<span className="text-foreground">Covenant Leader boards: </span>{" "}
					Forge Track achievements and stand out in your covenant.
				</li>
				<li>
					<span className="text-foreground">Custom Emotes/Stickers:</span> Forge
					Design symbols reflecting your covenant&apos;s essence.
				</li>
			</ul>
			<p>
				Your choice is more than a decision—it&apos;s an entry into a dynamic
				community. Embrace your covenant’s power and let the adventure begin!
			</p>
			<SelectCovenant data={covenants} joinedCovenant={self.covenantId} />
		</div>
	);
};

export default CovenantPage;
