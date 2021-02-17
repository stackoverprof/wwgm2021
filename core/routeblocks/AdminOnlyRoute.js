import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@core/contexts/AuthContext'

// [TODO] : DOnt redirect, return 404 instead

const AdminOnlyRoute = ({children, redirect}) => {
    const { authState, access } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (authState !== 'initial' && !access.admin) {
            router.push(redirect)
        }
    }, [authState, access.admin])

    return <> { authState === 'user' && access.admin && children } </>
}

export default AdminOnlyRoute