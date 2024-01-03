import { Flame, LucideIcon, Shield, Skull, Sun, Sword } from "lucide-react";
import React from "react";

type CovenantLogoProps = {
	name: string;
};

const CovenantLogo = ({ name }: CovenantLogoProps) => {
	// Define a mapping object for covenant colors
	const covenantColors: Record<string, string> = {
		"Tarnished Order": "blue",
		"Warrior of the sunlight": "yellow",
		"Undead Legion": "gray",
		"Ember Covenant": "orange",
		// Add more covenants and colors as needed
	};

	// Get the color for the current covenant
	const color = covenantColors[name] || "white"; // Default to white if no match

	// Map the covenant name to its respective logo component
	const logoMapping: Record<string, LucideIcon> = {
		"Tarnished Order": Shield,
		"Warrior of the sunlight": Sun,
		"Undead Legion": Skull,
		"Ember Covenant": Flame,
		// Add more covenants and logos as needed
	};

	// Get the logo component for the current covenant
	const Logo = logoMapping[name] || Sword; // Default to Sword if no match

	return (
		<div style={{ color }}>
			<Logo />
		</div>
	);
};

export default CovenantLogo;
