import { useContext } from 'react'
import { AuthContext, ChatContext } from '../../context'
import { MessageBar } from './MessageBar'
import { MessageItem } from './MessageItem'

export const Messages = () => {
    const { state: { mensajes } } = useContext(ChatContext)
    const { usuario } = useContext(AuthContext)

    const id = usuario!.id

    return (
        <>
            <div className="mesgs">

                {/* <!-- Historia inicio --> */}
                <div className="msg_history" id='MessageList'>
                    {
                        mensajes.map((e) => (
                            <MessageItem
                                key={e.id}
                                body={e.message}
                                timestamp={e.updatedAt}
                                isSender={e.senderId === id}
                            />

                        ))
                    }

                </div>
                {/* <!-- Historia Fin --> */}

                <MessageBar />

            </div>
        </>
    )
}


