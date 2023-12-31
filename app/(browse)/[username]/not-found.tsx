import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "../_components/navbar/logo";

const NotFoundPage = () => {
	return (
		<div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
			<h1 className="text-4xl">404</h1>
			<p>Lost in the Abyss, The page you seek is beyond the flames.</p>
			<Button variant="secondary" className="p-20" asChild>
				<Link
					href={"/"}
					className="flex flex-col items-center justify-center  "
				>
					<p>Click to be homeward bound to the main bonfire.</p>
					<Image
						className="flex-1 object-cover"
						src="/bonfire-logo.png"
						width={100}
						height={100}
						alt="FireLinkStream"
					/>
				</Link>
			</Button>
		</div>
	);
};

export default NotFoundPage;
