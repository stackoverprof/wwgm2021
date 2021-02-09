import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@core/contexts/AuthContext'

const AdminOnlyRoute = ({children, redirect}) => {
    const { authState, user } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (authState !== 'initial' && !user.role.admin) {
            router.push(redirect)
        }
    }, [authState, user.role.admin])

    return (
        <div>
           { authState === 'user' && user.role.admin && children } 
        </div>
    )
}

export default AdminOnlyRoute