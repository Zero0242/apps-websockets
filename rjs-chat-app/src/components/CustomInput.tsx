import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> { }

export const CustomInput = (props: Props) => {
    return (

        <div className="wrap-input100 validate-input mb-3">
            <input className="input100" {...props} />
            <span className="focus-input100"></span>
        </div>
    )
}
