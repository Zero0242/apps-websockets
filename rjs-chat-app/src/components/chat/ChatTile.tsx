
interface Props {
    avatar: string
    username: string
    date: Date
    latestMessage: string
    active?: boolean
    online?: boolean
    onClick?: () => void
}

export const ChatTile = ({ avatar, username, date, latestMessage, active = false, online = false, onClick }: Props) => {
    return (
        <>
            <div className={`chat_list ${active ? 'active_chat' : ''}`} onClick={onClick}>
                <div className="chat_people">
                    <div className="chat_img">
                        <img src={avatar} alt={"userImage"} />
                    </div>
                    <div className="chat_ib">
                        <h5>{username} <span className="chat_date">{date.toDateString()}</span></h5>
                        {
                            online ? (
                                <span className="text-success">Online</span>
                            ) : (
                                <span className="text-danger">Offline</span>
                            )
                        }
                        <p>{latestMessage}</p>
                    </div>
                </div>

            </div>
        </>
    )
}
