import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../contexts/AuthContext'

const AdminOnlyRoute = ({children, redirect}) => {
    const { authState, role } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (authState !== 'initial' && !role.admin) {
            router.push(redirect)
        }
    }, [authState, role.admin])

    return (
        <div>
           { authState === 'user' && role.admin && children } 
        </div>
    )
}

export default AdminOnlyRoute