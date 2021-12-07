import React from "react";

function SignUp(){

    return(
        <div className="App">
            <form>
                <table>
                    <tbody>
                        <tr>
                            <td>First Name</td>
                            <td><input type="text" /></td>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            <td><input type="text" /></td>
                        </tr>
                        <tr>
                            <td>Username</td>
                            <td><input type="text" /></td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td><input type="text" /></td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td><input type="password" /></td>
                        </tr>
                        <tr>
                            <td>Confirm Password</td>
                            <td><input type="password" /></td>
                        </tr>
                        <tr>
                            <td>Admin Pass</td>
                            <td><input type="password" /></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default SignUp;