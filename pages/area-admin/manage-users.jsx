import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import axios from 'axios'

import AdminOnlyRoute from '@core/routeblocks/AdminOnlyRoute'
import { useAuth } from '@core/contexts/AuthContext'
import { useLayout } from '@core/contexts/LayoutContext'
import FireFetcher from '@core/services/FireFetcher'
import AdminLayout from '@components/layouts/AdminLayout'
import CardManageUser from '@components/atomic/CardManageUser'
// import QuickAddAccess from '@components/atomic/QuickAddAccess'

const ManageUsers = () => {
    const [allUsers, setAllUsers] = useState([])
    const [listAdmin, setListAdmin] = useState([])
    const [filter, setFilter] = useState([])

    const { user, authState, access } = useAuth()
    const { setGlobalAlert } = useLayout()

    const conditional = (array, method) => {
        // if (method.includes('hide-admin')) array = array.filter(item => !listAdmin.includes(item.uid))
        // if (method.includes('hide-approved')) array = array.filter(item => !item.approved)
        return array
    }

    const fetchListAdmin = async () => {
        await axios.post('/api/private/admin/list-admin', {
            authToken: await user.getIdToken()
        })
        .then(res => setListAdmin(res.data.body))
        .catch(err => setGlobalAlert({body: err.response.data.message, error: true}))
    }

    useEffect(() => {
        if (Object.keys(user).length !== 0) {
            fetchListAdmin()
        }
    }, [user])

    useEffect(() => {
        console.log(filter)
    }, [filter])

    useEffect(() => {
        const unlisten = FireFetcher.listen.allUsers({
            attach: async (docs) => { 
                let filler = [], a = [], b = []
                docs.forEach(doc => filler.push(doc.data()))
                setAllUsers(filler)
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
                <AdminLayout css={style.page} title="Admin Area" className="flex-sc col">

                    <section css={style.header}>
                        <div className="inner contain-size-s flex-cc col">
                            <h1>Manage All Users</h1>
                            {/* <QuickAddAccess /> */}
                            <p>(gunakan ctrl+f untuk pencarian)</p>
                            <div className="flex-cc">
                                <button onClick={() => setFilter(filter.includes('hide-admin') ? filter.filter(item => item !== 'hide-admin') : filter.push('hide-admin'))} className="show-admin bordered">
                                    {filter === 'hide-admin' ? 'Show admin' : 'Hide admin'}
                                </button>
                                <button onClick={() => setFilter(filter.includes('hide-approved') ? filter.filter(item => item !== 'hide-approved') : filter.push('hide-approved'))} className="show-admin bordered">
                                    {filter === 'hide-approved' ? 'Show approved' : 'Hide approved'}
                                </button>
                            </div>
                        </div>
                    </section>

                    <section css={style.usersList} className="users-list">
                        <div className="contain-size-l">
                            {conditional(allUsers, filter).map((item, i) => (
                                <CardManageUser itemId={item.uid} adminLabeled={listAdmin.includes(item.uid)} key={item.uid} i={i} />
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

            button.show-admin {
                font-size: 16px;
                padding: 6px 10px;
            }

            p {
                margin: 12px 0;
            }

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