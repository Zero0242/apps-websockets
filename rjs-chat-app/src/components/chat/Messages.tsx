import { MessageBar } from './MessageBar'
import { MessageItem } from './MessageItem'

export const Messages = () => {
    return (
        <>
            <div className="mesgs">

                {/* <!-- Historia inicio --> */}
                <div className="msg_history">
                    <MessageItem
                        body='Hello'
                        timestamp='11:01 AM | June 9'
                    />
                    <MessageItem
                        body='Hello'
                        timestamp='11:01 AM | June 9'
                        avatar='https://picsum.photos/300'
                    />
                    <MessageItem
                        body='Hello'
                        timestamp='11:01 AM | June 9'
                        avatar='https://picsum.photos/300'
                    />
                    <MessageItem
                        body='Hello'
                        timestamp='11:01 AM | June 9'
                        avatar='https://picsum.photos/300'
                    />




                </div>
                {/* <!-- Historia Fin --> */}

                <MessageBar />

            </div>
        </>
    )
}


