import React, { useState } from 'react'
import { css } from '@emotion/react'

import AdminOnlyRoute from '@core/routeblocks/AdminOnlyRoute'
import AdminLayout from '@components/layouts/AdminLayout'
import { useAuth } from '@core/contexts/AuthContext'
import axios from 'axios'
import { useLayout } from '@core/contexts/LayoutContext'
import UserCard from '@components/atomic/UserCard'

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
                    
                    <section css={style.userCard}>
                        <UserCard />
                    </section>
                    
                    <section css={style.header}>
                        <div className="inner contain-size-s flex-cc col">
                            <h1>SET ADMIN</h1>
                        </div>
                    </section>
                    
                    <section css={style.setAdmin}>
                        <div className="inner contain-size-s flex-cc col">
                            <form onSubmit={handleSetAdmin} className="full-w flex-cc">
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
        padding-top: 24px;
    `,
    setAdmin: css`
        form {
            input, button {
                margin: 6px;
            }
        }
    `,
    userCard: css`
    
    `,
    header: css`
        .inner{
            padding: 48px 0;
            
            @media (max-width: 600px) {
                padding: 32px 0;
            }
        }
        
        h1 {
            font-family: Poppins;
            font-weight: 600;
            font-size: 40px;
            color: #1A2C1E;

            @media (max-width: 780px) {
                font-size: 28px;
            }
        }
    `,
}
export default AreaAdmin