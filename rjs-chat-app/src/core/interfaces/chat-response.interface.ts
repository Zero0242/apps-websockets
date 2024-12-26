export interface ChatResponse extends Mensaje {}

export interface Mensaje {
	id: string;
	senderId: string;
	recipientId: string;
	message: string;
	attachment: null;
	createdAt: Date;
	updatedAt: Date;
}
