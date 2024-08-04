import { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string
}

export const RectangleButton = ({ label, ...props }: Props) => {
    return (
        <div className="container-login100-form-btn m-t-17">
            <button className="login100-form-btn" {...props}>
                {label}
            </button>
        </div>
    )
}
