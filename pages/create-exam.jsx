import React, { useState } from 'react'
import { css } from '@emotion/react'
import Link from 'next/link'
import axios from 'axios'
import to from '@core/routepath'
import { useAuth } from '@core/contexts/AuthContext'
import AdminOnlyRoute from '@core/routeblocks/AdminOnlyRoute'

import MainLayout from '@components/layouts/MainLayout'
import Spinner from '@components/atomic/spinner/Circle'
    
const Dashboard = () => {
    const { currentUser, role, authMethods } = useAuth()
    const [data, setData] = useState('')

    const CheckRole = async () => {
        setData(null)
        
        axios.post('/api/private/exams/new', {
                userToken: await currentUser.getIdToken(),
                title: 'SOSHUM',
                cluster: 'SOSHUM',
                status: 'limited',
                availability: {
                    start: 1611802800000,
                    end: 1611820800000
                },
                sessions: [
                    {
                        name: 'Penalaran Umum',
                        size: 20,
                        duration: 35
                    },
                    {
                        name: 'Pemahaman Bacaan dan Menulis',
                        size: 20,
                        duration: 25
                    },
                    {
                        name: 'Pengetahuan dan Pemahaman Umum',
                        size: 20,
                        duration: 25
                    },
                    {
                        name: 'Pengetahuan Kuantitatif',
                        size: 20,
                        duration: 35
                    },
                    {
                        name: 'Matematika',
                        size: 20,
                        duration: 22.5
                    },
                    {
                        name: 'Fisika',
                        size: 20,
                        duration: 22.5
                    },
                    {
                        name: 'Kimia',
                        size: 20,
                        duration: 22.5
                    },
                    {
                        name: 'Biologi',
                        size: 20,
                        duration: 22.5
                    }
                ]
            })
        .then(res => setData(res.data.message))
        .catch(err => setData(err.response.data.message))
    }

    return (
        <AdminOnlyRoute redirect={to.home}>
            {currentUser && (
                <MainLayout style={style}>
                    <p>Dashboard of {currentUser.displayName}</p>
                    <div>
                        <img src={currentUser.photoURL} alt=""/>
                        <Link href={to.home}><button>BACK HOME</button></Link>
                        <button onClick={CheckRole}>{data === null ? <Spinner /> : 'create exam'}</button>
                        <button onClick={authMethods.signout} className="red">LOGOUT</button>
                    </div>
                    <p>Admin Status : {role.admin ? 'admin' : 'false'}</p>
                    <p>{data}</p>
                </MainLayout>
            )}
        </AdminOnlyRoute>
    )
}
const style = css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
    div{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    p{

        margin-top: 54px;
        text-align: center;
    }
`
    
export default Dashboard