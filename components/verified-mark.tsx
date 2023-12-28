import { Verified } from "lucide-react";

const VerifiedMark = () => {
	return (
		<div className="p-0.5 flex items-center justify-center h-5 w-5 rounded-full bg-blue-600">
			<Verified className="h-5 w-5 text-primary stroke-[2px]" />
		</div>
	);
};

export default VerifiedMark;
