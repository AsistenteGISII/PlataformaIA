

import { ChangeEventHandler, useState } from "react";

export function useForm<T> ( initialForm: T ) {

    const [ formState, setFormState ] = useState(initialForm);

    const onInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        const { name, value } = target;

        setFormState({
            ...formState,
            [ name ]: value
        })
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
    }
}