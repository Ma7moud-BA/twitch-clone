import React from "react";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { db } from "@/lib/db";

const UpdateCovenants = async () => {
	const covenants = await db.covenant.findMany();

	return <DataTable columns={columns} data={covenants}></DataTable>;
};

export default UpdateCovenants;
