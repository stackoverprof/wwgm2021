import React from 'react'
import { css } from '@emotion/react'

import AdminOnlyRoute from '@core/routeblocks/AdminOnlyRoute'
import AdminLayout from '@components/layouts/AdminLayout'
import { to }from '@core/routepath'
import { useAuth } from '@core/contexts/AuthContext'

const AreaAdmin = () => {
    const { authState, access } = useAuth()

    return (
        <AdminOnlyRoute redirect={to.home}>
            { authState === 'user' && access.admin && (
                <AdminLayout css={style.page} title="Dashboard" className="flex-sc col">
                    <h1>You made it to be here in admin control, but will never with the server</h1>
                </AdminLayout>
            )}
        </AdminOnlyRoute>
    )
}

const style = {
    page: css`

    `,
}
export default AreaAdmin