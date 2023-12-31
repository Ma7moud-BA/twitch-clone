//this hook is to create the identity of the user that is trying to watch a stream

import { toast } from "sonner";

import { useEffect, useState } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { createViewerToken } from "@/actions/token";

export const useViewerToken = (hostIdentity: string) => {
	//useEffect will fill out these stated information, these information is to have info of who is watching the stream, what is their token, their identity, using these infos the host will be able to kick users
	const [token, setToken] = useState("");
	const [name, setName] = useState("");
	const [identity, setIdentity] = useState("");

	useEffect(() => {
		const createToken = async () => {
			try {
				const viewerToken = await createViewerToken(hostIdentity);
				setToken(viewerToken);

				const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
					name?: string;
				};
				const name = decodedToken?.name;
				const identity = decodedToken?.jti;

				if (identity) {
					setIdentity(identity);
				}
				if (name) {
					setName(name);
				}
			} catch {
				toast.error("Embers dim: Error encountered, please try again");
			}
		};
		createToken();
	}, [hostIdentity]);

	return {
		token,
		name,
		identity,
	};
};
