import React, {useContext} from 'react'

import {UserContext} from '../context/userContext'

function Profile() {
    const {user} = useContext(UserContext)
    console.log(user)
    return (
        <div>
            <h1>Hello world</h1>
        </div>
    )
}

export default Profile
