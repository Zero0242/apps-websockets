import { useMemo } from "react"

interface Props {
    body: string
    timestamp: string
    avatar?: string
}



export const MessageItem = (props: Props) => {
    /* const messageType: string = useMemo(() => incoming ? "incoming_msg" : "outgoing_msg", [incoming]) */
    const isIncoming: boolean = useMemo(() => (props.avatar ?? '').length > 0, [props.avatar])
    if (isIncoming) return (<IncomingMessage {...props} />)

    return (
        <div className="outgoing_msg">
            <div className="sent_msg">
                <p>{props.body}</p>
                <span className="time_date">{props.timestamp}</span>
            </div>
        </div>
    )
}


function IncomingMessage({ body, timestamp, avatar }: Props) {
    return (
        <div className="incoming_msg">
            <div className="incoming_msg_img">
                <img src={avatar} alt={'user_icon_img'} />
            </div>
            <div className="received_msg">
                <div className="received_withd_msg">
                    <p>{body}</p>
                    <span className="time_date">{timestamp}</span>
                </div>
            </div>
        </div>
    )
}