import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@core/contexts/AuthContext'

const GuestOnlyRoute = ({children, redirect}) => {
    const { authState } = useAuth()
    const router = useRouter()
    
    useEffect(() => {
        if (authState !== 'guest' && authState !== 'initial') {
            router.push(redirect)
        }
    }, [authState])

    return <> {authState === 'guest' && children} </>
}

export default GuestOnlyRoute