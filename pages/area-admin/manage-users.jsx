import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'

import AdminOnlyRoute from '@core/routeblocks/AdminOnlyRoute'
import { to }from '@core/routepath'
import { useAuth } from '@core/contexts/AuthContext'
import FireFetcher from '@core/services/FireFetcher'
import AdminLayout from '@components/layouts/AdminLayout'
import CardManageUser from '@components/atomic/CardManageUser'

const ManageUsers = () => {
    const [allUsers, setAllUsers] = useState([])
    const { authState, access } = useAuth()

    useEffect(() => {
        const detacher = FireFetcher.listen.allUsers(docs => {
            let filler = []
            docs.forEach((doc) => {
                filler.push(doc.data())
            })

            const resorting = (array) => {
                let pass = [], fail = []
                array.forEach(item => {
                    if (item.noPeserta !== '') pass.push(item)
                    else fail.push(item)
                })
                return pass.concat(fail)
            }

            filler = resorting(filler)

            setAllUsers(filler)
        })

        return () => detacher()
    }, [])

    return (
        <AdminOnlyRoute redirect={to._404}>
            { authState === 'user' && access.admin && (
                <AdminLayout css={style.page} title="Dashboard" className="flex-sc col">
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

    usersList: css`
    
    `
}
export default ManageUsers