import { mensajesApi } from "../../helpers";

interface Options {
	name: string;
	password: string;
	email: string;
}

export async function registerUseCase({ email, name, password }: Options) {
	try {
		const resp = await mensajesApi.post("/api/auth/registrar", {
			body: JSON.stringify({ password, email, name }),
			headers: { "Content-Type": "application/json" },
		});

		return resp.ok;
	} catch (error) {
		return false;
	}
}
