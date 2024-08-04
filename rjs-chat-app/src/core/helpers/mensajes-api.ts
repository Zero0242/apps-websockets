import { getEnvs } from "./envs";
import { FetchClient } from "./fetch-client";

export const mensajesApi = new FetchClient(getEnvs().API_URL, {
	debugMode: true,
	headerInterceptor: () => {
		let headers: Record<string, string> = {};
		const token = localStorage.getItem("authToken");
		if (token) headers["Authorization"] = `Bearer ${token}`;
		return headers;
	},
});
