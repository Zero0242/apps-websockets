import { useContext } from "react";
import { AuthContext, ChatContext } from "../../context";
import { ChatTile } from "./ChatTile";


export function SideBar() {
    const { usuario } = useContext(AuthContext)
    const { dispatch, state } = useContext(ChatContext)
    const { usuarios, activeChat } = state

    const setActive = (id: number) => {
        dispatch({ type: 'set-active-chat', payload: id })
    }

    return (
        <>
            <div className="inbox_chat">
                {
                    usuarios.filter((e) => e.id !== usuario?.id).map(params => (
                        <ChatTile
                            key={JSON.stringify(params)}
                            avatar={params.avatar}
                            date={new Date()}
                            latestMessage={""}
                            username={params.name}
                            active={params.id === activeChat}
                            online={params.online}
                            onClick={() => setActive(params.id)}
                        />

                    ))
                }

                {/* <!-- Espacio extra para scroll --> */}
                <div className="extra_space"></div>


            </div>
        </>
    )

}


