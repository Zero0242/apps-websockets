import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CustomInput, RectangleButton } from "../components";
import { AuthContext } from "../context";
import { useForm } from "../hooks";



export const LoginPage = () => {
    const { startLogin } = useContext(AuthContext)
    const navigate = useNavigate()
    const { handleChange, email, password } = useForm({
        email: "",
        password: ""
    })


    const handleSubmit = async (ev: any) => {
        ev.preventDefault()

        const resp = await startLogin(email, password)
        if (resp) {
            navigate('/chat', { replace: true })
        }
    }


    return (

        <form className="login100-form validate-form flex-sb flex-w" onSubmit={handleSubmit}>
            <span className="login100-form-title mb-3">
                Chat - Ingreso
            </span>

            <CustomInput
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={email}
            />

            <CustomInput
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={password}
            />

            <div className="row mb-3">
                <div className="col">
                    <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
                    <label className="label-checkbox100">
                        Recordarme
                    </label>
                </div>

                <div className="col text-right">
                    <Link to={'/auth/registro'} className="txt1">
                        Nueva cuenta?
                    </Link>
                </div>
            </div>

            <RectangleButton label="Ingresar" />

        </form>

    )
}
