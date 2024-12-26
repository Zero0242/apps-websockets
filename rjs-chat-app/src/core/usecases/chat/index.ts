import { mensajesApi } from "../../helpers";
import { ChatResponse } from "../../interfaces";

export async function getMessagesUseCase(de: string) {
	try {
		const resp = await mensajesApi.get(`/api/mensajes/${de}`);

		const data = (await resp.json()) as ChatResponse[];

		return data;
	} catch (error) {
		return [];
	}
}
