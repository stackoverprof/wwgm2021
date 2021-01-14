import React from 'react'
import Styled from '@emotion/styled'
import { useAuth } from '../../core/contexts/AuthContext'

const GoogleButton = () => {
    const { authMethods, seterrorCode } = useAuth()

    const handleGoogleAuth = () => {
        seterrorCode('')
        authMethods.handleGoogle()
    }

    return (
        <Wrapper onClick={handleGoogleAuth}>
            <img className="icon" src="/img/icons/google.svg" alt=""/>
            Sign in with Google
        </Wrapper>
    )
}

const Wrapper = Styled.button(() =>`
    
`)

export default GoogleButton