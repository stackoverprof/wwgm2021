import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import axios from 'axios'

import AdminOnlyRoute from '@core/routeblocks/AdminOnlyRoute'
import { useAuth } from '@core/contexts/AuthContext'
import { useLayout } from '@core/contexts/LayoutContext'
import FireFetcher from '@core/services/FireFetcher'
import AdminLayout from '@components/layouts/AdminLayout'
import CardManageUser from '@components/atomic/CardManageUser'

const ManageUsers = () => {
    const [allUsers, setAllUsers] = useState([])
    const [listAdmin, setListAdmin] = useState([])

    const { user, authState, access } = useAuth()
    const { setGlobalAlert } = useLayout()

    const fetchListAdmin = async () => {
        const res = await axios.post('/api/private/admin/list-admin', {
            authToken: await user.getIdToken()
        }).catch(err => setGlobalAlert({body: err.response.data.message, error: true}))
        setListAdmin(res.data.body)
    }

    useEffect(() => {
        if (Object.keys(user).length !== 0) {
            fetchListAdmin()
        }
    }, [user])

    useEffect(() => {
        const filler = allUsers
        filler.forEach(item => {
            if (listAdmin.includes(item.uid)) {
                item.adminLabeled = true
            }
        })
        setAllUsers(filler)
    }, [listAdmin, allUsers])

    useEffect(() => {
        const unlisten = FireFetcher.listen.allUsers({
            attach: async (docs) => { 
                let filler = [], a = [], b = []
                docs.forEach(doc => filler.push(doc.data()))
                filler.forEach(doc => {
                    if (doc.noPeserta !== '') a.push(doc)
                    else b.push(doc)
                })
                setAllUsers(a.concat(b))
            },
            detach: () => {
                setAllUsers([])
            }
        })
        
        return () => unlisten()
    }, [])

    return (
        <AdminOnlyRoute>
            { authState === 'user' && access.admin && (
                <AdminLayout css={style.page} title="Dashboard" className="flex-sc col">

                    <section css={style.header}>
                        <div className="inner contain-size-s flex-cc">
                            <h1>Manage All Users</h1>
                        </div>
                    </section>

                    <section css={style.usersList} className="users-list">
                        <div className="contain-size-l">
                            {allUsers.map((item, i) => (
                                <CardManageUser item={item} key={i} />
                            ))}
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

    usersList: css`
    
    `
}
export default ManageUsers