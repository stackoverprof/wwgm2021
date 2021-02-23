import React, { useState } from 'react'
import { css } from '@emotion/react'

import AdminOnlyRoute from '@core/routeblocks/AdminOnlyRoute'
import AdminLayout from '@components/layouts/AdminLayout'
import { useAuth } from '@core/contexts/AuthContext'
import axios from 'axios'
import { useLayout } from '@core/contexts/LayoutContext'

const AreaAdmin = () => {
    const [issuedEmail, setIssuedEmail] = useState('')
    const { user, authState, access } = useAuth()
    const { setGlobalAlert } = useLayout()

    const handleSetAdmin = async (e) => {
        e.preventDefault()
        setGlobalAlert(null)
        
        axios.post('/api/private/admin/set', {
            authToken: await user.getIdToken(),
            email: issuedEmail
        })
        .then(res => {
            setIssuedEmail('')
            setGlobalAlert({error: false, body: res.data.message})
        })
        .catch(err => setGlobalAlert({error: true, body: err.response.data.message}))
    }

    return (
        <AdminOnlyRoute>
            { authState === 'user' && access.admin && (
                <AdminLayout css={style.page} title="Admin Area" className="flex-sc col">
                    <section>
                        <div className="inner contain-size-s flex-cc col">
                            <form onSubmit={handleSetAdmin} className="full-w">
                                <input type="email" value={issuedEmail} required onChange={e => setIssuedEmail(e.target.value)}/>
                                <button className="btn" type="submit">{alert === null ? <Spinner /> : 'set admin'}</button>
                            </form>
                        </div>
                    </section>
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