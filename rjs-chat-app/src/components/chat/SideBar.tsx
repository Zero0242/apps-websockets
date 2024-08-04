import { ChatTile } from "./ChatTile";


export function SideBar() {
    return (
        <>
            <div className="inbox_chat">
                <ChatTile
                    avatar="https://ptetutorials.com/images/user-profile.png"
                    username="Sunil Rajput "
                    latestMessage="Test, which is a new approach to have all solutions astrology under one roof."
                    date={new Date()}
                    online
                    active
                />

                {/* <!-- Espacio extra para scroll --> */}
                <div className="extra_space"></div>


            </div>
        </>
    )

}


