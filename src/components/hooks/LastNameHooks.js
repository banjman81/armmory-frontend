import { useState, useEffect } from "react";
import {isAlpha} from 'validator'

function LastNameHooks() {
    const [lastName, setLastName] = useState('')
    const [error, setError] = useState('')

    const [onFocus, setOnFocus] = useState(false)
    const [onBlur, setOnBlur] = useState(false)

    useEffect(() => {
        if(onFocus){
            if(lastName.length > 0){
                if(!isAlpha(lastName)){
                    setError("invalid characters")
                }

                if(isAlpha(lastName)){
                    setError("")
                }
            }
        }
        if(onBlur){
            if (lastName.length === 0){
                setError("Last name cannot be empty")
            }
        }
    }, [lastName, onFocus, onBlur])

    function handleLastNameChange(e){
        setLastName(e.target.value)
    }

    return [lastName, handleLastNameChange, error, setOnFocus, setOnBlur]
}

export default LastNameHooks
