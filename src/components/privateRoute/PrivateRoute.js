import React from 'react'
import {Navigate, useLocation} from 'react-router-dom'
import CheckToken from '../hooks/CheckToken'

function PrivateRoute({children}) {
    const {checkJwtToken} = CheckToken()
    const location = useLocation()

    if(checkJwtToken()){
        return children
    }
    else{
        return <Navigate to="/signin" state={{from: location}} />
    }
}

export default PrivateRoute
