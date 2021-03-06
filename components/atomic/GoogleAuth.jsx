import React from 'react'
import { useAuth } from '@core/contexts/AuthContext'

const GoogleButton = () => {
    const { authMethods, setErrorAuth } = useAuth()

    const handleGoogleAuth = () => {
        setErrorAuth('')
        authMethods.google()
    }

    return (
        <button onClick={handleGoogleAuth} className="btn">
            <img className="icon" src="/img/icons/google.svg" alt=""/>
            Sign in with Google
        </button>
    )
}

export default GoogleButton