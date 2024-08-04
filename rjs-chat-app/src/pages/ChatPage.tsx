import { useContext } from "react"
import { ChatSelect, InboxPeople, Messages } from "../components"
import { ChatContext } from "../context"

export const ChatPage = () => {
    const { state: { activeChat } } = useContext(ChatContext)
    return (
        <>
            <InboxPeople />
            {
                activeChat ? (<Messages />) : (<ChatSelect />)
            }
        </>
    )
}


