import.meta.env;

interface EnvVars {
	SOCKET_HOST: string;
}

export const envs: EnvVars = {
	SOCKET_HOST: import.meta.env.VITE_SOCKET_HOST ?? "",
};
