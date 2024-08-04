export interface ChatResponse {
	ok: boolean;
	mensajes: Mensaje[];
}

export interface Mensaje {
	id: number;
	senderId: number;
	recipientId: number;
	body: string;
	attachment: null;
	createdAt: Date;
	updatedAt: Date;
}
