import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../contexts/AuthContext'

const GuestOnlyRoute = ({children, redirect}) => {
    const { authState } = useAuth()
    const router = useRouter()
    
    useEffect(() => {
        if (authState !== 'guest' && authState !== 'initial') {
            router.push(redirect)
        }
    }, [authState])

    return (
        <div>
           {authState === 'guest' && children}
        </div>
    )
}

export default GuestOnlyRoute