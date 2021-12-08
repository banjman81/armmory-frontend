import React, {useState} from "react";
import './user.css'
import FirstNameHooks from "../hooks/signupHooks/FirstNameHooks";
import LastNameHooks from "../hooks/signupHooks/LastNameHooks";
import EmailHooks from "../hooks/signupHooks/EmailHooks";
import UsernameHooks from "../hooks/signupHooks/UsernameHooks";
import PasswordHooks from "../hooks/signupHooks/PasswordHooks";
import ConfirmPasswordHooks from "../hooks/signupHooks/ConfirmPasswordHooks";

import MainLogo from '../img/logo.svg'

function SignUp(){

    const [firstName, handleFirstNameOnChange, firstNameError, setFirstNameOnFocus, setFirstNameOnBlur] = FirstNameHooks()
    const [lastName, handleLastNameOnChange, lastNameError, setOnFocus, setOnBlur] = LastNameHooks()
    const [password, handlePasswordOnChange, passwordError, setPasswordOnFocus, setPasswordOnBlur] = PasswordHooks()
    const [confirmPassword, handleConfirmPasswordOnChange, confirmPasswordError, setConfirmPasswordOnFocus, setConfirmPasswordOnBlur] = ConfirmPasswordHooks()
    const [username, handleUsernameOnChange, usernameError, setUsernameOnFocus, setUsernameOnBlur] = UsernameHooks()
    const [email, handleEmailOnChange, emailError, setEmailOnFocus, setEmailOnBlur] = EmailHooks()

    async function handleSubmit(e){
        e.preventDefault()
        console.log(firstName)
    }

    return(
        <div className="form-wrapper">
            <div className="main-logo">
                <img src={MainLogo} alt="img" />
                <h1>Armmory</h1>
            </div>

            <form onSubmit={(e)=> handleSubmit(e)}>
                <div className="first-row-form">
                    <div className="form-floating" >
                        <input
                        style={{border : `1px solid ${firstNameError.length > 0 ? "rgba(241, 62, 62, 0.7)" : "rgba(0, 0, 0, 0.2)"}`, boxShadow : `0 0  ${firstNameError.length > 0 ? "rgba(241, 62, 62, 0.7)" : ""}`}}
                        name={firstName} 
                        onChange={(e) => handleFirstNameOnChange(e)}
                        onFocus={() => setFirstNameOnFocus(true)} 
                        onBlur={() => setFirstNameOnBlur(true) }
                        type="text"
                        className="form-control firstname"
                        id="firstName"
                        placeholder="First name"
                        />
                        <label htmlFor="floatingInput" style={{opacity : "0.8"}}>{firstNameError.length > 0 ? <span style={{color : 'red'}}>{firstNameError}</span>  : ("First Name")}</label>
                    </div>

                    <div className="form-floating">
                        <input
                        style={{border : `1px solid ${lastNameError.length > 0 ? "rgba(241, 62, 62, 0.7)" : "rgba(0, 0, 0, 0.2)"}`, boxShadow : `0 0  ${lastNameError.length > 0 ? "rgba(241, 62, 62, 0.7)" : ""}`}}
                        name={lastName} 
                        onChange={handleLastNameOnChange}
                        onFocus={() => setOnFocus(true)} 
                        onBlur={() => setOnBlur(true) }
                        type="text"
                        className="form-control lastname"
                        id="lastName"
                        placeholder="Last name"
                        />
                        <label htmlFor="floatingInput" style={{opacity : "0.8"}}>{lastNameError.length > 0 ? <span style={{color : 'red'}}>{lastNameError}</span>  : ("Last Name")}</label>
                    </div>
                </div>
                <div className="form-floating">
                    <input
                    style={{border : `1px solid ${usernameError.length > 0 ? "rgba(241, 62, 62, 0.7)" : "rgba(0, 0, 0, 0.2)"}`, boxShadow : `0 0  ${usernameError.length > 0 ? "rgba(241, 62, 62, 0.7)" : ""}`}}
                    name={username} 
                    onChange={handleUsernameOnChange} 
                    onFocus={() => setUsernameOnFocus(true)} 
                    onBlur={() => setUsernameOnBlur(true)}
                    type="text"
                    className="form-control "
                    id="username"
                    placeholder="Username"
                    />
                    <label htmlFor="floatingInput" style={{opacity : "0.8"}}>{usernameError.length > 0 ? <span style={{color : 'red'}}>{usernameError}</span>  : ("Username")}</label>
                </div>
        
                <div className="form-floating">
                    <input
                    style={{border : `1px solid ${emailError.length > 0 ? "rgba(241, 62, 62, 0.7)" : "rgba(0, 0, 0, 0.2)"}`, boxShadow : `0 0  ${emailError.length > 0 ? "rgba(241, 62, 62, 0.7)" : ""}`}}
                    name={email} 
                    onChange={handleEmailOnChange}
                    onFocus={()=> setEmailOnFocus(true)} 
                    onBlur={()=> setEmailOnBlur(true)}
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    />
                    <label htmlFor="floatingInput" style={{opacity : "0.8"}}>{emailError.length > 0 ? <span style={{color : 'red'}}>{emailError}</span>  : ("Email")}</label>
                </div>

                <div className="form-floating">
                    <input
                    style={{border : `1px solid ${passwordError.length > 0 ? "rgba(241, 62, 62, 0.7)" : "rgba(0, 0, 0, 0.2)"}`, boxShadow : `0 0  ${passwordError.length > 0 ? "rgba(241, 62, 62, 0.7)" : ""}`}}
                    type="password"
                    name={password} 
                    onChange={handlePasswordOnChange}
                    onFocus={()=> setPasswordOnFocus(true)} 
                    onBlur={()=> setPasswordOnBlur(true)}
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    />
                    <label htmlFor="floatingInput" style={{opacity : "0.8"}}>{passwordError.length > 0 ? <span style={{color : 'red'}}>{passwordError}</span>  : ("Password")}</label>
                </div>

                <div className="form-floating">
                    <input
                    style={{border : `1px solid ${confirmPasswordError.length > 0 ? "rgba(241, 62, 62, 0.7)" : "rgba(0, 0, 0, 0.2)"}`, boxShadow : `0 0  ${confirmPasswordError.length > 0 ? "rgba(241, 62, 62, 0.7)" : ""}`}}
                    type="password"
                    name={confirmPassword} 
                    onChange={handleConfirmPasswordOnChange}
                    onFocus={()=> setConfirmPasswordOnFocus(true)} 
                    onBlur={()=> setConfirmPasswordOnBlur(true)}
                    className="form-control"
                    id="floatingConfirmPassword"
                    placeholder="Confirm Password"
                    />
                    <label htmlFor="floatingInput" style={{opacity : "0.8"}}>{confirmPasswordError.length > 0 ? <span style={{color : 'red'}}>{confirmPasswordError}</span>  : ("Comfirm Password")}</label>
                </div>
        
                <button className="w-100 btn btn-lg sign-btn" type="submit">
                    Sign up
                </button>
                
            </form>
        </div>
    )
}

export default SignUp;