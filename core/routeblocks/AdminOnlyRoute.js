import React from 'react'
import { useAuth } from '@core/contexts/AuthContext'
import _404 from '../../pages/404'

const AdminOnlyRoute = ({children}) => {
    const { authState, access } = useAuth()

    return (
    <>
        { authState === 'user' ? access.admin ? children : <_404 /> : '' } 
    </>
    )
}

export default AdminOnlyRoute