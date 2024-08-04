import { mensajesApi } from "../../helpers";
import { ILoginResponse } from "../../interfaces";

export async function loginUseCase(email: string, password: string) {
	try {
		const resp = await mensajesApi.post("/api/auth/login", {
			body: JSON.stringify({ password, email }),
			headers: { "Content-Type": "application/json" },
		});

		if (!resp.ok) throw new Error("Error de autenticacion");

		const data = (await resp.json()) as ILoginResponse;
		localStorage.setItem("authToken", data.token);

		return { ok: true, usuario: data.usuario };
	} catch (error) {
		return { ok: false };
	}
}
