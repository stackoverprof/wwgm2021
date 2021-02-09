import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@core/contexts/AuthContext'

const AdminOnlyRoute = ({children, redirect}) => {
    const { authState, access } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (authState !== 'initial' && !access.admin) {
            router.push(redirect)
        }
    }, [authState, access.admin])

    return (
        <div>
           { authState === 'user' && access.admin && children } 
        </div>
    )
}

export default AdminOnlyRoute