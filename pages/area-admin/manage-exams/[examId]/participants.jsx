import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'

import AdminOnlyRoute from '@core/routeblocks/AdminOnlyRoute'
import { useAuth } from '@core/contexts/AuthContext'
import AdminLayout from '@components/layouts/AdminLayout'
import FireFetcher from '@core/services/FireFetcher'
import CardManageUser from '@components/atomic/CardManageUser'

const Participants = () => {
    const [allParticipants, setAllParticipants] = useState([])
    const { authState, access } = useAuth()
    const { query: { examId } } = useRouter()

    useEffect(() => {
        if (examId) {
            FireFetcher.listen.examParticipants(examId, {
                attach: doc => {
                    setAllParticipants(doc.data().participants)
                },
                detach: () => {
                    setAllParticipants([])
                }
            })

        }
    }, [examId])

    useEffect(() => {
        console.log(allParticipants)
    }, [allParticipants])

    return (
        <AdminOnlyRoute>
            { authState === 'user' && access.admin && (
                <AdminLayout css={style.page} title="Dashboard" className="flex-sc col">

                    <section css={style.header}>
                        <div className="inner contain-size-s flex-cc col">
                            <h1>Manage Participants</h1>
                            <p>{examId}</p>
                        </div>
                    </section>

                    <section css={style.usersList} className="users-list">
                        <div className="contain-size-l">
                            {allParticipants.map((item) => (
                                <CardManageUser itemId={item} key={item} />
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
    userList: css`
    
    `
}
export default Participants