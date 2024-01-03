"use client";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import React, { useState, useTransition } from "react";
import CovenantLogo from "./covenant-logo";
import { Button } from "@/components/ui/button";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";

type SelectCovenantProps = {
	data: {
		id: string;
		name: string;
		logo: string | null;
		createdAT: Date;
		updatedAt: Date;
	}[];
	joinedCovenant: string;
};
const SelectCovenant = ({ data, joinedCovenant }: SelectCovenantProps) => {
	const [covenantId, setCovenantId] = useState(joinedCovenant);
	const [isPending, startTransition] = useTransition();

	const handleOnSubmit = () => {
		startTransition(() => {
			updateUser({ covenantId: covenantId })
				.then((result) => {
					toast.success(
						`Welcome to ${result.Covenant.name}, where greatness awaits. Your commitment strengthens the covenant. Forge ahead with valor and purpose!`
					);
				})
				.catch(() => {
					toast.error("failed to join covenant");
				});
		});
	};
	return (
		<>
			<Select
				value={covenantId}
				onValueChange={(value) => {
					setCovenantId(value);
				}}
			>
				<SelectTrigger className="w-[300px]">
					<SelectValue placeholder="Covenant" />
				</SelectTrigger>
				<SelectContent>
					{data.map((covenant) => (
						<SelectItem
							value={covenant.id}
							key={covenant.id}
							className="flex w-[300px]"
						>
							<div className="flex gap-10  items-center  ">
								<span>{covenant.name}</span>
								<CovenantLogo name={covenant.name} />
							</div>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Button
				onClick={handleOnSubmit}
				className=""
				variant="primary"
				disabled={isPending}
			>
				Join
			</Button>
		</>
	);
};

export default SelectCovenant;
