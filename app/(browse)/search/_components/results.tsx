import { getSearch } from "@/lib/search-service";
import ResultCard, { ResultCardSkeleton } from "./result-card";
import { Skeleton } from "@/components/ui/skeleton";

type ResultsProps = {
	term?: string;
};

const Results = async ({ term }: ResultsProps) => {
	const data = await getSearch(term);
	return (
		<div>
			<h2 className="text-lg font-semibold mb-4 ">
				Exploring the Abyss for &ldquo;{term}&rdquo;
			</h2>
			{data.length === 0 && (
				<p className="text-muted-foreground text-sm">
					Lost in the Void: No results found. The void echoes with the absence
					of your query.
				</p>
			)}
			<div className="flex flex-col gap-y-4">
				{data.map((result) => (
					<ResultCard key={result.id} data={result} />
				))}
			</div>
		</div>
	);
};

export default Results;

export const ResultsSkeleton = () => {
	return (
		<div>
			<Skeleton className="h-8 w-[290px] lg:w-[600px] mb-4" />
			<div className="flex flex-col gap-y-4">
				{[...Array(4)].map((_, i) => (
					<ResultCardSkeleton key={i} />
				))}
			</div>
		</div>
	);
};
