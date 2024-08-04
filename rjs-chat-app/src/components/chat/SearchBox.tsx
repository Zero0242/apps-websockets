import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext, ChatContext } from "../../context"

export function SearchBox() {
    const { startLogout } = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        startLogout()
        dispatch({ type: 'remove-cache' })
        navigate('/auth/login')
    }

    return (
        <>

            {/* <!-- Searchbox inicio --> */}
            <div className="headind_srch">
                <div className="recent_heading mt-2">
                    <h4>Recientes</h4>
                </div>
                <div className="srch_bar">
                    <div className="stylish-input-group">
                        <button className="btn text-danger" onClick={handleLogout}>
                            Salir
                        </button>
                    </div>
                </div>
            </div>
            {/* <!-- Searchbox Fin --> */}
        </>
    )

}