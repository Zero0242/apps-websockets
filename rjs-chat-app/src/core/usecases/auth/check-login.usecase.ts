import { mensajesApi } from "../../helpers";
import { ILoginResponse } from "../../interfaces";

export async function checkLoginUseCase() {
	try {
		const resp = await mensajesApi.get("/api/auth/login");
		if (!resp.ok) throw new Error("Error de autenticacion");

		const data = (await resp.json()) as ILoginResponse;

		return { ok: true, usuario: data.usuario };
	} catch (error) {
		return { ok: false };
	}
}
