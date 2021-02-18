import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'

import AdminOnlyRoute from '@core/routeblocks/AdminOnlyRoute'
import { to }from '@core/routepath'
import { useAuth } from '@core/contexts/AuthContext'
import AdminLayout from '@components/layouts/AdminLayout'
import FireFetcher from '@core/services/FireFetcher'

const ManageUsers = () => {
    const [allUsers, setAllUsers] = useState([])
    const { authState, access } = useAuth()

    useEffect(() => {
        const detacher = FireFetcher.listen.allUsers(docs => {
            let filler = []
            docs.forEach((doc) => {
                filler.push(doc.data())
            })
            setAllUsers(filler)
        })

        return () => detacher()
    }, [])

    return (
        <AdminOnlyRoute redirect={to._404}>
            { authState === 'user' && access.admin && (
                <AdminLayout css={style.page} title="Dashboard" className="flex-sc col">
                    
                </AdminLayout>
            )}
        </AdminOnlyRoute>
    )
}

const style = {
    page: css`

    `,
}
export default ManageUsers