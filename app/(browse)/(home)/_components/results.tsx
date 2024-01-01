import { getStreams } from "@/lib/feed-service";
import ResultCard, { ResultCardSkeleton } from "./result-card";
import { Skeleton } from "@/components/ui/skeleton";

const Results = async () => {
	const data = await getStreams();
	return (
		<div>
			<h2 className="text-lg font-semibold mb-4">
				Explore streams chosen by the kindled flame of recommendations.
			</h2>
			{data.length === 0 && (
				<div className="text-muted-foreground text-sm">
					The abyss echoes with the absence of streams.
				</div>
			)}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
				{data.map((result) => (
					<ResultCard key={result.id} data={result} />
				))}
			</div>
		</div>
	);
};

export default Results;

export const ResultSkeleton = () => {
	return (
		<div>
			<Skeleton className="h-8 w-[290px]  md:w-[600px] mb-4" />
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
				{[...Array(4)].map((_, i) => {
					return <ResultCardSkeleton key={i} />;
				})}
			</div>
		</div>
	);
};
