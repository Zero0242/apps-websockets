export const getEnvs = () => {
	import.meta.env;

	return {
		API_URL: (import.meta.env.VITE_API_URL ?? "") as string,
		API_CHAT: (import.meta.env.VITE_CHAT_URL ?? "") as string,
	};
};
