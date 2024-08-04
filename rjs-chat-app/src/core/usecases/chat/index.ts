import { mensajesApi } from "../../helpers";
import { ChatResponse } from "../../interfaces";

export async function getMessagesUseCase(de: number) {
	try {
		const resp = await mensajesApi.get(`/api/mensajes/chat/${de}`);

		const data = (await resp.json()) as ChatResponse;

		return data.mensajes;
	} catch (error) {
		return [];
	}
}
