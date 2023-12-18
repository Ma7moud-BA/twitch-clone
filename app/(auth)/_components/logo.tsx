import { Poppins } from "next/font/google";
import Image from "next/image";
import { cn } from "@/lib/utils";

const font = Poppins({
	subsets: ["latin"],
	weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
	return (
		<div className="flex flex-col items-center gap-y-4">
			{" "}
			<div className="bg-white rounded-full p-1">
				<Image
					src="/bonfire-logo.png"
					width={80}
					height={80}
					alt="FireLinkStream"
				/>
			</div>
			<div className={cn("flex flex-col items-center", font.className)}>
				<p className="text-xl font-semibold">FireLink Stream</p>
				<p className="text-sm text-muted-foreground">Let&apos;s Play</p>
			</div>
		</div>
	);
};
