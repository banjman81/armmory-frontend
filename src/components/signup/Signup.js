import React, {useState} from "react";
import './user.css'

function SignUp(){

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmaPassword] = useState('')
    const [adminPass, setAdminPass] = useState('')

    async function handleSubmit(e){
        e.preventDefault()
        console.log(firstName)
        console.log(lastName)
        console.log(username)
        console.log(email)
        console.log(password)
        console.log(confirmPassword)
        console.log(adminPass)
    }

    return(
        <div>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <table className="signup-table">
                    <tbody>
                        <tr>
                            <td><input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}placeholder="First Name"/></td>
                            <td><input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name"/></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><input className="full-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><input className="full-input" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><input className="full-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><input className="full-input" type="password" value={confirmPassword} onChange={(e) => setConfirmaPassword(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><input className="full-input" type="password" value={adminPass} onChange={(e) => setAdminPass(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><button>Submit</button></td>
                        </tr>
                    </tbody>
                </table>
                
            </form>
        </div>
    )
}

export default SignUp;