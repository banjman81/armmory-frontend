import { useState, useEffect } from "react";
import { isEmail, isEmpty } from 'validator'

function EmailHooks() {
    const [ email, setEmail ] = useState("")
    const [ error, setError ] = useState("")

    const [onFocus, setOnFocus] = useState(false)
    const [onBlur, setOnBlur] = useState(false)

    useEffect(() => {
        if(onFocus) {
            if (email.length > 0){
                if (!isEmail(email)){
                    setError("invalid email")
                }
                if(isEmail(email)){
                    setError("")
                }
            }
        }
        if(onBlur){
            if (isEmpty(email)){
                setError("email cannot be empty")
            }
        }
    }, [email, onFocus, onBlur])

    function handleEmailOnChange(e){
        setEmail(e.target.value)
    }

    return [email, handleEmailOnChange, error, setOnFocus, setOnBlur]
}

export default EmailHooks;