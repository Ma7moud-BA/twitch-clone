"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const ErrorPage = () => {
	return (
		<div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
			<h1 className="text-4xl">404</h1>
			<p>An abyssal error has swallowed the page.</p>
			<Button variant="secondary" className="p-20" asChild>
				<Link
					href={"/"}
					className="flex flex-col items-center justify-center  "
				>
					<p>Use Homeward Bone to return to the main bonfire</p>
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

export default ErrorPage;
