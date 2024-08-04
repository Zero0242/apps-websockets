
interface Props {
    body: string
    timestamp: Date
    /* avatar?: string */
    isSender: boolean
}



export const MessageItem = (props: Props) => {
    /* const messageType: string = useMemo(() => incoming ? "incoming_msg" : "outgoing_msg", [incoming]) */
    /* const isIncoming: boolean = useMemo(() => (props.avatar ?? '').length > 0, [props.avatar]) */

    if (!props.isSender) return (<IncomingMessage {...props} />)

    return (
        <div className="outgoing_msg">
            <div className="sent_msg">
                <p>{props.body}</p>
                <span className="time_date">{props.timestamp.toString()}</span>
            </div>
        </div>
    )
}


function IncomingMessage({ body, timestamp }: Props) {
    return (
        <div className="incoming_msg">
            <div className="incoming_msg_img">
                <img src={'https://picsum.photos/200'} alt={'user_icon_img'} />
            </div>
            <div className="received_msg">
                <div className="received_withd_msg">
                    <p>{body}</p>
                    <span className="time_date">{timestamp.toString()}</span>
                </div>
            </div>
        </div>
    )
}