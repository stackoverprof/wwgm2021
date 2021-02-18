import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@core/contexts/AuthContext'
import _404 from '../../pages/404'

// [TODO] : DOnt redirect, return 404 instead

const AdminOnlyRoute = ({children, redirect}) => {
    const { authState, access } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (false && authState !== 'initial' && !access.admin) {
            router.push(redirect)
        }
    }, [authState, access.admin])

    return (
    <> 
        <_404 />
        { authState === 'user' && access.admin && children } 
    </>
    )
}

export default AdminOnlyRoute