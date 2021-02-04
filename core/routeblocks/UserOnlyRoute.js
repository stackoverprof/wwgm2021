import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@core/contexts/AuthContext'

const UserOnlyRoute = ({children, redirect}) => {
    const { authState } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (authState !== 'user' && authState !== 'initial') {
            router.push(redirect)
        }
    }, [authState])

    return (
        <div>
           { authState === 'user' && children } 
        </div>
    )
}

export default UserOnlyRoute