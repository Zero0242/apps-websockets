import React, { createContext, useReducer } from "react";
import { ChatAction, chatReducer, ChatState } from "./chatReducer";

interface ContextProps {
    state: ChatState
    dispatch: React.Dispatch<ChatAction>
}

export const ChatContext = createContext({} as ContextProps)

const initialState: ChatState = {
    uid: 0,
    activeChat: undefined,
    mensajes: [],
    usuarios: []
}

export const ChatProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(chatReducer, initialState)
    return (
        <ChatContext.Provider value={{ state, dispatch }}>
            {children}
        </ChatContext.Provider>
    )
}
