import { useState } from 'react';

const useInputFormField = () => {
    const [value, setValue] = useState('')
    const onChange = (e) => {
        setValue(e.target.value)
    }

    const initialValue = (val) => {
        setValue(val)
    }

    return { value, onChange, initialValue }
}

export default useInputFormField;