import { useState } from 'react'


interface ChangeProps {
    target: {
        name: string
        value: string
    }
}

export const useForm = <T extends Object>(initialValues: T) => {
    const [formState, setFormState] = useState(initialValues)


    const handleChange = ({ target }: ChangeProps) => {
        setFormState({
            ...formState,
            [target.name]: target.value
        })
    }
    const changeForm = (state: T) => setFormState(state)

    return {
        formState,
        ...formState,
        handleChange,
        changeForm,
    }
}
