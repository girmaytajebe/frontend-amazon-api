import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../DataProvider/DataProvider'
import { useEffect } from 'react'

function ProtectedRoute({children,msg,redirect}) {
    const navigate = useNavigate()
    const [{user}, dispatch]  = useContext(DataContext);
    useEffect (() => {
        if (!user) {
            navigate("/auth",{state:{msg, redirect}})
        }
    } , [ user])
    return children;

  
}

export default ProtectedRoute
