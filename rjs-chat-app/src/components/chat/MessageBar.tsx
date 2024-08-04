import { useForm } from '../../hooks'

export const MessageBar = () => {
    const { handleChange, message, changeForm } = useForm({ message: '' })

    const onSubmit = (ev: any) => {
        ev.preventDefault()
        if (message.length < 3) return;

        console.log(`message ${message}`);


        changeForm({ message: '' })
    }

    return (
        <>
            <form className="type_msg row" onSubmit={onSubmit}>
                <div className="input_msg_write col-sm-9">
                    <input
                        type="text"
                        className="write_msg"
                        placeholder="Mensaje..."
                        name='message'
                        value={message}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-sm-3 text-center">
                    <button className="msg_send_btn mt-3" >
                        enviar
                    </button>
                </div>
            </form>
        </>

    )
}
