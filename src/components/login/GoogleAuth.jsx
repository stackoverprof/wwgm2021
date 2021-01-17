import React from 'react'
import { useAuth } from '../../core/contexts/AuthContext'

const GoogleButton = () => {
    const { authMethods, setErrorCode } = useAuth()

    const handleGoogleAuth = () => {
        setErrorCode('')
        authMethods.handleGoogle()
    }

    return (
        <button onClick={handleGoogleAuth}>
            <img className="icon" src="/img/icons/google.svg" alt=""/>
            Sign in with Google
        </button>
    )
}

export default GoogleButton