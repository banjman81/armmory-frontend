import { useState, useEffect } from "react";
import {isStrongPassword} from 'validator'

function PasswordHooks(){
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const [onFocus, setOnFocus] = useState(false)
    const [onBlur, setOnBlur] = useState(false)

    useEffect(() => {
        if(onFocus){
            if(password.length > 0){
                if(!isStrongPassword(password)){
                setError("Password does not meet requirement")
                }

                if(isStrongPassword(password)){
                    setError("")
                }
            }
            
        }

        if(onBlur){
            if(password.length === 0){
                setError("password cannot be empty")
            }
        }
    }, [password, onBlur, onFocus])

    function handlePasswordOnChange(e){
        setPassword(e.target.value)
    }

    return [password, handlePasswordOnChange, error, setOnFocus, setOnBlur]
}

export default PasswordHooks