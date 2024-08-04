import { Link, useNavigate } from "react-router-dom";
import { CustomInput, RectangleButton } from "../components";
import * as UseCases from '../core/usecases/auth';
import { useForm } from "../hooks";

export const RegisterPage = () => {
    const navigate = useNavigate()
    const { handleChange, email, password, name } = useForm({
        email: "",
        password: "",
        name: ""
    })


    const handleSubmit = async (ev: any) => {
        ev.preventDefault()

        const resp = await UseCases.registerUseCase({ email, name, password })
        if (resp) {
            navigate('/auth/login')
        }
    }

    return (
        <form className="login100-form validate-form flex-sb flex-w" onSubmit={handleSubmit}>
            <span className="login100-form-title mb-3">
                Chat - Registro
            </span>

            <CustomInput
                type="text"
                name="name"
                placeholder="Nombre"
                value={name}
                onChange={handleChange}
            />

            <CustomInput
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleChange}
            />

            <CustomInput
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
            />

            <div className="row mb-3">
                <div className="col text-right">
                    <Link to="/auth/login" className="txt1">
                        Ya tienes cuenta?
                    </Link>
                </div>
            </div>

            <RectangleButton label="Crear cuenta" />

        </form>

    )
}
