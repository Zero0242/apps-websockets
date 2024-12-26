import type { Mensaje, Usuario } from "../../core/interfaces";

export interface ChatState {
	uid: number;
	activeChat: string | undefined;
	usuarios: Usuario[];
	mensajes: Mensaje[];
}

export type ChatAction =
	| { type: "remove-cache" }
	| { type: "set-active-chat"; payload: string }
	| { type: "set-usuarios"; payload: Usuario[] }
	| { type: "set-mensajes"; payload: Mensaje[] }
	| { type: "set-nuevo-mensaje"; payload: Mensaje };

export const chatReducer = (
	state: ChatState,
	action: ChatAction
): ChatState => {
	switch (action.type) {
		case "remove-cache":
			return {
				...state,
				activeChat: undefined,
				usuarios: [],
				mensajes: [],
			};
		case "set-active-chat":
			if (state.activeChat === action.payload) return state;
			return {
				...state,
				activeChat: action.payload,
				mensajes: [],
			};
		case "set-mensajes":
			return {
				...state,
				mensajes: action.payload,
			};
		case "set-nuevo-mensaje":
			if (
				state.activeChat === action.payload.recipientId ||
				state.activeChat === action.payload.senderId
			) {
				return {
					...state,
					mensajes: [...state.mensajes, action.payload],
				};
			}
			return state;
		case "set-usuarios":
			return {
				...state,
				usuarios: action.payload,
			};

		default:
			return state;
	}
};
