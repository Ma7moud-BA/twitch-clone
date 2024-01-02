import { Flame, LucideIcon, Shield, Skull, Sun, Sword } from "lucide-react";
import React from "react";

type CovenantLogoProps = {
	name: string;
};
const CovenantLogo = ({ name }: CovenantLogoProps) => {
	const Logo =
		name === "Tarnished Order"
			? Shield
			: name === "Warrior of the sunlight"
			? Sun
			: name === "Undead Legion"
			? Skull
			: name === "Ember Covenant"
			? Flame
			: Sword;

	return (
		<div>
			<Logo />
		</div>
	);
};

export default CovenantLogo;
