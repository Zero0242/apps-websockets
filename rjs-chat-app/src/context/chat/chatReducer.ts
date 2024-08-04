import { Usuario } from "../../core/interfaces";

export interface ChatState {
	uid: number;
	activeChat: number | undefined;
	usuarios: Usuario[];
	mensajes: any[];
}

export type ChatAction =
	| { type: "foo" }
	| { type: "set-active-chat"; payload: number }
	| { type: "set-usuarios"; payload: Usuario[] }
	| { type: "set-mensajes"; payload: any[] };

export const chatReducer = (
	state: ChatState,
	action: ChatAction
): ChatState => {
	switch (action.type) {
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
		case "set-usuarios":
			return {
				...state,
				usuarios: action.payload,
			};

		default:
			return state;
	}
};
