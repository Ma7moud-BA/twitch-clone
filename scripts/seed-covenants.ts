const { PrismaClient } = require("@prisma/client");
const database = new PrismaClient();
async function main() {
	const covenantData = [
		{ name: "Tarnished Order", logo: "/public/covenants/sword.svg" },
		{ name: "Warrior of the sunlight", logo: "public/covenants/sun.svg" },

		{ name: "Ember Covenant", logo: "public/covenants/flame.svg" },
		{ name: "Undead Legion", logo: "public/covenants/skull.svg" },
	];

	try {
		for (const { name, logo } of covenantData) {
			await database.covenant.createMany({
				data: {
					name,
					logo,
				},
			});
		}
		// await database.Covenant.createMany({
		// 	data: [
		// 		{
		// 			name: "Tarnished Order",
		// 		},
		// 		{
		// 			name: "Warrior of the sunlight",
		// 		},
		// 		{ name: "Ember Covenant" },
		// 		{ name: "Undead Legion" },
		// 	],
		// });
		console.log("covenants added successfully");
	} catch (error) {
		console.log("Error seeding the database covenants", error);
	} finally {
		await database.$disconnect();
	}
}

main();

/**
 * ! TO UPLOAD THE CATEGORIES TO THE DATABASE RUN THE COMMAND "node scripts/seed-covenants.ts "
 */
